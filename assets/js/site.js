
/* ==========================================
   Google Tag Manager — SMC
   Container ID: GTM-NF3BXHHS
   ========================================== */

(function (w, d, l, i) {
  if (w.__smcGtmLoaded) return;
  w.__smcGtmLoaded = true;

  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  var script = d.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + i;

  d.head.appendChild(script);

})(window, document, 'dataLayer', 'GTM-NF3BXHHS');


/* ==========================================
   SMC — Existing Site Functions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Navigation menu
  const b = document.querySelector('.menuBtn');
  const n = document.querySelector('.nav');

  if (b && n) {
    b.addEventListener('click', () => {
      const v = n.classList.toggle('open');
      b.setAttribute('aria-expanded', String(v));
    });
  }


  // Language preference
  document.querySelectorAll('[data-language-link]').forEach(a => {
    a.addEventListener('click', () => {
      try {
        localStorage.setItem('smc-language', a.dataset.locale);
      } catch (e) {}
    });
  });


  // Repair three brand marks whose former Simple Icons CDN slugs return 404.
  // The same shared site.js is loaded by every language edition.

  const logoSources = [
    {
      match: /cdn\.simpleicons\.org\/microsoftazure(?:\/|$)/i,
      src: 'https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/azure.svg'
    },
    {
      match: /cdn\.simpleicons\.org\/microsoft(?:\/|$)/i,
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
    },
    {
      match: /cdn\.simpleicons\.org\/canva(?:\/|$)/i,
      src: 'https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg'
    }
  ];

  document.querySelectorAll('.toolCardHead img').forEach(img => {
    const oldSrc = img.getAttribute('src') || '';

    const replacement = logoSources.find(item =>
      item.match.test(oldSrc)
    );

    if (replacement) {
      img.dataset.logoSource = 'public-brand-svg';
      img.referrerPolicy = 'no-referrer';
      img.src = replacement.src;
    }
  });

});
