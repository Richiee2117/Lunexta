"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Dictionary } from "@/lib/i18n/dictionary";
import DeviceMockup, { DeviceType } from "@/components/ui/DeviceMockup";

function WebPreview({ t }: { t: Dictionary["servicePreview"]["web"] }) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-accent-a/20 via-ink to-ink p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{t.brand}</span>
        <div className="flex gap-3 text-[10px] text-foreground-dim">
          {t.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="mt-10 max-w-[70%]">
        <p className="text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
          {t.headline}
        </p>
        <span className="mt-4 inline-block rounded-full bg-gradient-to-r from-accent-a to-accent-b px-4 py-1.5 text-[11px] font-semibold text-ink">
          {t.cta}
        </span>
      </div>

      <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
        {[
          "from-accent-a/70 to-accent-a/20",
          "from-foreground/20 to-foreground/5",
          "from-accent-b/60 to-accent-b/15",
        ].map((grad, i) => (
          <div key={i} className={`aspect-[4/3] rounded-md bg-gradient-to-br ${grad}`} />
        ))}
      </div>
    </div>
  );
}

function EcommercePreview({ t }: { t: Dictionary["servicePreview"]["ecommerce"] }) {
  return (
    <div className="relative h-full w-full bg-ink p-4 pt-8">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-semibold text-foreground">{t.brand}</span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-[10px] text-foreground">
          2
        </div>
      </div>

      <div className="mt-4 px-1">
        <p className="text-[11px] text-foreground-dim">{t.catalog}</p>
        <p className="text-base font-bold text-foreground">{t.newCollection}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 px-1">
        {t.products.map((name) => (
          <div key={name} className="rounded-lg border border-border bg-ink-raised p-2">
            <div className="aspect-square rounded-md bg-gradient-to-br from-accent-a/70 to-accent-b/60" />
            <p className="mt-2 text-[10px] text-foreground">{name}</p>
            <p className="text-[10px] font-medium text-accent-b">$—</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4 rounded-full bg-gradient-to-r from-accent-a to-accent-b py-2.5 text-center text-[11px] font-semibold text-ink">
        {t.checkout}
      </div>
    </div>
  );
}

function POSPreview({ t }: { t: Dictionary["servicePreview"]["pos"] }) {
  return (
    <div className="relative flex h-full w-full bg-ink">
      <div className="flex w-3/5 flex-col gap-2 border-r border-border p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">{t.title}</span>
          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] text-foreground">
            {t.activeShift}
          </span>
        </div>
        {t.items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-md bg-ink-raised px-3 py-2"
          >
            <span className="text-[11px] text-foreground">{item}</span>
            <span className="text-[11px] font-medium text-foreground-dim">$—</span>
          </div>
        ))}
      </div>

      <div className="flex w-2/5 flex-col justify-between bg-ink-raised p-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-foreground-dim">{t.total}</p>
          <p className="text-2xl font-bold text-foreground">$—</p>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md bg-foreground/5 py-2 text-center text-[10px] text-foreground-dim"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <span className="rounded-full bg-gradient-to-r from-accent-a to-accent-b py-2 text-center text-[11px] font-semibold text-ink">
          {t.charge}
        </span>
      </div>
    </div>
  );
}

export default function ServicePreview({ deviceType }: { deviceType: DeviceType }) {
  const { t } = useLanguage();
  const preview =
    deviceType === "browser" ? (
      <WebPreview t={t.servicePreview.web} />
    ) : deviceType === "phone" ? (
      <EcommercePreview t={t.servicePreview.ecommerce} />
    ) : (
      <POSPreview t={t.servicePreview.pos} />
    );

  return <DeviceMockup type={deviceType}>{preview}</DeviceMockup>;
}
