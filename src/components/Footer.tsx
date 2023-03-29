import React from 'react';

function Footer() {
  return (
    <footer className="mt-5">
      Desenvolvido por{' '}
      <a
        href="https://github.com/caarlos1"
        className="footer-link"
        target="_blank"
        rel="noreferrer"
      >
        Carlos Roberto.
      </a>
      <a
        href="https://ko-fi.com/caarlos"
        className="footer-link"
        target="_blank"
        rel="noreferrer"
      >
        {' '}
        Me pague um café!
      </a>
    </footer>
  );
}
export default Footer;
