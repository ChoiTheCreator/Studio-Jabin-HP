import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taskwise AI | Admin Work, Automated",
  description:
    "Taskwise AI helps small businesses automate repetitive administrative work and save time every week.",
};

const features = [
  [
    "inbox",
    "Smart inbox",
    "Sort incoming requests, draft replies, and route messages to the right person automatically.",
  ],
  [
    "file",
    "Document processing",
    "Extract information from invoices, forms, and PDFs without manual data entry.",
  ],
  [
    "calendar",
    "Schedule coordination",
    "Find available times, send reminders, and keep your team calendar up to date.",
  ],
  [
    "sync",
    "Workflow automation",
    "Connect everyday tasks into reliable workflows that run in the background.",
  ],
];

const testimonials = [
  [
    "Taskwise handles the routine follow-ups and data entry that used to take hours every week. Our team can finally focus on customers.",
    "Rachel Kim",
    "Operations Manager, Northstar Studio",
    "RK",
  ],
  [
    "We set up our first workflow in an afternoon. It is straightforward, reliable, and has made our small team much more efficient.",
    "Marcus Reed",
    "Founder, Reed & Co.",
    "MR",
  ],
  [
    "The invoice automation alone has saved us several hours each month. Support has also been responsive whenever we need help.",
    "Priya Shah",
    "Director, Clearpath Consulting",
    "PS",
  ],
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    inbox: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m4 13 4-3 3 3h2l3-3 4 3" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h4M9 13h6m-6 4h6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4m8-4v4M3 10h18" />
      </>
    ),
    sync: (
      <>
        <path d="M20 7h-5V2M4 17h5v5" />
        <path d="M18.5 10a7 7 0 0 0-12-3L4 9m16 6-2.5 2a7 7 0 0 1-12-3" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V10m6 10V4m6 16v-7m5 7H2" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {paths[name]}
    </svg>
  );
}

export default function SaasPage() {
  return (
    <main data-saas-page className="min-h-screen bg-white font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-sm font-bold text-white">
              T
            </span>
            Taskwise AI
          </a>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 text-sm text-slate-600 md:flex"
          >
            <a className="hover:text-slate-950" href="#features">
              Features
            </a>
            <a className="hover:text-slate-950" href="#how">
              How it works
            </a>
            <a className="hover:text-slate-950" href="#customers">
              Customers
            </a>
            <a className="hover:text-slate-950" href="#pricing">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="hidden text-sm font-medium text-slate-600 hover:text-slate-950 sm:block"
            >
              Sign in
            </a>
            <a
              href="#pricing"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Start free
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="bg-slate-50 px-5 pt-20 pb-20 text-center sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            AI automation for small teams
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Spend less time on admin work.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Taskwise AI automates repetitive business tasks like inbox management, data entry,
            scheduling, and reporting—so your team can focus on growing the business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#pricing"
              className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Start free for 14 days
            </a>
            <a
              href="#preview"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">No credit card required · Setup in minutes</p>
        </div>

        <div
          id="features"
          className="mx-auto mt-16 grid max-w-7xl gap-6 text-left lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,.75fr)]"
        >
          <div
            id="preview"
            className="rounded-xl border border-slate-300 bg-white p-2 shadow-xl shadow-slate-200/60 sm:p-3"
          >
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-white px-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>
                <span className="text-xs font-medium text-slate-500">Taskwise workspace</span>
                <div className="h-6 w-6 rounded-full bg-blue-100" />
              </div>
              <div className="grid min-h-[440px] md:grid-cols-[150px_1fr]">
                <aside className="hidden border-r border-slate-200 bg-white p-3 md:block">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="grid h-6 w-6 place-items-center rounded bg-blue-600 text-[10px] text-white">
                      T
                    </span>
                    Taskwise
                  </div>
                  <div className="mt-5 space-y-1 text-[11px] text-slate-600">
                    <div className="rounded-md bg-blue-50 px-2.5 py-2 font-medium text-blue-700">
                      Overview
                    </div>
                    <div className="px-2.5 py-2">Automations</div>
                    <div className="px-2.5 py-2">Tasks</div>
                    <div className="px-2.5 py-2">Connections</div>
                    <div className="px-2.5 py-2">Reports</div>
                  </div>
                  <div className="mt-20 rounded-md border border-slate-200 p-2.5">
                    <p className="text-[9px] text-slate-500">Monthly usage</p>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                      <div className="h-full w-2/3 rounded-full bg-blue-600" />
                    </div>
                    <p className="mt-2 text-[9px] text-slate-400">1,284 / 2,000</p>
                  </div>
                </aside>
                <div className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold">Good morning, Alex</h2>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Here is what your automations completed this week.
                      </p>
                    </div>
                    <button className="rounded-md bg-blue-600 px-3 py-2 text-[10px] font-medium text-white">
                      + New automation
                    </button>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs text-slate-500">Tasks completed</p>
                      <strong className="mt-2 block text-2xl">486</strong>
                      <span className="text-[10px] text-emerald-600">↑ 18% this week</span>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs text-slate-500">Hours saved</p>
                      <strong className="mt-2 block text-2xl">32.4</strong>
                      <span className="text-[10px] text-emerald-600">↑ 6.2 hours</span>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-xs text-slate-500">Active workflows</p>
                      <strong className="mt-2 block text-2xl">12</strong>
                      <span className="text-[10px] text-slate-500">All systems running</span>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 xl:grid-cols-[1.2fr_1fr]">
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <div className="flex justify-between">
                        <h3 className="text-xs font-semibold">Task activity</h3>
                        <span className="text-[9px] text-slate-500">Last 7 days</span>
                      </div>
                      <div className="mt-4 flex h-24 items-end justify-between gap-2">
                        {[40, 62, 48, 80, 68, 92, 75].map((height, i) => (
                          <div
                            key={i}
                            className="flex h-full flex-1 items-end rounded-sm bg-blue-50"
                          >
                            <div
                              className="w-full rounded-sm bg-blue-500"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[8px] text-slate-400">
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                        <span>S</span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <h3 className="text-xs font-semibold">Active automations</h3>
                      <div className="mt-3 space-y-2">
                        {[
                          ["Invoice processing", "142 tasks"],
                          ["Lead follow-up", "86 tasks"],
                          ["Meeting reminders", "64 tasks"],
                        ].map(([name, count]) => (
                          <div key={name} className="flex items-center gap-2">
                            <span className="grid h-7 w-7 place-items-center rounded-md bg-blue-50 text-blue-600">
                              <Icon name="check" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <b className="block truncate text-[11px] font-medium">{name}</b>
                              <small className="text-[9px] text-slate-400">{count}</small>
                            </span>
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {features.map(([icon, title, text]) => (
              <article
                key={title}
                className="rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-blue-600">
                  <Icon name={icon} />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-blue-600">How it works</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Get started in three simple steps
            </h2>
          </div>
          <div className="relative mt-14 grid gap-8 md:grid-cols-3">
            <div className="absolute top-6 right-[16%] left-[16%] hidden border-t border-dashed border-slate-300 md:block" />
            {[
              [
                "1",
                "Connect your tools",
                "Link the email, calendar, forms, and business apps you already use.",
              ],
              [
                "2",
                "Choose a workflow",
                "Select a template and adjust the steps to match how your team works.",
              ],
              [
                "3",
                "Let Taskwise run",
                "Turn it on and review completed tasks from your dashboard anytime.",
              ],
            ].map(([number, title, text]) => (
              <article key={number} className="relative text-center">
                <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-full border-4 border-slate-50 bg-blue-600 text-sm font-semibold text-white">
                  {number}
                </span>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 text-center lg:grid-cols-4 lg:px-8">
          {[
            ["12+", "hours saved per week"],
            ["2.4M", "tasks automated"],
            ["1,800+", "small businesses"],
            ["99.9%", "platform uptime"],
          ].map(([value, label], i) => (
            <div
              key={label}
              className={i % 2 ? "border-l border-slate-700" : "lg:border-l lg:border-slate-700"}
            >
              <strong className="block text-3xl font-bold sm:text-4xl">{value}</strong>
              <span className="mt-2 block text-xs text-slate-400 sm:text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="customers" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-blue-600">Customer stories</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by growing teams
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map(([quote, name, company, initials]) => (
              <figure key={name} className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="text-sm text-amber-500">★★★★★</div>
                <blockquote className="mt-4 text-sm leading-7 text-slate-600">“{quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                    {initials}
                  </span>
                  <span>
                    <strong className="block text-sm">{name}</strong>
                    <span className="text-xs text-slate-500">{company}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-blue-600 py-20 text-white">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to reclaim your workday?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Start automating routine tasks today. Try every feature free for 14 days, then choose
            the plan that works for your team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:hello@taskwise.example?subject=Start%20free%20trial"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Start free trial
            </a>
            <a
              href="mailto:sales@taskwise.example?subject=Demo%20request"
              className="rounded-md border border-blue-300 px-6 py-3 text-sm font-semibold transition-colors hover:bg-blue-500"
            >
              Request a demo
            </a>
          </div>
          <p className="mt-4 text-xs text-blue-200">No credit card required · Cancel anytime</p>
        </div>
      </section>

      <footer className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-sm text-white">
                T
              </span>
              Taskwise AI
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              Practical AI automation that helps small businesses spend less time on repetitive
              administrative work.
            </p>
          </div>
          {[
            ["Product", "Features", "Integrations", "Pricing"],
            ["Company", "About", "Customers", "Contact"],
            ["Resources", "Help center", "Privacy", "Terms"],
          ].map(([heading, ...links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold">{heading}</h3>
              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
                {links.map((link) => (
                  <a key={link} className="hover:text-slate-900" href="#top">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-200 px-5 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between lg:px-8">
          <span>© 2026 Taskwise AI. All rights reserved.</span>
          <span>Built for small business teams.</span>
        </div>
      </footer>
    </main>
  );
}
