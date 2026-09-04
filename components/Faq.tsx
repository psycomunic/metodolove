import { faq, marca } from "@/lib/content";
import { Reveal, Rotulo } from "./ui";

/**
 * Dúvidas.
 *
 * Três coisas mudaram em set/2026, todas para a seção parar de ler como uma
 * pilha de fios finos:
 *
 * 1. A primeira pergunta abre sozinha. Um acordeão todo fechado é uma lista de
 *    traços: não mostra que há resposta ali, e quem não clica não descobre.
 * 2. O sinal de mais virou um alvo redondo de 40px. Antes era um caractere
 *    solto, pequeno demais para a mão e sem afirmar que a linha é clicável.
 * 3. A coluna da esquerda terminava no ar embaixo da manchete. Ganhou o
 *    convite de contato, que é o destino natural de quem não achou a dúvida
 *    dele e é o último ponto de fuga antes do CTA final.
 */
export default function Faq() {
  return (
    <section id="duvidas" className="bg-areia-100 py-14 sm:py-20">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Rotulo>Perguntas honestas</Rotulo>
            </Reveal>
            <Reveal atraso={70}>
              <h2 className="display mt-6 text-[clamp(1.79rem,5.3vw,2.81rem)] text-tinta">
                Ainda ficou
                <span className="block text-noite-600">alguma dúvida?</span>
              </h2>
            </Reveal>
            <Reveal atraso={130}>
              <div className="fio mt-8 border-t pt-7">
                <p className="text-[0.95rem] leading-[1.65] text-tinta/65">
                  Não achou a sua? Manda a pergunta que eu respondo.
                </p>
                <a
                  href={marca.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rotulo mt-4 inline-flex items-center gap-2 text-noite-600 transition-colors hover:text-sol-600"
                >
                  {marca.instagramHandle}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="fio border-t">
            {faq.map((item, i) => (
              <Reveal key={item.p} atraso={i * 50}>
                <details
                  // A primeira já vem aberta: mostra que há resposta e dá
                  // altura à seção, que fechada virava só uma pilha de fios.
                  open={i === 0}
                  className="group fio border-b"
                >
                  <summary className="flex items-center justify-between gap-6 py-6 text-left">
                    <h3 className="text-[1.02rem] font-bold tracking-tight text-tinta transition-colors group-hover:text-sol-600 sm:text-[1.1rem]">
                      {item.p}
                    </h3>
                    <span className="fio flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-tinta/50 transition-colors duration-300 group-hover:border-sol-500 group-hover:text-sol-500">
                      <span className="cruz text-xl leading-none font-light transition-transform duration-300">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="max-w-[42rem] pr-8 pb-7 text-[0.96rem] leading-[1.7] text-tinta/68">
                    {item.r}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
