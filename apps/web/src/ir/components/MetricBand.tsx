"use client";
import { useEffect, useState } from "react";
import type { Price } from "../types";
export default function MetricBand(){
  const [p,setP]=useState<Price|null>(null);
  useEffect(()=>{ fetch("/data/ir/price.json").then(r=>r.json()).then(setP).catch(()=>{}); },[]);
  return (
    <section className="relative bg-[var(--ir-bg)]">
      <div className="ir-topbar" />
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 md:grid-cols-[.58fr_.42fr] items-center gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ir-text)]">Investor Snapshot</h2>
          <p className="mt-4 text-[16px] leading-7 text-[var(--ir-muted)]">Key figures (placeholder). Replace with live feed.</p>
          <a className="mt-6 inline-block underline text-[var(--ir-text)]" href="#investor-relations">Investor Relations</a>
        </div>
        <div className="relative ir-pattern rounded-md">
          <div className="relative z-10 text-right p-6 md:p-8">
            <div className="text-[64px] md:text-[120px] leading-[0.95] font-extrabold tracking-[-0.01em] text-[var(--ir-text)]">
              {p ? <><span className="align-top text-3xl mr-1">{p.currency==="USD"?"$":""}</span>{p.value.toFixed(2)}</> : "—"}
            </div>
            <div className="mt-2 text-sm text-[var(--ir-muted)]">{p?.symbol ?? "—"} · {p?.asOf ?? ""}</div>
          </div>
        </div>
      </div>
      <div className="ir-botrule" />
    </section>
  );
}
