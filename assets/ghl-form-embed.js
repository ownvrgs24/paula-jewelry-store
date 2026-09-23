/**
 * Clears the placeholder in front of a GoHighLevel form once the form has painted.
 *
 * The form itself is never hidden by this element. It only fades the placeholder
 * away, so a browser that never upgrades the element still shows a working form
 * (the stylesheet retires the placeholder on its own after the same timeout).
 */
class GhlFormEmbed extends HTMLElement {
  /* Longest the placeholder is allowed to stay up if the iframe never reports back. */
  static FALLBACK_TIMEOUT = 8000;

  /*
   * The iframe often reports back within a couple of hundred milliseconds, which is
   * long enough to notice a gap but too short to read as loading. Holding the
   * placeholder for a beat makes it a state rather than a flicker.
   */
  static MIN_VISIBLE = 600;

  connectedCallback() {
    const iframe = this.querySelector('.ghl-form__iframe');

    if (!iframe) return;

    this.markLoaded = this.markLoaded.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.reveal = this.reveal.bind(this);
    this.startedAt = Date.now();

    try {
      this.formOrigin = new URL(iframe.src).origin;
    } catch {
      this.formOrigin = null;
    }

    iframe.addEventListener('load', this.markLoaded, { once: true });

    /*
     * The load event may already have fired before this element is upgraded, and a
     * blocked or failed iframe never fires it at all. GoHighLevel's embed script posts
     * a resize message once the form renders, so listen for that too, and fall back to
     * a timer so the placeholder can never outlive the form it stands in for.
     */
    window.addEventListener('message', this.handleMessage);
    this.timeout = setTimeout(this.markLoaded, GhlFormEmbed.FALLBACK_TIMEOUT);
  }

  disconnectedCallback() {
    this.clearWatchers();
    clearTimeout(this.revealTimeout);
  }

  /* Other embeds and apps post to this window too, so only trust the form's own origin. */
  handleMessage(event) {
    if (this.formOrigin && event.origin !== this.formOrigin) return;

    this.markLoaded();
  }

  markLoaded() {
    if (this.revealing) return;
    this.revealing = true;
    this.clearWatchers();

    const remaining = GhlFormEmbed.MIN_VISIBLE - (Date.now() - this.startedAt);

    if (remaining > 0) {
      this.revealTimeout = setTimeout(this.reveal, remaining);
      return;
    }

    this.reveal();
  }

  reveal() {
    this.dataset.loaded = 'true';

    const status = this.querySelector('.ghl-form__status');
    if (status) status.remove();
  }

  clearWatchers() {
    clearTimeout(this.timeout);
    window.removeEventListener('message', this.handleMessage);
  }
}

if (!customElements.get('ghl-form-embed')) {
  customElements.define('ghl-form-embed', GhlFormEmbed);
}
