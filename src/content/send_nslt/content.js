/* ---------- content.js ---------- */
// Inject floating UI and handle user interactions + automation per-tab
(function() {
  // Create Show button
  const showBtn = document.createElement('button');
  showBtn.id = 'batcher-show-btn';
  showBtn.textContent = 'Show interface';
  document.body.appendChild(showBtn);

  // Create panel
  const panel = document.createElement('div');
  panel.id = 'batcher-panel';
  panel.innerHTML = `
    <h4>Newsletter Batcher</h4>
    <label>Starting Template ID: <input type="number" id="batcher-start-id" value="1" /></label>
    <button id="batcher-start">Start Batch</button>
    <button id="batcher-close">✕</button>
  `;
  document.body.appendChild(panel);

  showBtn.addEventListener('click', () => {
    panel.style.display = 'block';
    showBtn.style.display = 'none';
  });
  panel.querySelector('#batcher-close').addEventListener('click', () => {
    panel.style.display = 'none';
    showBtn.style.display = 'block';
  });

  document.querySelector('#batcher-start').addEventListener('click', () => {
    const startId = document.querySelector('#batcher-start-id').value;
    chrome.runtime.sendMessage({action:'startBatch', startId});
    panel.style.display = 'none';
    showBtn.style.display = 'block';
  });

  // Listen for background message in each tab
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'applyTemplate') {
      const tplId = msg.templateId;
      // 1) click "Filter"
      document.querySelector('button[type=button] span:contains("Filter")')?.click();
      // 2) wait briefly then select dropdown option by value tplId
      setTimeout(() => {
        const dd = document.querySelector('div[role="listbox"]');
        if (dd) {
          const opt = dd.querySelector(`[data-value='${tplId}']`);
          opt?.click();
        }
        // 3) click "Transfer to batch file"
        setTimeout(() => {
          document.querySelector('button span:contains("Transfer to batch file")')?.closest('button')?.click();
        }, 500);
      }, 500);
    }
  });
})();
