import { publico } from "@/lib/content";
import { CabecalhoSecao, Check, Reveal } from "./ui";

export default function Publico() {
  return (
    <section className="bg-areia-100 py-24 sm:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <CabecalhoSecao
          rotulo="Antes de você decidir"
          titulo={
            <h2 className="display mt-6 max-w-[24rem] text-[clamp(1.87rem,5.46vw,2.96rem)] text-tinta">
              Isso aqui não é<span className="block text-noite-600">pra todo mundo.</span>
            </h2>
          }
          // O remate subiu do rodapé da segunda coluna para cá. Ele é a frase
          // mais forte da seção e estava enterrado no fim de uma lista.
          texto={
            <span className="block text-[1.06rem] leading-[1.6] font-medium text-tinta">
              {publico.remate}
            </span>
          }
        />

        {/* duas colunas separadas por fio vertical, sem caixas */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal atraso={110}>
            <h3 className="rotulo fio border-b pb-4 text-noite-600">É pra você se…</h3>
            <ul className="mt-7 space-y-5">
              {publico.eh.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-[1rem] leading-[1.5] font-medium text-tinta"
                >
                  <Check className="mt-0.5 h-5 w-5 text-noite-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal atraso={180}>
            <div className="lg:fio lg:border-l lg:pl-16">
              <h3 className="rotulo fio border-b pb-4 text-areia-500">
                Não é pra você se…
              </h3>
              <ul className="mt-7 space-y-5">
                {publico.naoEh.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[0.95rem] leading-[1.5] text-tinta/55"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-5 w-5 shrink-0 text-areia-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
