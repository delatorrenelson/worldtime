import React, { useState, useEffect } from 'react';

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk"
];

const ThemeToggler = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">


      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost m-1">
          Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048">
            <path d="M225.922 560.697L1024 1358.75l998.078-798.053L2048 706.75l-1024 819.25L0 706.75l225.922-146.053z"></path>
          </svg>
        </div>
        <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm max-h-[70vh] overflow-y-auto flex-nowrap">
          {themes.map((t) => (
            <li key={t}>
              <button
                onClick={() => setTheme(t)}
                className={`flex items-center gap-3 px-3 py-2 ${theme === t ? 'active' : ''}`}
              >
                <div data-theme={t}
                  className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm border border-base-content/10">
                  <div className="bg-primary size-1.5 rounded-full"></div>
                  <div className="bg-secondary size-1.5 rounded-full"></div>
                  <div className="bg-accent size-1.5 rounded-full"></div>
                  <div className="bg-neutral size-1.5 rounded-full"></div>
                </div>
                <span className="flex-1 text-left">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`h-3 w-3 shrink-0 ${theme === t ? 'visible' : 'invisible'}`}><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path></svg>

              </button>
            </li>
          ))}
        </ul>
      </div>
      <ul tabIndex={0} className=" hidden dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 max-h-96 overflow-y-auto">

      </ul>
    </div>
  );
};

export default ThemeToggler;
