import { depoimentos } from "@/lib/content";
import { Foto, Reveal, Rotulo } from "./ui";

/**
 * Só renderiza quando existirem depoimentos REAIS em lib/content.ts.
 * Nada é inventado aqui — ver o aviso naquele arquivo.
 */
export default function Depoimentos() {
  if (depoimentos.length === 0) return null;

  return (
    <section className="bg-areia-100 py-24 sm:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Reveal>
          <Rotulo>Quem já está dentro</Rotulo>
        </Reveal>
        <Reveal atraso={70}>
          <h2 className="display mt-6 max-w-[30rem] text-[clamp(2.2rem,6.5vw,3.6rem)] text-tinta">
            Não é promessa.
            <span className="block text-mar-600">É quadra.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 border-t fio pt-10 md:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <Reveal key={d.nome + i} atraso={i * 60}>
              <figure className={i > 0 ? "lg:border-l lg:fio lg:pl-10" : ""}>
                <blockquote className="text-[1rem] leading-[1.62] text-tinta/85">
                  “{d.texto}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t fio pt-5">
                  {d.foto ? (
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                      <Foto src={d.foto} alt={d.nome} />
                    </div>
                  ) : null}
                  <div>
                    <p className="text-[0.86rem] font-bold text-tinta">{d.nome}</p>
                    <p className="text-[0.74rem] text-tinta/55">
                      {d.local} · {d.tempo}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
