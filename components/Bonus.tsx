import { bonus } from "@/lib/content";
import { CabecalhoSecao, Reveal } from "./ui";

/**
 * Bônus. A grade de três colunas saiu junto com os três bônus inventados:
 * com um item só, grade vira buraco. Agora é arte à esquerda e texto à
 * direita, e o layout se adapta se outros bônus reais entrarem depois.
 */
export default function Bonus() {
  if (bonus.length === 0) return null;

  return (
    <section className="bg-areia-100 py-20 sm:py-24">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <CabecalhoSecao
          rotulo="Vai junto, sem custo extra"
          titulo={
            <h2 className="display mt-6 text-[clamp(1.56rem,4.68vw,2.5rem)] text-tinta">
              Bônus de entrada
            </h2>
          }
          texto="Entra junto com o curso, sem custo e sem prazo separado. É conteúdo do método, não brinde de campanha."
        />

        {/* Com um bônus só, grade de duas colunas deixa metade da linha
            vazia. O layout acompanha a quantidade. */}
        <div
          className={`fio mt-12 grid gap-x-12 gap-y-10 border-t pt-10 ${
            bonus.length > 1 ? "md:grid-cols-2" : ""
          }`}
        >
          {bonus.map((item, i) => (
            <Reveal key={item.titulo} atraso={i * 70}>
              <article
                className={`grid gap-8 sm:items-center ${
                  bonus.length > 1
                    ? "sm:grid-cols-[13rem_1fr]"
                    : "sm:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16"
                }`}
              >
                {item.imagem ? (
                  <div
                    className={`elevado relative aspect-2/3 w-full overflow-hidden ${
                      bonus.length > 1 ? "max-w-[13rem]" : "max-w-[26rem]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}

                <div>
                  <p className="placar text-[1.4rem] text-areia-400">
                    +{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-3 text-[clamp(1.6rem,3.6vw,2.6rem)] text-tinta">
                    {item.titulo}
                  </h3>
                  <p className="mt-4 max-w-[34rem] text-[1.05rem] leading-[1.65] text-tinta/70">
                    {item.texto}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
