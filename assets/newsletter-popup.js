const popup = document.querySelector('[data-newsletter-popup]');

if (popup) {
  const storageKey = 'newsletter-popup-dismissed';
  const closeButton = popup.querySelector('[data-newsletter-popup-close]');

  const open = () => {
    popup.classList.add('is-open');
    document.addEventListener('keydown', onKeydown);
  };

  const close = () => {
    popup.classList.remove('is-open');
    document.removeEventListener('keydown', onKeydown);
    // Private browsing and blocked storage throw here; a popup that reappears
    // is better than one that breaks the page.
    try {
      localStorage.setItem(storageKey, Date.now());
    } catch {}
    closeButton?.blur();
  };

  const onKeydown = (event) => {
    if (event.key === 'Escape') close();
  };

  closeButton?.addEventListener('click', close);

  if (popup.hasAttribute('data-posted')) {
    // The form just came back from a submit — show the result straight away.
    open();
  } else {
    let dismissedAt = 0;
    try {
      dismissedAt = Number(localStorage.getItem(storageKey)) || 0;
    } catch {}

    const frequencyMs = Number(popup.dataset.frequency || 14) * 86400000;

    if (Date.now() - dismissedAt > frequencyMs) {
      setTimeout(open, Number(popup.dataset.delay || 5) * 1000);
    }
  }
}
