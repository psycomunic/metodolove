import { problema } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Reveal, Rotulo } from "./ui";

export default function Problema() {
  return (
    <section className="bg-areia-100 py-24 sm:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* trilho à esquerda */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Rotulo>{problema.olho}</Rotulo>
            </Reveal>
            {/* A frase que fica: escrita para ser lida em voz alta. */}
            <h2 className="display mt-6 text-[clamp(2.4rem,7vw,3.9rem)] text-tinta">
              <LinhasReveal
                linhas={problema.titulo.map((linha, i) => (
                  <span key={linha} className={i > 1 ? "text-mar-600" : undefined}>
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

          {/* lista numerada — fios, não cards */}
          <ul>
            {problema.itens.map((item, i) => (
              <Reveal as="li" key={item.titulo} atraso={i * 80}>
                <div className="group grid grid-cols-[3rem_1fr] gap-x-5 border-b fio py-8 first:border-t first:fio sm:grid-cols-[4.5rem_1fr] sm:gap-x-7">
                  <span className="placar text-[1.7rem] text-areia-400 transition-colors duration-300 group-hover:text-sol-500 sm:text-[2.3rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.1rem] leading-tight font-bold tracking-tight text-tinta sm:text-[1.2rem]">
                      {item.titulo}
                    </h3>
                    <p className="mt-2.5 max-w-[34rem] text-[0.95rem] leading-[1.65] text-tinta/65">
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
