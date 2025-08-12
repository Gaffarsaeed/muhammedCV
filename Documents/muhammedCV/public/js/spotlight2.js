// /public/js/awards-butterflies.js
(() => {
    const root = document.querySelector('.butterfly-cards');
    if (!root) return;
  
    const radios = Array.from(root.querySelectorAll('input[name="award"]'));
    const thumbs = Array.from(root.querySelectorAll('.circle-container .thumb'));
  
    function select(i) {
      if (radios[i]) radios[i].checked = true;
    }
  
    // Click (and keyboard) on thumbs selects the matching panel
    thumbs.forEach((t, i) => {
      t.style.cursor = 'pointer';
      t.tabIndex = 0;
      t.setAttribute('role', 'button');
      t.setAttribute('aria-label', `Show award ${i + 1}`);
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
      });
    });
  
    // Arrow key navigation
    root.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = radios.length;
      let idx = radios.findIndex(r => r.checked);
      if (idx < 0) idx = 0;
      select(e.key === 'ArrowRight' ? (idx + 1) % n : (idx - 1 + n) % n);
    });
  
    // Optional: deep-link support (#award-2)
    if (location.hash.startsWith('#award-')) {
      const idx = parseInt(location.hash.replace('#award-', ''), 10) - 1;
      if (!Number.isNaN(idx)) select(idx);
    }
  })();
  