import { faq } from "@/lib/content";
import { Reveal, Rotulo } from "./ui";

export default function Faq() {
  return (
    <section id="duvidas" className="bg-areia-100 py-24 sm:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Rotulo>Perguntas honestas</Rotulo>
            </Reveal>
            <Reveal atraso={70}>
              <h2 className="display mt-6 text-[clamp(2.3rem,6.8vw,3.6rem)] text-tinta">
                Ainda ficou
                <span className="block text-mar-600">alguma dúvida?</span>
              </h2>
            </Reveal>
          </div>

          <div className="fio border-t">
            {faq.map((item, i) => (
              <Reveal key={item.p} atraso={i * 50}>
                <details className="group fio border-b py-6">
                  <summary className="flex items-start justify-between gap-6 text-left">
                    <h3 className="text-[1.02rem] font-bold tracking-tight text-tinta transition-colors group-hover:text-sol-600 sm:text-[1.08rem]">
                      {item.p}
                    </h3>
                    <span className="cruz mt-0.5 shrink-0 text-2xl leading-none font-light text-sol-500 transition-transform duration-300">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[42rem] pr-8 text-[0.96rem] leading-[1.7] text-tinta/68">
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
