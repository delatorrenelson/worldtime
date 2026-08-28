import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setGlobalDisplayType,
  setGlobalAnalogTemplate,
  setGlobalDigitalTemplate,
} from "../features/timeZone/timeZoneSlice";
import { ANALOG_TEMPLATES, DIGITAL_TEMPLATES } from "../utils/clockTemplates";

export default function TemplateSelectorModal() {
  const dispatch = useAppDispatch();
  const globalDisplayType = useAppSelector(
    (state) => state.timeZone.globalDisplayType
  );
  const globalAnalogTemplate = useAppSelector(
    (state) => state.timeZone.globalAnalogTemplate
  );
  const globalDigitalTemplate = useAppSelector(
    (state) => state.timeZone.globalDigitalTemplate
  );

  const [activeTab, setActiveTab] = useState<'analog' | 'digital'>(
    globalDisplayType || 'analog'
  );

  return (
    <>
      <button
        onClick={() => {
          const modal = document.getElementById(
            "template_modal"
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
        className="btn btn-ghost btn-sm gap-2 font-medium"
        title="Choose Clock Design & Display Mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.006 0.612a15.997 15.997 0 011.62-3.388m5.006 1.62a15.997 15.997 0 001.62 3.388m-1.62-3.388a15.998 15.998 0 013.388 1.62m-3.388-1.62c.142-.348.22-.729.22-1.128a4.5 4.5 0 00-8.4-2.245 2.25 2.25 0 01-2.4-2.245 3 3 0 00-5.78-1.128m16.5 0a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4 2.245c0-.399-.078-.78-.22-1.128z"
          />
        </svg>
        <span className="hidden sm:inline">Clock Styles</span>
      </button>

      <dialog id="template_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-4xl bg-base-100 p-6 rounded-2xl shadow-2xl border border-base-300">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-base-content/60 hover:text-base-content">
              ✕
            </button>
          </form>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-base-200 gap-3">
            <div>
              <h3 className="font-bold text-2xl text-base-content">
                Clock Designs & Templates
              </h3>
              <p className="text-sm text-base-content/60 mt-1">
                Customize display mode and choose from curated clock face templates.
              </p>
            </div>

            {/* Display Mode Single Toggle Button */}
            <button
              className="btn btn-sm btn-primary gap-2 font-semibold shadow-sm"
              onClick={() => {
                const nextMode = globalDisplayType === "analog" ? "digital" : "analog";
                dispatch(setGlobalDisplayType(nextMode));
                setActiveTab(nextMode);
              }}
            >
              <span>Switch to {globalDisplayType === "analog" ? "Digital" : "Analog"}</span>
              <span className="badge badge-sm badge-ghost uppercase">
                {globalDisplayType}
              </span>
            </button>
          </div>

          {/* Modal Tabs */}
          <div className="tabs tabs-boxed my-4 bg-base-200 p-1">
            <button
              className={`tab flex-1 font-semibold ${
                activeTab === "analog" ? "tab-active bg-base-100 shadow" : ""
              }`}
              onClick={() => setActiveTab("analog")}
            >
              Analog Templates ({ANALOG_TEMPLATES.length})
            </button>
            <button
              className={`tab flex-1 font-semibold ${
                activeTab === "digital" ? "tab-active bg-base-100 shadow" : ""
              }`}
              onClick={() => setActiveTab("digital")}
            >
              Digital Templates ({DIGITAL_TEMPLATES.length})
            </button>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-1">
            {activeTab === "analog"
              ? ANALOG_TEMPLATES.map((tmpl) => {
                  const isSelected = globalAnalogTemplate === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => dispatch(setGlobalAnalogTemplate(tmpl.id))}
                      className={`card cursor-pointer border-2 transition-all duration-200 hover:scale-[1.02] p-4 flex flex-col justify-between ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                          : "border-base-300 bg-base-100 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-base text-base-content">
                          {tmpl.name}
                        </span>
                        {isSelected && (
                          <span className="badge badge-primary badge-sm">
                            Selected
                          </span>
                        )}
                      </div>

                      {/* Visual Preview */}
                      <div className="w-full h-32 rounded-xl bg-base-200/50 flex items-center justify-center p-3 my-2 border border-base-300 relative overflow-hidden">
                        <div
                          className={`w-24 h-24 rounded-full border-2 border-current relative flex items-center justify-center shadow-inner ${tmpl.previewBg}`}
                          style={{
                            color:
                              tmpl.previewBg.includes("slate-9") ||
                              tmpl.previewBg.includes("black") ||
                              tmpl.previewBg.includes("zinc-9") ||
                              tmpl.previewBg.includes("amber-950")
                                ? "#f8fafc"
                                : "#0f172a",
                          }}
                        >
                          <span className="absolute top-1 text-[10px] font-bold">
                            12
                          </span>
                          <span className="absolute right-1 text-[10px] font-bold">
                            3
                          </span>
                          <span className="absolute bottom-1 text-[10px] font-bold">
                            6
                          </span>
                          <span className="absolute left-1 text-[10px] font-bold">
                            9
                          </span>
                          {/* Hour hand */}
                          <div
                            className="absolute w-[2px] h-6 bg-current top-[22px] left-[47px] origin-bottom rounded"
                            style={{ transform: "rotate(45deg)" }}
                          />
                          {/* Min hand */}
                          <div
                            className="absolute w-[2px] h-8 bg-current top-[14px] left-[47px] origin-bottom rounded"
                            style={{ transform: "rotate(135deg)" }}
                          />
                          {/* Center dot */}
                          <div
                            className="absolute w-2 h-2 rounded-full z-10"
                            style={{ backgroundColor: tmpl.previewAccent }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-base-content/70 mt-2">
                        {tmpl.description}
                      </p>
                    </div>
                  );
                })
              : DIGITAL_TEMPLATES.map((tmpl) => {
                  const isSelected = globalDigitalTemplate === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => dispatch(setGlobalDigitalTemplate(tmpl.id))}
                      className={`card cursor-pointer border-2 transition-all duration-200 hover:scale-[1.02] p-4 flex flex-col justify-between ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                          : "border-base-300 bg-base-100 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-base text-base-content">
                          {tmpl.name}
                        </span>
                        {isSelected && (
                          <span className="badge badge-primary badge-sm">
                            Selected
                          </span>
                        )}
                      </div>

                      {/* Visual Digital Preview */}
                      <div className="w-full h-32 rounded-xl bg-base-200/50 flex items-center justify-center p-3 my-2 border border-base-300 relative overflow-hidden">
                        <div
                          className={`w-full h-20 rounded-xl flex flex-col items-center justify-center border border-white/10 ${tmpl.previewBg}`}
                        >
                          <span
                            className="text-2xl font-mono font-bold tracking-wider"
                            style={{ color: tmpl.previewAccent }}
                          >
                            10:24:38
                          </span>
                          <span className="text-[10px] uppercase font-semibold text-base-content/60 mt-1">
                            PM • LOCAL TIME
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-base-content/70 mt-2">
                        {tmpl.description}
                      </p>
                    </div>
                  );
                })}
          </div>

          <div className="modal-action border-t border-base-200 pt-4 mt-4">
            <form method="dialog">
              <button className="btn btn-primary px-6">Done</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
