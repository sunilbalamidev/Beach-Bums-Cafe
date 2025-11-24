"use client";
import React, { useMemo } from "react";

/* ---------- Basic Info ---------- */
const ADDRESS = "136 Carlton Beach Road, Dodges Ferry, Tasmania";
const PHONE = "+61 405108082";
const EMAIL = "saltybeachbums@gmail.com";
const MAPS_Q = encodeURIComponent(ADDRESS);

/* ---------- Opening Hours  ---------- */
const HOURS = {
  mon: { open: "09:00", close: "16:00" },
  tue: { open: "09:00", close: "16:00" },
  wed: { open: "09:00", close: "16:00" },
  thu: { open: "09:00", close: "19:00", note: "Nepalese Night after 4pm" },
  fri: { open: "09:00", close: "19:00" },
  sat: { open: "08:00", close: "19:00" },
  sun: { open: "08:00", close: "19:00" },
};

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* Format 24h -> "9am", "7pm" */
function fmt(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = ((h + 11) % 12) + 1;
  const ampm = h < 12 ? "am" : "pm";
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""}${ampm}`;
}

/* ---------- Hook: open/closed today ---------- */
function useTodayStatus() {
  const now = new Date();
  const keyOrder = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayKey = keyOrder[now.getDay()]; // "sun" | "mon" | ...

  const entry = HOURS[dayKey];

  const status = useMemo(() => {
    if (!entry)
      return { isOpen: false, label: "Hours unavailable", todayKey: dayKey };

    const [oh, om] = entry.open.split(":").map(Number);
    const [ch, cm] = entry.close.split(":").map(Number);
    const openMins = oh * 60 + om;
    const closeMins = ch * 60 + cm;
    const nowMins = now.getHours() * 60 + now.getMinutes();

    const isOpen = nowMins >= openMins && nowMins < closeMins;
    const label = isOpen
      ? `Open now · until ${fmt(entry.close)}`
      : `Closed · opens ${fmt(entry.open)}`;

    return { isOpen, label, todayKey: dayKey };
  }, [dayKey, entry, now]);

  return status;
}

/* ---------- Component ---------- */
export default function VisitUs() {
  const { isOpen, label, todayKey } = useTodayStatus();

  return (
    <section
      id="visit-us"
      className="py-12 md:py-20 bg-[var(--color-brand-bg,#f8f5f0)] border-t border-black/10"
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-10 items-start">
        {/* ---------- Left Column: Info ---------- */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-brand-teal,#007ba7)]">
            Visit Us
          </h2>

          {/* Address + Status */}
          <div className="rounded-2xl border border-black/10 bg-white p-4 md:p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm">
                <div className="font-medium text-[var(--color-brand-ink,#000)]">
                  {ADDRESS}
                </div>
                <div
                  className={`mt-1 text-xs ${
                    isOpen ? "text-green-700" : "text-black/60"
                  }`}
                >
                  {label}
                </div>
              </div>

              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs border ${
                  isOpen
                    ? "border-green-300 bg-green-100 text-green-800"
                    : "border-gray-300 bg-gray-100 text-gray-700"
                }`}
              >
                {isOpen ? "Open" : "Closed"}
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAPS_Q}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 text-sm border border-[var(--color-brand-teal,#007ba7)] text-[var(--color-brand-teal,#007ba7)] hover:bg-[var(--color-brand-teal,#007ba7)] hover:text-white transition-colors"
              >
                Get Directions
              </a>
              <a
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                className="rounded-full px-4 py-2 text-sm bg-[var(--color-brand-teal,#007ba7)] text-white hover:brightness-95 transition-colors"
              >
                Call Us
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-full px-4 py-2 text-sm border border-black/10 hover:bg-black/5 transition-colors"
              >
                Email
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="rounded-2xl border border-black/10 bg-white p-4 md:p-5">
            <h3 className="font-medium mb-3 text-[var(--color-brand-ink,#000)]">
              Opening Hours
            </h3>

            {/* Small helper line to mirror signage */}
            <div className="mb-2 text-xs text-black/60">
              Monday – Wednesday: 9am – 4pm
            </div>

            <ul className="divide-y divide-black/5 text-sm">
              {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((k, i) => {
                const isToday = k === todayKey;
                const entry = HOURS[k];

                return (
                  <li key={k} className="py-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-28 ${
                          isToday
                            ? "font-medium text-[var(--color-brand-teal,#007ba7)]"
                            : ""
                        }`}
                      >
                        {DAY_LABELS[i]}
                      </span>

                      {entry ? (
                        <span className="tabular-nums">
                          {fmt(entry.open)} — {fmt(entry.close)}
                        </span>
                      ) : (
                        <span className="text-black/50">Closed</span>
                      )}
                    </div>

                    {/* Thursday note directly under Thursday */}
                    {k === "thu" && entry?.note && (
                      <div className="pl-28 mt-1 text-xs text-black/60 italic">
                        {entry.note}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ---------- Right Column: Map ---------- */}
        <div className="rounded-2xl overflow-hidden border border-black/10 bg-white">
          <iframe
            title="Map to Beach Bums"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[320px] md:h-[420px] block"
            src={`https://www.google.com/maps?q=${MAPS_Q}&output=embed`}
          />
        </div>
      </div>
    </section>
  );
}
