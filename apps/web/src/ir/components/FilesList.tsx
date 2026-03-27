import { IRFile } from "../types";
export function FilesList({items,title}:{items:IRFile[]; title:string}){
  return (
    <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((f,i)=>(
          <li key={i} className="border rounded-lg p-4 hover:shadow-sm">
            <div className="text-base font-medium">{f.title}</div>
            <div className="text-sm text-neutral-600 mt-1">{new Date(f.date).toLocaleDateString()}</div>
            <a className="mt-3 inline-flex underline" href={f.href}>Download</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
