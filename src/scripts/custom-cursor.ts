const hasHover = window.matchMedia('(hover: hover)').matches;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hasHover && !prefersReduced) {
  // === Custom Cursor ===
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  let cursorX = -100;
  let cursorY = -100;
  let pending = false;

  function render() {
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    pending = false;
  }

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (!pending) {
      pending = true;
      requestAnimationFrame(render);
    }
  }, { passive: true });

  const interactiveSelectors = 'a, button, [role="button"], input, textarea, select';
  document.addEventListener('mouseover', (e) => {
    if ((e.target as Element).closest(interactiveSelectors)) {
      cursor.classList.add('custom-cursor--hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as Element).closest(interactiveSelectors)) {
      cursor.classList.remove('custom-cursor--hover');
    }
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  // === Hero Letter Split & Hover ===
  function splitTextIntoChars(text: string): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const words = text.split(/( )/);
    words.forEach((word) => {
      if (word === ' ') {
        const space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        fragment.appendChild(space);
      } else if (word.length > 0) {
        const wordWrap = document.createElement('span');
        wordWrap.style.whiteSpace = 'nowrap';
        wordWrap.style.display = 'inline';
        word.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.classList.add('hero__char');
          wordWrap.appendChild(span);
        });
        fragment.appendChild(wordWrap);
      }
    });
    return fragment;
  }

  function splitTextNodes(parent: Element) {
    const nodes = Array.from(parent.childNodes);
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        parent.replaceChild(splitTextIntoChars(text), node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        splitTextNodes(node as Element);
      }
    });
  }

  const heroLines = document.querySelectorAll('.hero__line');
  heroLines.forEach((line) => splitTextNodes(line));

  const heroChars = document.querySelectorAll('.hero__char');

  heroChars.forEach((char) => {
    const el = char as HTMLElement;

    el.addEventListener('mouseenter', () => {
      const randomRotation = (Math.random() - 0.5) * 30;
      const randomY = -5 - Math.random() * 15;

      el.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = `translateY(${randomY}px) rotate(${randomRotation}deg) scale(1.15)`;

      cursor.classList.add('custom-cursor--text');
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = '';

      cursor.classList.remove('custom-cursor--text');
    });
  });
}
