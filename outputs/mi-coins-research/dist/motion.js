(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const elements = [...document.querySelectorAll('.section-top,.overview-meta,.goals,.research-card,.insight-summary,.audit,.relation-head,.relation-row,.order-line,.strategy,.directions,.closing,.refs,.ai')];
  let observer;
  function showAll() {
    observer?.disconnect();
    elements.forEach(element => element.classList.remove('is-pending'));
  }
  function start() {
    showAll();
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
    elements.forEach(element => {
      // Never hide content already visible, including navigation to a deep link.
      if (element.getBoundingClientRect().top < innerHeight) return;
      element.classList.add('reveal', 'is-pending');
      observer.observe(element);
    });
  }
  reduceMotion.addEventListener('change', start);
  addEventListener('beforeprint', showAll);
  addEventListener('pagehide', showAll);
  addEventListener('pageshow', start);
  start();
})();

(() => {
  const audit = document.querySelector('.audit');
  const svg = audit?.querySelector('.audit-lines');
  if (!svg) return;
  // Layout offsets exclude reveal/hover transforms, so connectors remain stable.
  const relativeOffset = element => {
    let x = 0, y = 0;
    while (element && element !== audit) {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    }
    return { x, y };
  };
  function draw() {
    svg.setAttribute('viewBox', `0 0 ${audit.clientWidth} ${audit.clientHeight}`);
    ['one', 'two', 'three'].forEach((name, index) => {
      const marker = audit.querySelector(`.marker.${name}`);
      const card = audit.querySelector(`#problem-0${index + 1}`);
      const heading = card.querySelector('.eyebrow');
      const start = relativeOffset(marker);
      const end = relativeOffset(card);
      const label = relativeOffset(heading);
      const x1 = start.x + marker.offsetWidth;
      // Badges use translateY(-50%) to center on the screenshot annotation.
      const y1 = start.y;
      const x2 = end.x - 5;
      const y2 = label.y + heading.offsetHeight / 2;
      const elbow = x1 + Math.max(6, (x2 - x1) * .5);
      svg.querySelector(`.connector-${name}`).setAttribute('d', `M ${x1} ${y1} H ${elbow} V ${y2} H ${x2}`);
      const dot = svg.querySelector(`.endpoint-${name}`);
      dot.setAttribute('cx', x2);
      dot.setAttribute('cy', y2);
    });
  }
  let scheduled;
  function schedule() {
    cancelAnimationFrame(scheduled);
    scheduled = requestAnimationFrame(draw);
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(audit);
    audit.querySelectorAll('.audit-map,.problem').forEach(element => observer.observe(element));
  }
  document.fonts?.ready.then(schedule);
  addEventListener('resize', schedule);
  addEventListener('beforeprint', draw);
  addEventListener('afterprint', schedule);
  draw();
})();
