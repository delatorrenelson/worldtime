import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setGlobalDisplayType,
  setGlobalAnalogTemplate,
  setGlobalDigitalTemplate,
} from "../features/timeZone/timeZoneSlice";
import { ANALOG_TEMPLATES, DIGITAL_TEMPLATES } from "../utils/clockTemplates";
import {
  TICKS,
  STANDARD_NUMBERS,
  ROMAN_NUMBERS,
} from "./Clock";
import { DigitalDisplay } from "./DigitalDisplay";

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

                      {/* Visual Analog Thumbnail - Matches Exact Clock Design */}
                      <div className="w-full h-32 rounded-xl bg-base-200/40 flex items-center justify-center p-2 my-2 border border-base-300/80 relative overflow-hidden">
                        <div
                          className={`clock outline tmpl-${tmpl.id} pointer-events-none shadow-md`}
                          style={{ "--clock-size": "96px" } as React.CSSProperties}
                        >
                          <div className="hour_hand" style={{ transform: "rotateZ(315deg)" }} />
                          <div className="min_hand" style={{ transform: "rotateZ(120deg)" }} />
                          <div className="sec_hand" style={{ transform: "rotateZ(210deg)" }} />

                          {tmpl.id === "seiko-combo" && (
                            <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 bg-slate-100 border border-slate-400 text-slate-900 px-1 py-0.5 rounded text-[7px] font-mono font-bold z-10">
                              FRI, AUG 28
                            </div>
                          )}

                          {tmpl.id === "military-24h" && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                              <div className="w-[62%] h-[62%] rounded-full border border-dashed border-stone-400/40 relative">
                                {[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((num, idx) => (
                                  <span
                                    key={num}
                                    className="absolute text-[6px] font-bold text-stone-500"
                                    style={{
                                      top: "50%",
                                      left: "50%",
                                      fontSize: "calc(96px * 0.048)",
                                      transform: `translate(-50%, -50%) rotate(${idx * 30 + 30}deg) translateY(calc(-1 * 0.25 * 96px)) rotate(-${idx * 30 + 30}deg)`,
                                    }}
                                  >
                                    {num}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Minute Ticks */}
                          {TICKS.map((i) => (
                            <div
                              key={`tick-${i}`}
                              className={`tick ${i % 5 === 0 ? "tick-hour" : "tick-minute"}`}
                              style={{
                                transform: `translate(-50%, -50%) rotate(${i * 6}deg) translateY(calc(-1 * var(--tick-radius) * 96px))`,
                              }}
                            />
                          ))}

                          {(tmpl.id === "roman" ? ROMAN_NUMBERS : STANDARD_NUMBERS).map((num) => (
                            <span key={num.class} className={num.class}>
                              {num.label}
                            </span>
                          ))}
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

                      {/* Visual Digital Thumbnail - Matches Exact Digital Design */}
                      <div className="w-full h-32 rounded-xl bg-base-200/40 flex items-center justify-center p-2 my-2 border border-base-300/80 relative overflow-hidden">
                        <div
                          className="flex items-center justify-center overflow-hidden rounded-2xl pointer-events-none"
                          style={{
                            width: "115px",
                            height: "115px",
                            "--clock-size": "115px",
                          } as React.CSSProperties}
                        >
                          <DigitalDisplay
                            template={tmpl.id}
                            time12="10:24"
                            secondsStr="38"
                            ampm="PM"
                            dayStr="FRI, AUG 28"
                          />
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
