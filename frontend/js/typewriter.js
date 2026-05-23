/*
  typewriter.js
  - Typed.js bootstrapping for hero role
*/

export function initTypewriter() {
  const el = document.getElementById('typedRole');
  if (!el || !window.Typed) return;

  const roles = [
    'Full-Stack Developer',
    'Java Spring Boot Engineer',
    '3D WebGL Builder',
    'REST API Designer'
  ];

  // Typed.js expects string or array of strings.
  // eslint-disable-next-line no-new
  new window.Typed(el, {
    strings: roles,
    typeSpeed: 45,
    backSpeed: 22,
    backDelay: 900,
    loop: true,
    showCursor: false
  });
}

