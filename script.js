// Google Analytics 4: existing portfolio measurement ID.
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-QREE9JZGYB');

// Accessible certificate viewer: native modal focus handling, Escape, touch and click.
document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('certificate-dialog');
  const image = document.getElementById('certificate-image');
  const caption = document.getElementById('certificate-caption');
  const error = document.getElementById('certificate-error');
  let opener = null;
  document.querySelectorAll('.certificate-link').forEach(link => {
    link.addEventListener('click', event => {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      opener = link;
      const title = link.closest('.cert').querySelector('.cert-title').textContent;
      caption.textContent = title;
      image.alt = title + ' certificate';
      error.hidden = true;
      image.hidden = false;
      image.src = link.getAttribute('href');
      dialog.showModal();
      document.body.classList.add('certificate-open');
      dialog.querySelector('.certificate-close').focus();
    });
  });
  image.addEventListener('error', () => { image.hidden = true; error.hidden = false; });
  dialog.querySelector('.certificate-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('certificate-open');
    if (opener) opener.focus();
  });
});
