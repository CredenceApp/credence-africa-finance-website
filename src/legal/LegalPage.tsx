import type { ReactNode } from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { NdpcStatement } from "../components/Compliance"

export type TocItem = { id: string; title: string }

export default function LegalPage({
  title,
  toc = [],
  effective,
  updated,
  notice,
  children,
}: {
  title: string
  toc?: TocItem[]
  effective?: string
  updated?: string
  notice?: boolean
  children?: ReactNode
}) {
  return (
    <div id="top">
      <Nav />
      <main>
        <header className="bg-near-black pt-36 pb-16 text-white md:pt-44 md:pb-24">
          <div className="wrap">
            <p className="eyebrow text-white/55">Legal</p>
            <h1 className="display-section mt-5 max-w-[48rem]">{title}</h1>
            {(effective || updated) && (
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-2 text-sm text-white/60">
                {effective && <div className="flex gap-2"><dt className="text-white/40">Effective date</dt><dd>{effective}</dd></div>}
                {updated && <div className="flex gap-2"><dt className="text-white/40">Last updated</dt><dd>{updated}</dd></div>}
              </dl>
            )}
          </div>
        </header>

        <div className="bg-warm-white text-near-black">
          <div className={`wrap grid grid-cols-[minmax(0,1fr)] gap-12 py-16 md:py-24 ${toc.length > 0 ? "lg:grid-cols-[14rem_minmax(0,800px)] lg:gap-20" : ""}`}>
            {toc.length > 0 && (
            <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Contents">
              <p className="eyebrow text-near-black/50">Contents</p>
                              <ol className="mt-4 border-l border-near-black/15">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: "smooth" }) }} className="-ml-px flex border-l border-transparent py-2 pl-4 text-sm text-near-black/65 transition-colors hover:border-near-black hover:text-near-black">
                        {t.title}
                      </a>
                    </li>
                  ))}
                </ol>
            </aside>
            )}

            <article className="min-w-0 max-w-[800px] text-[17px] leading-[1.8] text-near-black/85 [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_h2]:text-near-black [&_h3]:mt-8 [&_h3]:font-sans [&_h3]:text-xl [&_h3]:text-near-black [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:marker:text-near-black/40 [&_ul]:pl-6 [&_li]:mt-2">
              {notice && <NdpcStatement className="!mt-0 mb-10 border-l-2 border-green pl-5 text-[15px] leading-relaxed text-near-black/70" />}
              {(Array.isArray(children) ? children.length > 0 : children) ? children : (
                <div className="border-t border-near-black py-10">
                  <p className="font-display text-2xl tracking-[-0.02em] text-near-black md:text-3xl">Policy content is being finalised.</p>
                  <p className="mt-4 text-base text-near-black/65">Please contact Credence if you need information in the meantime.</p>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
