import { problema } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Regua, Reveal, Rotulo } from "./ui";

export default function Problema() {
  return (
    <section className="bg-areia-100 py-11 sm:py-20">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* trilho à esquerda */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Rotulo>{problema.olho}</Rotulo>
            </Reveal>
            {/* A frase que fica: escrita para ser lida em voz alta. */}
            <h2 className="display mt-6 text-[clamp(1.87rem,5.46vw,3.04rem)] text-tinta">
              <LinhasReveal
                linhas={problema.titulo.map((linha, i) => (
                  <span key={linha} className={i > 1 ? "text-noite-600" : undefined}>
                    {linha}
                  </span>
                ))}
              />
            </h2>
            <Reveal atraso={130}>
              <p className="mt-7 max-w-[25rem] text-[1rem] leading-[1.68] text-tinta/70">
                {problema.texto}
              </p>
            </Reveal>
          </div>

          {/*
            Cada trava abre com a régua de progresso. Sem caixa, sem quadrado:
            o número informa a posição e o fio informa quanto falta.
          */}
          <ul>
            {problema.itens.map((item, i) => (
              <Reveal
                as="li"
                key={item.titulo}
                atraso={i * 70}
                className="group block pt-7 first:pt-0"
              >
                <Regua atual={i + 1} total={problema.itens.length} />

                <h3 className="display mt-3 text-[1.45rem] leading-[1.05] text-tinta sm:text-[1.95rem]">
                  {item.titulo}
                </h3>
                <p className="mt-3 max-w-[34rem] pb-1 text-[0.92rem] leading-[1.55] text-tinta/75 sm:text-[0.98rem]">
                  {item.texto}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
