import { IRItem } from "../types";
export function ItemsList({items,title,seeAllHref}:{items:IRItem[]; title:string; seeAllHref?:string}){
  return (
    <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-semibold">{title}</h3>
        {seeAllHref && <a className="underline" href={seeAllHref}>See all</a>}
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((it,i)=>(
          <li key={i} className="flex justify-between gap-4 border-b py-3">
            <a className="underline" href={it.href}>{it.title}</a>
            <time className="text-sm text-neutral-600">{new Date(it.date).toLocaleDateString()}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
