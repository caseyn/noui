self.addEventListener('click', function listener(e) {
  var el, expanded, owns;

  if (e.target.nodeType) {
    el = event.target;
    while (el.getAttribute && el.getAttribute('aria-haspopup') != 'true' && el.parentNode) {
      el = el.parentNode;
    }
  }
  
  if (listener.active && !listener.active.isSameNode(el)) {
    listener.active.setAttribute('aria-expanded', false);
  
    owns = listener.active.getAttribute('aria-owns');
    if (owns) {
      owns = document.getElementById(owns);
      owns.setAttribute('aria-hidden', true);
    }
    delete listener.active;
  }

  if (el.getAttribute && el.getAttribute('aria-haspopup') == 'true') {
    expanded = el.getAttribute('aria-expanded') == 'true';
  
    el.setAttribute('aria-expanded', !expanded);
  
    owns = el.getAttribute('aria-owns');
    if (owns) {
      owns = document.getElementById(owns);
      owns.setAttribute('aria-hidden', expanded);
    }
  
    listener.active = el;
  }
  
}, false);
