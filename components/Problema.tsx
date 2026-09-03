import { problema } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Reveal, Rotulo } from "./ui";

export default function Problema() {
  return (
    <section className="bg-areia-100 py-14 sm:py-20">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
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
                <div className="group fio grid grid-cols-[auto_1fr] items-start gap-x-5 border-b py-7 sm:gap-x-7 sm:py-8">
                  <span className="placa" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="display self-center text-[1.25rem] leading-[1.1] text-tinta sm:text-[1.6rem]">
                    {item.titulo}
                  </h3>

                  {/* No celular o texto ocupa a largura toda; no desktop alinha
                      sob o título, para a coluna de placas ficar limpa. */}
                  <p className="col-span-2 mt-4 max-w-[36rem] text-[0.95rem] leading-[1.65] text-tinta/70 sm:col-span-1 sm:col-start-2 sm:mt-0">
                    {item.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
