import { faq, faqRemate, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import { Manchete, Olho } from "./ui";

/**
 * Perguntas honestas.
 *
 * `details/summary` nativo: acessível de graça, funciona sem JavaScript e
 * abre direto quando alguém chega pelo Ctrl+F do navegador. O sinal de mais
 * gira 135° ao abrir (regra em globals.css), que é o feedback mais barato que
 * existe.
 *
 * As oito perguntas também alimentam o JSON-LD de FAQPage no layout, então
 * mexer aqui muda o rich result do Google junto.
 */
export default function Faq() {
  return (
    <section
      id="duvidas"
      className="border-t border-line bg-navy px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[80rem] gap-9 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <header className="text-center sm:text-left lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Olho>Perguntas honestas</Olho>
          </Reveal>
          <Manchete
            linhas={["Ainda ficou", "alguma"]}
            destaque="dúvida?"
            umaLinha
            className="mt-5 text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,3.6rem)]"
          />
          <Reveal atraso={140}>
            <p className="mx-auto mt-6 max-w-[26rem] text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-7">
              {faqRemate}{" "}
              <a
                href={marca.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-4 transition-colors hover:text-accent-soft"
              >
                {marca.instagramHandle}
              </a>
            </p>
          </Reveal>
        </header>

        <div className="border-t border-line text-left">
          {faq.map((item, i) => (
            <Reveal key={item.p} atraso={i * 40}>
              <details className="group border-b border-line">
                <summary className="flex items-start justify-between gap-5 py-5 text-left sm:gap-6 sm:py-6">
                  <h3 className="text-[1rem] leading-snug font-semibold text-ink transition-colors group-hover:text-accent sm:text-[1.08rem]">
                    {item.p}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="cruz mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-mute transition-transform duration-300 group-hover:border-accent group-hover:text-accent"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[42rem] pb-6 text-[1rem] leading-[1.65] text-mute sm:pb-7 sm:text-[0.95rem]">
                  {item.r}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
