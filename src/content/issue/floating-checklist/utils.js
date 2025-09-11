// Utility functions for slug processing and mention mapping
window.FloatingChecklistUtils = {
  extractSlug: function (description) {
    if (!description && description !== 0) return "";
    let d = String(description);
    // If there's a URL, strip it and keep the label before it
    const urlIdx = d.search(/https?:\/\//i);
    if (urlIdx !== -1) d = d.slice(0, urlIdx);
    // Replace tabs and unusual spaces with a single space
    d = d.replace(/[\t\u00A0\u200B]+/g, " ");
    // Remove common separators and collapse spaces
    d = d
      .replace(/[|,;:\-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    // Remove trailing punctuation
    d = d.replace(/[\.,\/]+$/g, "");

    // Handle slash-separated country codes like "BE/NL" -> "BENL", "CH/FR" -> "CHFR"
    if (d.includes("/")) {
      const parts = d.split("/").map((part) => part.trim().toUpperCase());
      // If we have exactly 2 parts and both look like country codes (2-3 letters)
      if (
        parts.length === 2 &&
        parts.every((part) => /^[A-Z]{2,3}$/.test(part))
      ) {
        return parts.join("");
      }
    }

    return d.toUpperCase();
  },

  mapSlugToMention: function (slug) {
    const s = String(slug || "").toUpperCase();
    const { MENTION_MAP, MENTION_ALIAS_FALLBACK } =
      window.FloatingChecklistConfig;
    for (const m of MENTION_MAP) {
      const codes =
        (String(m.visual || "") || "").toUpperCase().match(/[A-Z]{2,5}/g) || [];
      if (codes.includes(s)) return m.html;
    }
    return "@" + (MENTION_ALIAS_FALLBACK[s] || s);
  },

  buildGroupedMentions: function (slugsIterable) {
    const { SLUG_CANONICAL_ALIAS, GROUPING_RULES } =
      window.FloatingChecklistConfig;
    const sel = new Set(
      Array.from(slugsIterable || []).map((x) => {
        const raw = String(x || "")
          .toUpperCase()
          .replace(/\s+/g, "");
        return SLUG_CANONICAL_ALIAS[raw] || raw;
      })
    );
    const mentionSet = new Set(); // Use Set to avoid duplicates

    // Group collapsing rules
    for (const group of GROUPING_RULES) {
      const found = group.members.filter((m) => sel.has(m));
      if (found.length > 0) {
        group.members.forEach((m) => sel.delete(m));
        mentionSet.add(this.mapSlugToMention(group.target));
      }
    }

    // Add remaining individual mentions
    for (const remaining of sel) {
      mentionSet.add(this.mapSlugToMention(remaining));
    }

    return Array.from(mentionSet);
  },
};
