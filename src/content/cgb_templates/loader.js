class Loader {
  constructor(selector) {
    this.loadBtn = document.querySelector(selector);
    this.originalHtml = this.loadBtn.innerHTML;
  }

  showLoader() {
    this.loadBtn.innerHTML = `
        <span class="spinner-text">Loading...</span>
        <span class="spinner"></span>`;
    this.loadBtn.disabled = true;
  }
  hideLoader() {
    this.loadBtn.innerHTML = this.originalHtml;
    this.loadBtn.disabled = false;
  }
}
