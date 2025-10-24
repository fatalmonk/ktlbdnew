import { KPI } from "../types";
export function KPIGrid({items}:{items:KPI[]}){
  return (
    <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
      <h3 className="text-2xl font-semibold">Key KPIs</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map((k,i)=>(
          <div key={i} className="rounded-lg border p-5">
            <div className="text-sm text-neutral-600">{k.label}</div>
            <div className="mt-2 text-2xl font-semibold">{k.value}</div>
            {k.footnote && <div className="mt-1 text-xs text-neutral-500">{k.footnote}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
