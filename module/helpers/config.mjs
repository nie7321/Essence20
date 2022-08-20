export const E20 = {};

/************************************************
 * Defense                                      *
 ***********************************************/

// Baseline value for defenses
E20.defenseBase = 10;

// Essence-based defenses
E20.defenses = {
  cleverness: "E20.DefenseCleverness",
  evasion: "E20.DefenseEvasion",
  toughness: "E20.DefenseToughness",
  willpower: "E20.DefenseWillpower",
};

/************************************************
 * Weapons                                      *
 ***********************************************/

// Weapon effect shapes
E20.weaponEffectShapes = {
  circle: "E20.EffectShapeCircle",
  cone: "E20.EffectShapeCone",
  square: "E20.EffectShapeSquare",
};

// Shifts required to use a weapon
E20.weaponRequirementShifts = {
  "none": "",
  "d2": "d2",
  "d4": "d4",
  "d6": "d6",
  "d8": "d8",
  "d10": "d10",
  "d12": "d12",
  "2d8": "2d8",
  "3d6": "3d6",
};

// Options for Weapon size
E20.weaponSizes = {
  integrated: "E20.WeaponSizeIntegrated",
  sidearm: "E20.WeaponSizeSidearm",
  medium: "E20.WeaponSizeMedium",
  long: "E20.WeaponSizeLong",
  heavy: "E20.WeaponSizeHeavy",
};

// Options for Weapon style
E20.weaponStyles = {
  melee: "E20.WeaponStyleMelee",
  energy: "E20.WeaponStyleEnergy",
  explosive: "E20.WeaponStyleExplosive",
  projectile: "E20.WeaponStyleProjectile",
};

// Options for Weapon trait
E20.weaponTraits = {
  acid: "E20.WeaponTraitAcid",
  amphibious: "E20.WeaponTraitAmphibious",
  antiTank: "E20.WeaponTraitAntiTank",
  aquatic: "E20.WeaponTraitAquatic",
  area: "E20.WeaponTraitArea",
  armorPiercing: "E20.WeaponTraitArmorPiercing",
  ballistic: "E20.WeaponTraitBallistic",
  blunt: "E20.WeaponTraitBlunt",
  cold: "E20.WeaponTraitCold",
  consumable: "E20.WeaponTraitConsumable",
  cover: "E20.WeaponTraitCover",
  electric: "E20.WeaponTraitElectric",
  energy: "E20.WeaponTraitEnergy",
  fire: "E20.WeaponTraitFire",
  grapple: "E20.WeaponTraitGrapple",
  indirect: "E20.WeaponTraitIndirect",
  intimidating: "E20.WeaponTraitIntimidating",
  laser: "E20.WeaponTraitLaser",
  maneuver: "E20.WeaponTraitManeuver",
  mounted: "E20.WeaponTraitMounted",
  multipleTargets: "E20.WeaponTraitMultipleTargets",
  poison: "E20.WeaponTraitPoison",
  psychic: "E20.WeaponTraitPsychic",
  seeking: "E20.WeaponTraitSeeking",
  sharp: "E20.WeaponTraitSharp",
  silent: "E20.WeaponTraitSilent",
  sonic: "E20.WeaponTraitSonic",
  spot: "E20.WeaponTraitSpot",
  stun: "E20.WeaponTraitStun",
  trip: "E20.WeaponTraitTrip",
  wrecker: "E20.WeaponTraitWrecker",
}

/************************************************
 * Armor                                        *
 ***********************************************/

// Options for Armor classification
E20.armorClassifications = {
  non: "E20.ArmorClassificationNon",
  light: "E20.ArmorClassificationLight",
  medium: "E20.ArmorClassificationMedium",
  heavy: "E20.ArmorClassificationHeavy",
};

// Options for Armor trait
E20.armorTraits = {
  deflective: "E20.ArmorTraitDeflective",
  silent: "E20.ArmorTraitSilent",
};

/************************************************
 * Essences and Skills                          *
 ***********************************************/

// Essence names
E20.essences = {
  strength: "E20.EssenceStrength",
  speed: "E20.EssenceSpeed",
  smarts: "E20.EssenceSocial",
  social: "E20.EssenceSmarts",
};

// Actor Essence skills
E20.essenceSkills = {
  athletics: "E20.EffectShapeAthletics",
  brawn: "E20.EffectShapeBrawn",
  intimidation: "E20.EffectShapeIntimidation",
  might: "E20.EffectShapeMight",
  acrobatics: "E20.EffectShapeAcrobatics",
  driving: "E20.EffectShapeDriving",
  finesse: "E20.EffectShapeFinesse",
  infiltration: "E20.EffectShapeInfiltration",
  targeting: "E20.EffectShapeTargeting",
  alertness: "E20.EffectShapeAlertness",
  culture: "E20.EffectShapeCulture",
  science: "E20.EffectShapeScience",
  survival: "E20.EffectShapeSurvival",
  technology: "E20.EffectShapeTechnology",
  animalHandling: "E20.EffectShapeAnimalHandling",
  deception: "E20.EffectShapeDeception",
  performance: "E20.EffectShapePerformance",
  persuasion: "E20.EffectShapePersuasion",
  streetwise: "E20.EffectShapeStreetwise",
};

// Maps skills back to their corresponding Essence
E20.skillToEssence = {
  athletics: "strength",
  brawn: "strength",
  intimidation: "strength",
  might: "strength",
  acrobatics: "speed",
  driving: "speed",
  finesse: "speed",
  infiltration: "speed",
  targeting: "speed",
  alertness: "smarts",
  culture: "smarts",
  science: "smarts",
  survival: "smarts",
  technology: "smarts",
  animalHandling: "social",
  deception: "social",
  performance: "social",
  persuasion: "social",
  streetwise: "social"
},

/************************************************
 * Rolls                                        *
 ***********************************************/

// Roll shifts that automatically fail
E20.autoFailShifts = [
  "autoFail",
  "fumble",
];

// Roll shifts that automatically succeed
E20.autoSuccessShifts = [
  "criticalSuccess",
  "autoSuccess",
];

// Shifts that are available for rolling initiative
E20.initiativeShifts = {
  "d20": "d20",
  "d2": "d2",
  "d4": "d4",
  "d6": "d6",
  "d8": "d8",
  "d10": "d10",
  "d12": "d12",
  "2d8": "2d8",
  "3d6": "3d6",
};

// Shifts that are available for rolling skills and require making a roll
E20.skillRollableShifts = [
  "d2",
  "d4",
  "d6",
  "d8",
  "d10",
  "d12",
  "2d8",
  "3d6",
];

// Shifts that are available for rolling skills
E20.skillShifts = {
  "criticalSuccess": "E20.ShiftCriticalSuccess",
  "autoSuccess": "E20.ShiftAutoSuccess",
  "3d6": "3d6",
  "2d8": "2d8",
  "d12": "d12",
  "d10": "d10",
  "d8": "d8",
  "d6": "d6",
  "d4": "d4",
  "d2": "d2",
  "d20": "d20",
  "autoFail": "E20.ShiftAutoFail",
  "fumble": "E20.ShiftFumble",
};

// Shifts that are available for rolling skills in list form
E20.skillShiftList = [
  "criticalSuccess",
  "autoSuccess",
  "3d6",
  "2d8",
  "d12",
  "d10",
  "d8",
  "d6",
  "d4",
  "d2",
  "d20",
  "autoFail",
  "fumble",
];

/************************************************
 * Items                                        *
 ***********************************************/

// Options for Item availabilities
E20.availabilities = {
  automatic: "E20.AvailabilityAutomatic",
  standard: "E20.AvailabilityStandard",
  limited: "E20.AvailabilityLimited",
  restricted: "E20.AvailabilityRestricted",
  prototype: "E20.AvailabilityPrototype",
  unique: "E20.AvailabilityUnique",
  theoretical: "E20.AvailabilityTheoretical",
};

// Light ranges used by Gear
E20.lightRanges = {
  bright: "E20.LightRangeBright",
  dim: "E20.LightRangeDim",
};

/************************************************
 * Actors                                       *
 ***********************************************/

// Options for Creature size
E20.creatureSizes = {
  small: "E20.CreatureSizeSmall",
  common: "E20.CreatureSizeCommon",
  large: "E20.CreatureSizeLarge",
  long: "E20.CreatureSizeLong",
  huge: "E20.CreatureSizeHuge",
  extended: "E20.CreatureSizeExtended",
  gigantic: "E20.CreatureSizeGigantic",
  extended2: "E20.CreatureSizeExtended2",
  towering: "E20.CreatureSizeTowering",
  extended3: "E20.CreatureSizeExtended3",
  titanic: "E20.CreatureSizeTitanic"
};

// Types of movement used by Actors
E20.movementTypes = {
  aerial: "E20.MovementTypeAerial",
  ground: "E20.MovementTypeGround",
  swim: "E20.MovementTypeSwim",
};

// Power Ranger spectrum colors
E20.rangers = {
  black: "E20.RangerBlack",
  blue: "E20.RangerBlue",
  green: "E20.RangerGreen",
  pink: "E20.RangerPink",
  red: "E20.RangerRed",
  yellow: "E20.RangerYellow",
  white: "E20.RangerWhite",
};
