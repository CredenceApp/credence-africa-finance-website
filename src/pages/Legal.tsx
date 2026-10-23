import type { ComponentType, ReactNode } from "react"
import LegalPage from "../legal/LegalPage"
import { docs, type Block, type LegalDoc } from "../legal/content"

const inline = (s: string): ReactNode =>
  s.split("**").map((t, i) => (i % 2 ? <strong key={i} className="font-semibold text-near-black">{t}</strong> : t))

const render = (b: Block, i: number): ReactNode => {
  if ("p" in b) return <p key={i}>{inline(b.p)}</p>
  if ("h3" in b) return <h3 key={i}>{b.h3}</h3>
  if ("ul" in b) return <ul key={i}>{b.ul.map((li) => <li key={li}>{inline(li)}</li>)}</ul>
  if ("ol" in b) return <ol key={i} className="mt-5 list-[lower-alpha] pl-6 [&_li]:mt-2">{b.ol.map((li) => <li key={li}>{inline(li)}</li>)}</ol>
  if ("lines" in b) return <p key={i}>{b.lines.map((l, k) => <span key={k} className="block">{l}</span>)}</p>
  return (
    <div key={i} className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-[15px] leading-relaxed">
        <thead>
          <tr className="border-b border-near-black">
            {b.table.head.map((h) => <th key={h} scope="col" className="py-3 pr-6 text-xs font-medium uppercase tracking-[0.1em] text-near-black/60">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {b.table.rows.map((r) => (
            <tr key={r[0]} className="border-b border-near-black/15 align-top">
              {r.map((c, k) => (k === 0 ? <th key={k} scope="row" className="py-4 pr-6 font-medium text-near-black">{c}</th> : <td key={k} className="py-4 pr-6">{c}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const make = (title: string, doc: LegalDoc | null, notice?: boolean): ComponentType => () => (
  <LegalPage title={title} effective={doc?.effective} updated={doc?.updated} toc={doc?.sections.map(({ id, title }) => ({ id, title }))} notice={notice}>
    {doc && [
      ...(doc.intro ?? []).map(render),
      ...doc.sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-28">
          <h2>{s.title}</h2>
          {s.blocks.map(render)}
        </section>
      )),
    ]}
  </LegalPage>
)

export const legalPages: Record<string, ComponentType> = {
  terms: make("Terms and Conditions of Use", docs.terms),
  privacy: make("Privacy Policy", docs.privacy, true),
  cookies: make("Cookie Policy", docs.cookies),
  disclaimer: make("Website Disclaimer", docs.disclaimer),
  "information-security": make("Information Security Policy", null),
  "aml-cft-cpf": make("AML/CFT/CPF Policy", null),
}
