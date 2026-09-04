import { problema } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Regua, Reveal, Rotulo } from "./ui";

export default function Problema() {
  return (
    <section className="bg-areia-100 py-11 sm:py-20">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
          {/* trilho à esquerda */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Rotulo>{problema.olho}</Rotulo>
            </Reveal>
            {/* A frase que fica: escrita para ser lida em voz alta. */}
            <h2 className="display mt-8 text-[clamp(2.2rem,6vw,3.6rem)] leading-none tracking-tight text-tinta">
              <LinhasReveal
                linhas={problema.titulo.map((linha, i) => (
                  <span key={linha} className={i > 1 ? "text-noite-600" : undefined}>
                    {linha}
                  </span>
                ))}
              />
            </h2>
            <Reveal atraso={130}>
              <p className="mt-8 max-w-[26rem] text-[1.05rem] leading-[1.7] text-tinta/80 font-medium">
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
