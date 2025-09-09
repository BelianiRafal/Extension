// Connector between translations/testing lists and emoji mass-user mappings
(function () {
  // mapping language code or short name to mass-user mention text
  const MASS_USER_MAP = {
    IT: '@IT translation(4490)',
    PT: '@PT translation(4492)',
    NO: '@NO translation(4496)',
    NL: '@NL translation(4488)',
    ES: '@ES translation(4491)',
    FR: '@FR translation(4489)',
    SE: '@SE translation(4494)',
    FI: '@FI translation(4493)',
    DK: '@DK translation(4495)',
    CZ: '@CZ translation(4497)',
    HU: '@HU translation(4499)',
    RO: '@RO translation(4688)',
    SK: '@SK translation(4498)',
    'Mass User': '@Newsletter translation(4527)',
    'UK': '@Content Team(3703)',
    DACH: '@DACH translation(4487)'
  };

  function findTextarea() {
    let textarea = document.querySelector('textarea[id="new_comment"]');
    if (!textarea) textarea = document.querySelector('textarea');
    return textarea;
  }

  function insertTextToComment(text) {
    const ta = findTextarea();
    if (!ta) {
      alert('Comment textarea not found. Please open comment box.');
      return;
    }
    // append the mention at the end with a newline
    const val = ta.value || '';
    const toInsert = (val ? val + '\n' : '') + text + '\n';
    ta.value = toInsert;
    ta.focus();
    // dispatch input event so UI updates
    ta.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function createButton(text, title) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mass-request-btn';
    btn.textContent = text;
    btn.title = title || text;
    return btn;
  }

  function mapLabelToUser(label) {
    if (!label) return null;
    const key = String(label).trim();
    if (MASS_USER_MAP[key]) return MASS_USER_MAP[key];
    // try uppercase first token (covers labels like "IT ...")
    const first = key.split(' ')[0].toUpperCase();
    if (MASS_USER_MAP[first]) return MASS_USER_MAP[first];
    // try initial letters
    if (MASS_USER_MAP[key.toUpperCase()]) return MASS_USER_MAP[key.toUpperCase()];
    return null;
  }

  function addButtonsToList(wrapper) {
    if (!wrapper) return;
    const titleEl = wrapper.querySelector('.shortlist-title');
    const isTranslations = titleEl && /translat/i.test(titleEl.textContent);
    const isTesting = titleEl && /test/i.test(titleEl.textContent);
    if (!isTranslations && !isTesting) return;

    const listItems = wrapper.querySelectorAll('.listItem');
    listItems.forEach((li) => {
      // skip if already has button
      if (li.querySelector('.mass-request-btn')) return;
      const status = li.querySelector('.done, .disabled');
      const nameEl = li.querySelector('.langName');
      const label = nameEl ? nameEl.textContent.trim() : null;
      const user = mapLabelToUser(label);
      // only add button if status is disabled (missing check) and we have a mapped user
      if (status && status.classList.contains('disabled') && user) {
        const btnText = isTranslations ? 'Request for Translation' : 'Request for approval';
        const btn = createButton(btnText, user);
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          insertTextToComment(user + ' ' + btnText);
          // small visual feedback
          btn.classList.add('mass-request-sent');
          setTimeout(() => btn.classList.remove('mass-request-sent'), 2000);
        });
        // append the button under the item (after any anchor)
        li.appendChild(btn);
      }
    });
  }

  function scanAndAttach() {
    const wrappers = document.querySelectorAll('.shortlist-wrapper');
    wrappers.forEach((w) => addButtonsToList(w));
  }

  // watch for DOM changes to attach buttons when lists appear
  const observer = new MutationObserver((mutations) => {
    scanAndAttach();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // initial run with a slight delay to allow other scripts to build lists
  setTimeout(scanAndAttach, 1500);
})();
