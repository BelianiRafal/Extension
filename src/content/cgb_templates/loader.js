class Loader {
  constructor(buttonEl) {
    this.loadBtn = buttonEl;
    this.originalHtml = null;
  }

  showLoader() {
    if (!this.originalHtml) {
      this.originalHtml = this.loadBtn.innerHTML;
    }
    this.loadBtn.innerHTML = `
      <span class="spinner-text">Loading...</span>
      <span class="spinner"></span>`;
    this.loadBtn.disabled = true;
  }

  hideLoader() {
    if (this.originalHtml) {
      this.loadBtn.innerHTML = `
        <span class="fade-in">
          <span class="success-text">Successfully!</span>
          <span class="success-icon">✔</span>
        </span>`;
      this.loadBtn.disabled = true;

      setTimeout(() => {
        this.loadBtn.innerHTML = this.originalHtml;
        this.loadBtn.disabled = false;
      }, 2000);
    }
  }
}
