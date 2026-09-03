import { bonus, marca, oferta } from "@/lib/content";
import { Reveal, Rotulo } from "./ui";

/**
 * Bônus.
 *
 * Vira faixa MARINHO no meio da página, e não é decisão de gosto: Método,
 * Público e Bônus vinham em creme, três seções seguidas do mesmo tom, e o
 * bônus sumia no meio delas. Sobre marinho ele lê como coisa à parte, que é
 * exatamente o que ele é.
 *
 * A arte é um mockup 3D em PNG com transparência e sombra própria. Por isso
 * ela flutua sem moldura, sem recorte e sem proporção forçada: enquadrá-la
 * cortaria a caixa e mataria o brilho que já vem embutido no arquivo.
 */
export default function Bonus() {
  if (bonus.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-noite-900 py-14 text-areia-50 sm:py-20">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(75%_60%_at_25%_0%,#10365c_0%,#0a2340_50%,#082038_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 mx-auto h-px w-[min(28rem,60%)] bg-[linear-gradient(to_right,transparent,#c0a268,transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-[80rem] px-5 sm:px-8">
        {bonus.map((item, i) => (
          <div
            key={item.titulo}
            className={`grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 ${
              i > 0 ? "mt-20 border-t border-white/10 pt-20" : ""
            }`}
          >
            {item.imagem ? (
              <Reveal className="order-first">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imagem}
                  alt={`Módulo bônus ${item.titulo}`}
                  width={1200}
                  height={923}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full max-w-[34rem] lg:max-w-none"
                />
              </Reveal>
            ) : null}

            <div>
              <Reveal>
                <Rotulo tom="claro">Vai junto, sem custo extra</Rotulo>
              </Reveal>

              <Reveal atraso={80}>
                <p className="placar mt-6 text-[1.1rem] text-sol-400">
                  +{String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="display mt-2 text-[clamp(2.1rem,5.6vw,3.4rem)] text-areia-50">
                  {item.titulo}
                </h2>
              </Reveal>

              <Reveal atraso={140}>
                <p className="mt-5 max-w-[34rem] text-[1.04rem] leading-[1.68] text-bruma-200">
                  {item.texto}
                </p>
              </Reveal>

              <Reveal atraso={200}>
                <p className="caixa rotulo mt-8 border-areia-300 text-areia-200">
                  Incluso no {marca.nome}
                </p>
                <p className="mt-4 text-[0.84rem] text-bruma-300">
                  Entra com o curso, no mesmo acesso e sem prazo separado.
                  {oferta.vagas ? ` ${oferta.vagas}` : ""}
                </p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
