(function (window, document) {
  "use strict";

  window.addEventListener('click', onclick, false);
  window.addEventListener('keyup', onkeyup, false);
  
  var active;
  
  function onclick(e) {
    var el, expanded, owns;
  
    if (e.defaultPrevented) return;

    el = get(e.target);
  
    if (active && !active.isSameNode(el)) {
      close(active);
      active = undefined;
    }

    if (el.getAttribute && el.getAttribute('aria-haspopup') == 'true') {
      toggle(el);
      active = el;
    }
  }

  function onkeyup(e) {
    var el, expanded, owns;
  
    if (e.defaultPrevented) return;

    el = e.target;

    if (el.getAttribute && el.getAttribute('aria-haspopup') == 'true') {
      switch (e.keyCode) {
        // TAB
        case 9:
        // SHIFT TAB
        case 16:
          if (!active) break;
          el = active;
        // ESC
        case 27:
          if (isopen(el)) close(el);
          break;
        // Down
        case 40:
          open(el);
          active =el;
          break;
      }
    }
  }
  
  function get(el) {
    if (el.nodeType) {
      while (el.getAttribute && el.getAttribute('aria-haspopup') != 'true' && el.parentNode) {
        el = el.parentNode;
      }
    }
    return el;
  }
  
  function isopen(el) {
    return el.getAttribute('aria-expanded') == 'true';
  }
  
  function toggle(el) {
    var owns, expanded;
    
    expanded = isopen(el);
  
    el.setAttribute('aria-expanded', !expanded);
  
    owns = el.getAttribute('aria-owns');
    if (owns) {
      owns = document.getElementById(owns);
      owns.setAttribute('aria-hidden', expanded);
    }
  }
  
  function open(el) {
    var owns;
    
    el.setAttribute('aria-expanded', true);
  
    owns = el.getAttribute('aria-owns');
    if (owns) {
      owns = document.getElementById(owns);
      owns.setAttribute('aria-hidden', false);
    }
  }
  
  function close(el) {
    var owns;
    
    el.setAttribute('aria-expanded', false);
  
    owns = el.getAttribute('aria-owns');
    if (owns) {
      owns = document.getElementById(owns);
      owns.setAttribute('aria-hidden', true);
    }
  }
  
}(window, document));
