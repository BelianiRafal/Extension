// content/multiselect/index.js
(function(){
  'use strict';

  // referencje widoczne w całym module
  let rangesContainer, createExcludeRow;

  // punkt wejścia
  function init(){
    console.log('🔧 multiselect init()');

    // 1) wstrzyknięcie CSS
    const style = document.createElement('style');
    style.textContent = `
      #autoSelectContainer {
        position: fixed;
        top: 10px;
        right: 10px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 9999;
        font-family: Arial,sans-serif;
        font-size: 14px;
        width: 260px;
      }
      #autoSelectContainer header { font-weight: bold; margin-bottom: 8px; }
      .exclude-row { display: flex; align-items: center; margin-bottom: 4px; }
      .exclude-row input { width: 60px; margin: 0 4px; }
      .removeRange { background: none; border: none; cursor: pointer; color: #900; }
      #addRange,#applyAutoSelect {
        display: block; width:100%; margin-top:6px; padding:4px 0; font-size:14px;
      }
      .rowAddRange {
        display:inline-block; cursor:pointer; color:green;
        font-weight:bold; margin-right:6px; user-select:none;
      }
      .rowAddRange:hover { color:darkgreen; }
    `;
    document.head.appendChild(style);

    // 2) budowa panelu
    const container = document.createElement('div');
    container.id = 'autoSelectContainer';
    container.innerHTML = `
      <header>Auto-select</header>
      <div id="autoSelectPanel">
        <div id="excludeRanges"></div>
        <button type="button" id="addRange">➕ Wyklucz zakres</button>
        <button type="button" id="applyAutoSelect">Zaznacz wg daty</button>
      </div>
    `;
    document.body.appendChild(container);

    // referencje
    rangesContainer = container.querySelector('#excludeRanges');

    // funkcja tworząca wiersz zakresu
    createExcludeRow = () => {
      const row = document.createElement('div');
      row.className = 'exclude-row';
      row.innerHTML = `
        <label>Od<input type="number" class="excludeFrom" placeholder="start"></label>
        <label>Do<input type="number" class="excludeTo"   placeholder="koniec"></label>
        <button class="removeRange" title="Usuń">✖</button>
      `;
      rangesContainer.appendChild(row);
      return row;
    };

    // pierwszy wiersz
    createExcludeRow();

    // 3) dodawanie/usuwanie zakresów
    container.querySelector('#addRange').addEventListener('click', createExcludeRow);
    rangesContainer.addEventListener('click', ev => {
      if (ev.target.matches('.removeRange')) {
        ev.target.closest('.exclude-row').remove();
      }
    });

    // 4) wstrzyk i obserwuj tabelę
    injectPlusIcons();
    observeTableChanges();

    // 5) obsługa selekcji wg daty
    container.querySelector('#applyAutoSelect').addEventListener('click', applyDateSelect);
  }

  // tylko widoczne <tr> offsetParent!==null
  function injectPlusIcons(){
    const rows = Array.from(
      document.querySelectorAll('form[action="news_emails.php"] table tbody tr')
    ).filter(r => r.offsetParent !== null);

    console.log('👉 injectPlusIcons: wszystkich wierszy=', rows.length);
    rows.forEach(row => {
      if (row.querySelector('.rowAddRange')) return;   // już wstrzyknięty
      const td = row.querySelector('td');
      const a  = td && td.querySelector('a');
      if (!a) return;
      const id = parseInt(a.textContent.trim(), 10);
      if (isNaN(id)) return;

      const btn = document.createElement('span');
      btn.textContent   = '+';
      btn.className     = 'rowAddRange';
      btn.title         = 'Dodaj ten ID do zakresu';
      btn.addEventListener('click', () => handlePlusClick(id));
      td.prepend(btn);
    });
  }

  // MutationObserver, reaguje na zmiany w tabeli (filtry, stronicowanie itp.)
  function observeTableChanges(){
    const tbody = document.querySelector('form[action="news_emails.php"] table tbody');
    if (!tbody) return;
    const mo = new MutationObserver(() => injectPlusIcons());
    mo.observe(tbody, { childList: true, attributes: true, subtree: true, attributeFilter: ['style'] });
  }

  // klik na plusik
  function handlePlusClick(id){
    const rows = Array.from(rangesContainer.querySelectorAll('.exclude-row'));
    for (const row of rows){
      const from = row.querySelector('.excludeFrom');
      const to   = row.querySelector('.excludeTo');
      if (!from.value) { from.value = id; return; }
      if (!to.value)   { to.value   = id; createExcludeRow(); return; }
    }
    const nr = createExcludeRow();
    nr.querySelector('.excludeFrom').value = id;
  }

  // główna selekcja
  function applyDateSelect(){
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    oneMonthAgo.setHours(0, 0, 0, 0);

    const excludeRanges = Array.from(rangesContainer.querySelectorAll('.exclude-row'))
      .map(row => ({
        from: parseInt(row.querySelector('.excludeFrom').value, 10),
        to:   parseInt(row.querySelector('.excludeTo')  .value, 10)
      }))
      .filter(r => !isNaN(r.from) && !isNaN(r.to));

    // odznaczamy tylko widoczne
    document.querySelectorAll('input[name="delete[]"]').forEach(chk => {
      const tr = chk.closest('tr');
      if (tr.offsetParent === null) return;
      chk.checked = false;
    });

    // zaznaczamy wg daty i wykluczeń
    document.querySelectorAll('input[name="delete[]"]').forEach(chk => {
      const tr = chk.closest('tr');
      if (tr.offsetParent === null) return;
      const id = parseInt(chk.value, 10);
      const dateText = tr.querySelectorAll('td')[2].textContent.trim();
      const crDate = new Date(dateText);
      const olderThan = crDate < oneMonthAgo;
      const excluded = excludeRanges.some(r => id >= r.from && id <= r.to);
      if (olderThan && !excluded) chk.checked = true;
    });
  }

  // uruchom
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();