import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import * as storage from '../util/storage';

interface ThemeStore {
  dark: boolean;
}

function SwitchTheme() {
  const themeStorage = storage.get<ThemeStore>('themeOptions');
  const browserPreferDarkTherme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  const [darkTheme, setTheme] = useState<boolean>(themeStorage?.dark || false);

  const changeTheme = () => {
    storage.set('themeOptions', { dark: !darkTheme });
    setTheme(!darkTheme);
  };

  useEffect(() => {
    const classList = document.documentElement.classList;
    if (darkTheme) classList.add('dark');
    else classList.remove('dark');
  }, [darkTheme]);

  if (!themeStorage && browserPreferDarkTherme) {
    document.documentElement.classList.add('dark');
  }

  return (
    <button className="switch-button" onClick={() => changeTheme()}>
      <div className="switch-button__icon">
        {darkTheme ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </div>
    </button>
  );
}

export default SwitchTheme;
