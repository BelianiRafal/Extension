// Configuration and static mappings for floating checklist
window.FloatingChecklistConfig = {
  SLUG_CANONICAL_ALIAS: {
    SP: "ES",
    ES: "ES",
    // add other canonical aliases here if needed
  },

  // from content.js
  MENTION_MAP: [
    { visual: "UK|PL Trans", html: "@Content Team(3703)" },
    { visual: "DACH Trans", html: "@DACH translation(4487)" },
    { visual: "CZ Trans", html: "@CZ translation(4497)" },
    { visual: "DK Trans", html: "@DK translation(4495)" },
    { visual: "ES Trans", html: "@ES translation(4491)" },
    { visual: "FI Trans", html: "@FI translation(4493)" },
    { visual: "FR Trans", html: "@FR translation(4489)" },
    { visual: "HU Trans", html: "@HU translation(4499)" },
    { visual: "IT Trans", html: "@IT translation(4490)" },
    { visual: "NL Trans", html: "@NL translation(4488)" },
    { visual: "NO Trans", html: "@NO translation(4496)" },
    { visual: "PT Trans", html: "@PT translation(4492)" },
    { visual: "RO Trans", html: "@RO translation(4688)" },
    { visual: "SE Trans", html: "@SE translation(4494)" },
    { visual: "SK Trans", html: "@SK translation(4498)" },
  ],

  MENTION_ALIAS_FALLBACK: { ES: "SP" },

  UI_CONFIG: {
    COLLAPSED_KEY: "checklistCollapsed",
    TEXTAREA_SELECTOR: "#new_comment",
    HEADERS: {
      TRANSLATION:
        '<h4 style="color:#fff; background-color:#000; text-align:center; padding:12px;">PLEASE TRANSLATE &#128519;</h4>',
      TESTING:
        '<h4 style="color:#fff; background-color:#4b0082; text-align:center; padding:12px;">PLEASE TEST &#128524;</h4>',
    },
  },

  GROUPING_RULES: [
    { members: ["DE", "AT", "CHDE"], target: "DACH" },
    { members: ["CHFR", "BEFR", "FR"], target: "FR" },
    { members: ["BENL", "NL"], target: "NL" },
  ],
};
