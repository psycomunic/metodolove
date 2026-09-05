import { hero, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import { Botao, Foto, LinhaPreco, Manchete, Olho } from "./ui";

/**
 * Hero.
 *
 * Três camadas, nesta ordem de profundidade: aurora (dois blobs desfocados),
 * foto do Charllove em duotone à direita, e o texto por cima. A manchete
 * avança sobre a foto no desktop, e a foto tem uma máscara de gradiente pela
 * esquerda justamente para receber esse avanço sem comer nenhuma palavra.
 *
 * A altura desconta a barra de urgência e a pílula da nav, que estão no fluxo
 * acima: 100svh cheios empurrariam o CTA para fora da primeira dobra.
 */
export default function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden">
      {/* ---------- aurora ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="absolute top-[-14%] left-[-8%] h-[46rem] w-[46rem] rounded-full opacity-[0.18]"
          style={{
            background: "radial-gradient(circle, #22C55E 0%, transparent 68%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute top-[6%] right-[-16%] h-[52rem] w-[52rem] rounded-full opacity-[0.25]"
          style={{
            background: "radial-gradient(circle, #1E3A8A 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      {/* ---------- foto ----------
          No celular ela é textura de fundo, atrás do texto inteiro. A partir
          de lg vira coluna: metade direita da tela, recortada no Charllove
          (object-position 10%, medido na arte: ele ocupa de 12% a 36% da
          largura do banner original). */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 w-full opacity-[0.22] lg:w-[46%] lg:opacity-100"
      >
        <div className="relative h-full w-full">
          <Foto
            src="/HERO-DESKTOP.jpg"
            alt=""
            arte={hero.fotoArte}
            prioridade
            desbota={false}
            className="[&_img]:object-[10%_center]"
          />
          {/* Máscara pela esquerda e pela base: é o que permite a manchete
              furar a foto sem contorno de recorte aparecendo. */}
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-void/10 lg:via-void/45" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent" />
        </div>
      </div>

      {/* ---------- conteúdo ---------- */}
      <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-[80rem] flex-col justify-center px-5 pt-14 pb-12 sm:px-8 sm:pt-20 lg:pb-16">
        <div className="max-w-[46rem] lg:max-w-[54rem]">
          <Reveal>
            <Olho vivo={hero.selo}>{hero.olho}</Olho>
          </Reveal>

          <Manchete
            as="h1"
            linhas={hero.linhas}
            destaque={hero.linhaDestaque}
            className="mt-7 text-[clamp(3rem,7.4vw,6.5rem)] text-ink"
          />

          <Reveal atraso={160}>
            <p className="leitura mt-8 text-[1rem] text-mute sm:text-[1.08rem]">
              {hero.subtitulo}
            </p>
          </Reveal>

          <Reveal atraso={240}>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              <Botao href={marca.checkout} ima className="w-full sm:w-auto">
                {hero.cta}
              </Botao>
              <a
                href="#metodo"
                className="mono inline-flex items-center gap-2 text-mute transition-colors duration-200 hover:text-ink"
              >
                {hero.ctaSecundario}
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </a>
            </div>
            <LinhaPreco className="mt-5 text-[0.66rem]" />
          </Reveal>
        </div>

        {/* ---------- placar ---------- */}
        <Reveal atraso={320} className="mt-14 lg:mt-20">
          <dl className="flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-line pt-7 sm:gap-x-16">
            {hero.stats.map((stat) => (
              <div key={stat.rotulo}>
                <dt className="sr-only">{stat.rotulo}</dt>
                <dd>
                  <span className="placar block text-[2.5rem] text-ink sm:text-[2.9rem]">
                    {stat.valor}
                  </span>
                  <span className="mono mt-1.5 block text-[0.66rem] text-mute">
                    {stat.rotulo}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
