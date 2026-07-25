"use client";

import { ReactNode } from "react";

export type DeviceType = "browser" | "phone" | "pos";

export default function DeviceMockup({
  type,
  children,
  className = "",
  url = "lunextasoft.com",
}: {
  type: DeviceType;
  children: ReactNode;
  className?: string;
  url?: string;
}) {
  if (type === "phone") {
    return (
      <div
        className={`mx-auto w-full max-w-[280px] rounded-[2.5rem] border-[6px] border-ink-raised bg-ink-raised p-1.5 shadow-2xl ${className}`}
      >
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-ink">
          <div className="absolute left-1/2 top-2 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-ink-raised" />
          {children}
        </div>
      </div>
    );
  }

  if (type === "pos") {
    return (
      <div className={`mx-auto w-full max-w-md ${className}`}>
        <div className="rounded-2xl border border-border bg-ink-raised p-3 shadow-2xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink">
            {children}
          </div>
        </div>
        <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-ink-raised/70" />
      </div>
    );
  }

  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-xl border border-border bg-ink-raised shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground-dim/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground-dim/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground-dim/25" />
        <div className="ml-3 flex-1 truncate rounded-full bg-foreground/5 px-3 py-1 text-[11px] text-foreground-dim/70">
          {url}
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">{children}</div>
    </div>
  );
}
