import { problema } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Reveal, Rotulo } from "./ui";

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

          {/* Placar de objeções. A placa ancora a linha; sem card. */}
          <ul className="fio border-t">
            {problema.itens.map((item, i) => (
              <Reveal as="li" key={item.titulo} atraso={i * 80}>
                <div className="group fio grid grid-cols-[auto_1fr] items-start gap-x-4 border-b py-5 sm:gap-x-7 sm:py-8">
                  <span className="placa" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Título e corpo no mesmo bloco: a placa marca o item inteiro,
                      e o item tem duas margens esquerdas, não três. */}
                  <div className="min-w-0">
                    <h3 className="display text-[1.15rem] leading-[1.12] text-tinta sm:text-[1.6rem]">
                      {item.titulo}
                    </h3>
                    <p className="mt-2.5 max-w-[36rem] text-[0.92rem] leading-[1.55] text-tinta/75 sm:mt-3 sm:text-[0.95rem] sm:leading-[1.65]">
                      {item.texto}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
