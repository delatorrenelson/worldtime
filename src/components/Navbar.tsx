import ThemeToggler from "./ThemeToggler";
import SizeToggler from "./SizeToggler";
import TemplateSelectorModal from "./TemplateSelectorModal";

export default function Navbar() {
  return (
    <div className="w-full navbar bg-base-300 gap-2">
      <div className="flex-1 flex items-center gap-2 px-2 mx-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-7 h-7 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="256" cy="256" r="216" />
          <path d="M 256 95 A 161 161 0 0 0 256 417" />
          <line x1="256" y1="95" x2="256" y2="128" />
          <line x1="175.5" y1="116.6" x2="190.5" y2="142.5" />
          <line x1="116.6" y1="175.5" x2="142.5" y2="190.5" />
          <line x1="95" y1="256" x2="128" y2="256" />
          <line x1="116.6" y1="336.5" x2="142.5" y2="321.5" />
          <line x1="175.5" y1="395.4" x2="190.5" y2="369.5" />
          <line x1="256" y1="417" x2="256" y2="384" />
          <circle cx="256" cy="256" r="14" />
          <line x1="256" y1="238" x2="256" y2="135" />
          <line x1="244" y1="268" x2="192" y2="320" />
          <path d="M 256 40 A 155 216 0 0 1 256 472" />
          <line x1="272" y1="256" x2="472" y2="256" />
          <path d="M 275 170 Q 380 170 448 202" />
          <path d="M 275 342 Q 380 342 448 310" />
        </svg>
        <h1 className="font-bold text-xl stats-title">WorldTime</h1>
      </div>
      <TemplateSelectorModal />
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
