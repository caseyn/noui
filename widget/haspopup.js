self.addEventListener('click', function defuiHaspopup(e) {
  if (!e.target || !e.target.nodeType) return;
  
  var el = event.target;
  while (el.getAttribute && el.getAttribute('aria-haspopup') != 'true' && el.parentNode) {
    el = el.parentNode;
  }

  if (!el.getAttribute || el.getAttribute('aria-haspopup') != 'true') return;
  
  var state = el.getAttribute('aria-expanded') == 'true';
  
  el.setAttribute('aria-expanded', !state);
  
}, false);
