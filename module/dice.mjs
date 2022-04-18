export class Dice {
  /**
   * Dice constructor.
   * @param {Function} localize   The function to use for text localization
   * @param {Object} config   The config to use for constants.
   */
  constructor(localize, config, chatMessage) {
    this._localize = localize;
    this._config = config;
    this._chatMessage = chatMessage;
  }

  /**
   * Displays the dialog used for skill and specialization rolls.
   * @returns {Promise<Dialog>}   The dialog to be displayed.
   */
  async getSkillRollOptions() {
    const template = "systems/essence20/templates/dialog/roll-dialog.hbs"

    const html = await renderTemplate(template, {});

    return new Promise(resolve => {
      const data = {
        title: game.i18n.format("Configure your skill roll"),
        content: html,
        buttons: {
          normal: {
            label: "Roll",
            callback: html => resolve(this._processSkillRollOptions(html[0].querySelector("form"))),
          },
          cancel: {
            label: "Cancel",
            callback: html => resolve({cancelled: true}),
          },
        },
        default: "normal",
        close: () => resolve({cancelled: true}),
      };
      new Dialog(data, null).render(true);
    });
  }

  /**
   * Processes options for the skill and specialization roll dialog.
   * @returns {Object}   The processed roll options.
   * @private
   */
  _processSkillRollOptions(form) {
    return {
      shiftUp: parseInt(form.shiftUp.value),
      shiftDown: parseInt(form.shiftDown.value),
      snag: form.snag.checked,
      edge: form.edge.checked,
    }
  }

  /**
   * Handle skill and specialization rolls.
   * @param {Event.currentTarget.element.dataset} dataset   The dataset of the click event.
   * @param {Object} skillRollOptions   The result of getSkillRollOptions().
   * @param {Actor} actor   The actor performing the roll.
   */
  rollSkill(dataset, skillRollOptions, actor) {
    let label = this._getSkillRollLabel(dataset);
    const rolledSkill = dataset.skill;
    const rolledEssence = this._config.skillToEssence[rolledSkill];
    const actorSkillData = actor.getRollData().skills;
    const initialShift = actorSkillData[rolledEssence][rolledSkill].shift;
    const finalShift = this._getFinalShift(skillRollOptions, initialShift);

    if (this._handleAutofail(finalShift, label, actor)) {
      return;
    }

    const modifier = actorSkillData[rolledEssence][rolledSkill].modifier;
    const formula = this._getFormula(!!dataset.specialization, skillRollOptions, finalShift, modifier);

    let roll = new Roll(formula, actor.getRollData());
    roll.toMessage({
      speaker: this._chatMessage.getSpeaker({ actor }),
      flavor: label + this._getEdgeSnagText(edge, snag),
      rollMode: game.settings.get('core', 'rollMode'),
    });
  }

  /**
   * Create skill roll label.
   * @param {Event.currentTarget.element.dataset} dataset   The dataset of the click event.
   * @returns {String}   The resultant roll label.
   * @private
   */
  _getSkillRollLabel(dataset) {
    const rolledSkill = dataset.skill;
    const rolledSkillStr = dataset.specialization
      ? dataset.specialization
      : this._localize(this._config.skills[rolledSkill]);
    const rollingForStr = this._localize(this._config.rollingFor)
    return `${rollingForStr} ${rolledSkillStr}`;
  }

  /**
   * Create final shift from actor skill shift + skill roll options.
   * @param {Object} skillRollOptions   The result of getSkillRollOptions().
   * @param {String} initialShift   The initial shift of the skill being rolled.
   * @returns {String}   The resultant shift.
   * @private
   */
  _getFinalShift(skillRollOptions, initialShift) {
    // Apply the skill roll options dialog shifts to the roller's normal shift
    const optionsShiftTotal = skillRollOptions.shiftUp - skillRollOptions.shiftDown;
    const initialShiftIndex = this._config.shiftList.findIndex(s => s == initialShift);
    const finalShiftIndex = Math.max(0, Math.min(this._config.shiftList.length - 1, initialShiftIndex - optionsShiftTotal));

    return this._config.shiftList[finalShiftIndex];
  }

  /**
   * Handle rolls that automatically fail.
   * @param {String} skillShift   The shift of the skill being rolled.
   * @param {String} label   The label generated so far for the roll, which will be appended to.
   * @param {Actor} actor   The actor performing the roll.
   * @returns {Boolean}   True if autofail occurs and false otherwise.
   * @private
   */
  _handleAutofail(skillShift, label, actor) {
    let autofailed = false;

    if (this._config.automaticShifts.includes(skillShift)) {
      const chatData = {
        speaker: this._chatMessage.getSpeaker({ actor }),
      };
      switch(skillShift) {
        case 'autoFail':
          label += ` ${this._localize(this._config.autoFail)}`;
          break;
        case 'fumble':
          label += ` ${this._localize(this._config.autoFailFumble)}`;
          break;
      }
      chatData.content = label;
      this._chatMessage.create(chatData);
      autofailed = true;
    }

    return autofailed;
  }

  /**
   * Returns the d20 portion of skill roll formula.
   * @param {Boolean} edge   If the roll is using an Edge.
   * @param {Boolean} snag   If the roll is using a Snag.
   * @returns {String}   The d20 portion of skill roll formula.
   * @private
   */
  _getd20Operand(edge, snag) {
    // Edge and Snag cancel eachother out
    if (edge == snag) {
      return 'd20';
    }
    else {
      return edge ? '2d20kh' : '2d20kl';
    }
  }

  /**
   * Returns the d20 portion of skill roll formula.
   * @param {Boolean} edge   If the roll is using an Edge.
   * @param {Boolean} snag   If the roll is using a Snag.
   * @returns {String}   The ' with an Edge/Snag' text of the roll label.
   * @private
   */
  _getEdgeSnagText(edge, snag) {
    let result = '';

    // Edge and Snag cancel eachother out
    if (edge != snag) {
      const withAnEdge = this._localize(this._config.withAnEdge)
      const withASnag = this._localize(this._config.withASnag)
      result = edge ? ` ${withAnEdge}` : ` ${withASnag}`;
    }

    return result;
  }

  /**
   * Converts given operands into a formula.
   * @param {Array<String>} edge   The operands to be used in the formula.
   * @returns {String}   The resultant formula.
   * @private
   */
  _arrayToFormula(operands) {
    let result = '';
    const len = operands.length;

    for (let i=0; i < len; i+=1) {
      const operand = operands[i];
      result += i == len - 1 ? operand : `${operand} + `;
    }

    return result;
  }

  /**
   * Create formula for skill roll.
   * @param {Boolean} dataset   Whether the roll is specialized.
   * @param {Object} skillRollOptions   The result of getSkillRollOptions().
   * @param {String} finalShift   The shift to be used for the skill roll.
   * @param {Number} modifier   The modifier to be used for the skill roll.
   * @returns {String}   The resultant shift.
   * @private
   */
  _getFormula(isSpecialized, skillRollOptions, finalShift, modifier) {
    const edge = skillRollOptions.edge;
    const snag = skillRollOptions.snag;
    const operands = [];
    operands.push(this._getd20Operand(edge, snag));

    // We already have the d20 operand, now apply bonus dice if needed
    if (finalShift != 'd20') {
      if (isSpecialized) {
        // For specializations, keep adding dice until you reach your shift level
        for (const shift of this._config.rollableShifts) {
          operands.push(shift);
          if (shift == finalShift) {
            break;
          }
        }
      }
      else {
        // For non-specialized, just add the single bonus die
        operands.push(finalShift);
      }
    }

    operands.push(modifier);

    return this._arrayToFormula(operands);
  }

}
