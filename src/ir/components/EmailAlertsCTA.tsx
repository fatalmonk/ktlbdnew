export default function EmailAlertsCTA(){
  return (
    <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 bg-neutral-50 rounded-xl my-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold">Email Alerts</h3>
          <p className="text-neutral-600 mt-2">Subscribe to updates (placeholder form).</p>
        </div>
        <form className="flex gap-3 w-full md:w-auto">
          <input className="border rounded-md px-3 h-11 w-full md:w-80" placeholder="you@example.com" aria-label="Email"/>
          <button className="h-11 px-5 rounded-md bg-black text-white">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
