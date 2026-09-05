import { hero, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import { Botao, Foto, LinhaPreco, Manchete, Olho } from "./ui";

/**
 * Hero.
 *
 * Duas montagens diferentes, e não uma só que "responde":
 *
 * · Celular: a foto é uma faixa de 52vh no topo, com a cor real dela, e o
 *   texto vem abaixo, centralizado. Nada de foto atrás do texto: com a foto
 *   sem tratamento (o cliente reprovou o duotone) qualquer texto por cima
 *   dela perde contraste em metade dos aparelhos.
 * · Desktop: a foto ocupa a metade direita e a manchete avança sobre ela.
 *   O escurecimento sobre a foto é PRETO, nunca colorido, e só do lado onde
 *   a palavra passa por cima.
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
          className="absolute top-[-14%] left-[-8%] h-[28rem] w-[28rem] rounded-full opacity-[0.16] sm:h-[46rem] sm:w-[46rem]"
          style={{
            background: "radial-gradient(circle, #4FA3FF 0%, transparent 68%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute top-[6%] right-[-10%] h-[30rem] w-[30rem] rounded-full opacity-[0.22] sm:h-[52rem] sm:w-[52rem]"
          style={{
            background: "radial-gradient(circle, #1E3A8A 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      {/* ---------- foto, celular ----------
          Faixa de 52vh no topo, cor real, fundindo no navy pela base.

          `object-left` nas duas: a arte original é um banner de 2:1 com o
          Charllove à esquerda e o símbolo mais o lettering MÉTODO LLOVE à
          direita. Qualquer recorte que passe de ~46% da largura traz junto a
          faixa creme do lettering, que sobre navy lê como mancha. */}
      <div className="relative h-[52vh] max-h-[26rem] w-full lg:hidden">
        <Foto
          src="/HERO-DESKTOP.jpg"
          alt={`${marca.autor}, criador do ${marca.nome}`}
          arte={hero.fotoArte}
          prioridade
          className="[&_img]:object-left"
        />
      </div>

      {/* ---------- foto, desktop ----------
          Metade direita. object-position 10% foi medido na arte: o Charllove
          ocupa de 12% a 36% da largura do banner original. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[46%] lg:block"
      >
        <div className="relative h-full w-full">
          <Foto
            src="/HERO-DESKTOP.jpg"
            alt=""
            arte={hero.fotoArte}
            prioridade
            desbota={false}
            className="[&_img]:object-[4%_center]"
          />
          {/* Escurecimento NEUTRO, só onde a manchete fura a foto. Preto e não
              navy: véu colorido em cima de foto é justamente o que o cliente
              reprovou. */}
          <div className="absolute inset-0 bg-gradient-to-r from-void via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent" />
        </div>
      </div>

      {/* ---------- conteúdo ---------- */}
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center px-5 pt-10 pb-14 text-center sm:px-8 lg:min-h-[calc(100svh-7rem)] lg:items-start lg:justify-center lg:pt-20 lg:pb-16 lg:text-left">
        <div className="w-full lg:max-w-[54rem]">
          <Reveal>
            <Olho vivo={hero.selo}>{hero.olho}</Olho>
          </Reveal>

          <Manchete
            as="h1"
            linhas={hero.linhas}
            destaque={hero.linhaDestaque}
            flui
            className="mt-6 text-[clamp(2.5rem,11vw,3.5rem)] text-ink sm:mt-7 sm:text-[clamp(3rem,7.4vw,6.5rem)]"
          />

          <Reveal atraso={160}>
            <p className="mx-auto mt-6 max-w-[38rem] text-[1rem] leading-[1.6] text-mute sm:mt-8 sm:text-[1.08rem] lg:mx-0">
              {hero.subtitulo}
            </p>
          </Reveal>

          <Reveal atraso={240}>
            <div className="mt-8 flex flex-col items-center gap-5 sm:mt-10 lg:flex-row lg:items-center lg:gap-6">
              <Botao href={marca.checkout} ima cheio>
                {hero.cta}
              </Botao>
              <a
                href="#metodo"
                className="mono inline-flex items-center gap-2 text-[0.8125rem] text-mute transition-colors duration-200 hover:text-ink sm:text-[0.7rem]"
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
            <LinhaPreco className="mt-5" />
          </Reveal>
        </div>

        {/* ---------- placar ----------
            2x2 no celular, fila única no desktop. */}
        <Reveal atraso={320} className="mt-12 w-full lg:mt-20">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7 sm:flex sm:flex-wrap sm:items-end sm:gap-x-16">
            {hero.stats.map((stat) => (
              <div key={stat.rotulo}>
                <dt className="sr-only">{stat.rotulo}</dt>
                <dd>
                  <span className="placar block text-[clamp(2.25rem,12vw,3rem)] text-ink sm:text-[2.9rem]">
                    {stat.valor}
                  </span>
                  <span className="mono mt-1.5 block text-[0.8125rem] text-mute sm:text-[0.66rem]">
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
