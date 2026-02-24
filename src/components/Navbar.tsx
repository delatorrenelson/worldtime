import ThemeToggler from "./ThemeToggler"
import SizeToggler from "./SizeToggler"

export default function Navbar() {
  return (
    <div className="w-full navbar bg-base-300">
      <h1 className="flex-1 px-2 mx-2 font-bold text-xl stats-title">World Time</h1>
      <SizeToggler />
      <ThemeToggler />
      <div className="flex-none hidden lg:block">
        <label
          htmlFor="my-drawer-3"
          className="btn btn-square btn-ghost btn-circle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </label>
      </div>
    </div>
  );
}
