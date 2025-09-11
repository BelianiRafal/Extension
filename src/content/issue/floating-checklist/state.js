// State management for floating checklist panel selections
window.FloatingChecklistState = {
  // Selection state for panel lifetime
  SELECTED_TRANSLATIONS: new Set(),
  SELECTED_TESTS: new Set(),

  resetSelections: function () {
    this.SELECTED_TRANSLATIONS = new Set();
    this.SELECTED_TESTS = new Set();
  },

  updateTextareaWithMentions: function (selectedSet, headerText) {
    const { UI_CONFIG } = window.FloatingChecklistConfig;
    const textarea = document.querySelector(UI_CONFIG.TEXTAREA_SELECTOR);
    if (!textarea) {
      console.warn("[checklist-debug] textarea not found");
      return;
    }

    const mentions =
      window.FloatingChecklistUtils.buildGroupedMentions(selectedSet);
    if (mentions.length === 0) {
      textarea.value = "";
    } else {
      textarea.value = `${headerText} ${mentions.join(" ")}`;
    }
    textarea.focus();
  },

  toggleTranslationSelection: function (slug) {
    if (this.SELECTED_TRANSLATIONS.has(slug)) {
      this.SELECTED_TRANSLATIONS.delete(slug);
    } else {
      this.SELECTED_TRANSLATIONS.add(slug);
    }
    const { UI_CONFIG } = window.FloatingChecklistConfig;
    this.updateTextareaWithMentions(
      this.SELECTED_TRANSLATIONS,
      UI_CONFIG.HEADERS.TRANSLATION
    );
    return this.SELECTED_TRANSLATIONS.has(slug);
  },

  toggleTestSelection: function (slug) {
    if (this.SELECTED_TESTS.has(slug)) {
      this.SELECTED_TESTS.delete(slug);
    } else {
      this.SELECTED_TESTS.add(slug);
    }
    const { UI_CONFIG } = window.FloatingChecklistConfig;
    this.updateTextareaWithMentions(
      this.SELECTED_TESTS,
      UI_CONFIG.HEADERS.TESTING
    );
    return this.SELECTED_TESTS.has(slug);
  },

  clearTranslationSelection: function () {
    this.SELECTED_TRANSLATIONS.clear();
  },

  clearTestSelection: function () {
    this.SELECTED_TESTS.clear();
  },
};
