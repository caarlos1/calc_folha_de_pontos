import React from 'react';

function Footer() {
  return (
    <footer className="mt-5">
      Desenvolvido por{' '}
      <a
        href="https://github.com/caarlos1"
        target="_blank"
        rel="noreferrer"
        className="hover:text-purple-800"
      >
        Carlos Roberto.
      </a>
      <a
        href="https://ko-fi.com/caarlos"
        target="_blank"
        rel="noreferrer"
        className="hover:text-purple-800"
      >
        {' '}
        Me pague um café!
      </a>
    </footer>
  );
}
export default Footer;
