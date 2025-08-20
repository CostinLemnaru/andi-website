"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function HubspotForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Script
        src="https://js-eu1.hsforms.net/forms/embed/146673485.js"
        strategy="afterInteractive"
        defer
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="animate-pulse rounded-md bg-white/5 h-40 w-full" />
      )}
      <div
        ref={ref}
        className="hs-form-frame"
        data-region="eu1"
        data-form-id="50989600-fe13-4f21-bede-2ebb90491ea8"
        data-portal-id="146673485"
      />
      {/* Dark mode tweaks rapide (opțional) */}
      <style jsx global>{`
        .hs-form .input, .hs-form input, .hs-form select, .hs-form textarea {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
        }
        .hs-form label { color: #cbd5e1; } /* slate-300 */
        .hs-form .hs-button, .hs-form input[type="submit"] {
          background: #1f2937; border: 1px solid #374151; color: #fff;
        }
        .hs-error-msg, .hs-error-msgs { color: #f87171; }
      `}</style>
    </>
  );
}
