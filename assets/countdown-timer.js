/**
 * Counts down to a fixed instant and flips the digits that change.
 *
 * The markup is fully rendered server-side by _countdown-announcement.liquid, so the
 * correct time is on screen at first paint and this element only keeps it moving. If the
 * expiry is missing or unparseable it does nothing and the server-rendered values stand.
 */

const UNITS = /** @type {const} */ (['days', 'hours', 'minutes', 'seconds']);

class CountdownTimer extends HTMLElement {
  /** @type {number | undefined} */
  #interval;

  /** @type {number} */
  #expiry = NaN;

  connectedCallback() {
    this.#expiry = Date.parse(this.getAttribute('expires-at') ?? '');
    if (Number.isNaN(this.#expiry)) return;

    this.#tick();
    this.#interval = setInterval(() => this.#tick(), 1000);
  }

  disconnectedCallback() {
    clearInterval(this.#interval);
  }

  #tick() {
    const remaining = Math.max(0, Math.floor((this.#expiry - Date.now()) / 1000));

    if (remaining === 0) {
      clearInterval(this.#interval);
      if (this.getAttribute('expiration-behavior') === 'hide') {
        // Hidden rather than removed: the announcement bar tracks its slides by index,
        // and removing one mid-rotation desyncs it.
        const root = this.closest('[data-countdown-root]');
        if (root instanceof HTMLElement) root.hidden = true;
      }
    }

    const value = {
      days: Math.floor(remaining / 86400),
      hours: Math.floor(remaining / 3600) % 24,
      minutes: Math.floor(remaining / 60) % 60,
      seconds: remaining % 60,
    };

    for (const unit of UNITS) this.#paint(unit, value[unit]);
  }

  /**
   * @param {string} unit
   * @param {number} value
   */
  #paint(unit, value) {
    const host = this.querySelector(`[data-unit="${unit}"]`);
    if (!host) return;

    const text = String(value).padStart(2, '0');
    const digits = host.querySelectorAll('[data-digit]');

    // Days can be three digits on a long sale and drop back to two. Rebuild the slots
    // when the width changes rather than truncating the value.
    if (digits.length !== text.length) {
      host.replaceChildren(
        ...Array.from(text, (character) => {
          const span = document.createElement('span');
          span.className = 'countdown__digit';
          span.dataset.digit = '';
          span.textContent = character;
          return span;
        })
      );
      return;
    }

    digits.forEach((digit, index) => {
      const next = text[index];
      if (digit.textContent === next) return;

      digit.textContent = next;
      digit.classList.remove('is-flipping');
      void /** @type {HTMLElement} */ (digit).offsetWidth; // restart the animation
      digit.classList.add('is-flipping');
    });
  }
}

if (!customElements.get('countdown-timer')) {
  customElements.define('countdown-timer', CountdownTimer);
}
