"use client";

import { autor, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import Image from "next/image";
import { useParallax } from "./rio/parallax";
import { Foto, Manchete, Olho } from "./ui";

/**
 * Quem ensina.
 *
 * A foto é a colagem do percurso dele, na COR REAL: nada de duotone, véu ou
 * filtro. O Charllove precisa parecer uma pessoa numa quadra, não um recorte
 * de identidade visual.
 *
 * A citação é a tese do produto em uma linha e por isso vem em display, não
 * em itálico de blockquote.
 *
 * O RIO. O Cristo fica atrás do texto, à direita, a 15%, e desce devagar
 * enquanto a seção passa. Ele é grande de propósito: aqui a página fala de
 * quem é o professor e de onde ele vem, e é a única seção em que um símbolo
 * da cidade pode ocupar área. O calçadão corre por baixo de tudo, a 5%.
 */
export default function Autor() {
  const { raiz, coleta } = useParallax([44]);

  return (
    <section
      id="charllove"
      ref={raiz}
      className="relative isolate overflow-hidden border-t border-fio-areia px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[84rem] gap-9 sm:gap-12 lg:grid-cols-[0.8fr_1fr_1fr] lg:items-start lg:gap-8">
        <Reveal className="lg:sticky lg:top-28">
          <div className="mx-auto aspect-[3/4] w-full max-w-[22rem] overflow-hidden rounded-2xl border border-line lg:max-w-none">
            <Foto
              src={autor.foto}
              alt={`${autor.nome}, criador do ${marca.nome}`}
              arte={autor.fotoArte}
              desbota={false}
            />
          </div>
          <p className="mono mt-4 text-center text-[0.8125rem] text-mute sm:mt-5 sm:text-left sm:text-[0.7rem]">
            {marca.instagramHandle}
          </p>
        </Reveal>

        <div className="text-center sm:text-left lg:max-w-[30rem]">
          <Reveal>
            <Olho>{autor.olho}</Olho>
          </Reveal>

          <Manchete
            linhas={autor.linhas}
            destaque={autor.linhaDestaque}
            umaLinha
            className="mt-5 text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />

          <div className="mt-7 space-y-5 text-left sm:mt-8">
            {autor.paragrafos.map((p, i) => (
              <Reveal key={i} atraso={i * 60} as="p">
                <span className="block max-w-[40rem] text-[1rem] leading-[1.66] text-mute">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal atraso={80}>
            {/* A citação é a tese do produto em uma linha. Em areia, não em
                branco: é a única fala do Charllove na página e merece um tom
                próprio, sem virar mais um parágrafo. */}
            <blockquote className="mt-9 border-l-2 border-areia/50 pl-5 text-left sm:mt-10 sm:pl-6">
              <p className="display text-[clamp(1.25rem,5.5vw,1.9rem)] text-areia">
                “{autor.citacao}”
              </p>
              <cite className="mono mt-4 block text-[0.8125rem] text-areia/55 not-italic sm:text-[0.66rem]">
                {autor.nome}
              </cite>
            </blockquote>
          </Reveal>

          <Reveal atraso={120}>
            <ul className="mono mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-line pt-6 text-[0.8125rem] text-areia/65 sm:mt-10 sm:justify-start sm:text-[0.62rem]">
              {autor.credenciais.map((c, i) => (
                <li key={c} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden="true">·</span> : null}
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Celular: o Cristo entra DEPOIS do texto, centralizado, como
              fechamento da seção. Atrás dos parágrafos ele só atrapalharia a
              leitura numa coluna de 350px. */}
        </div>

        {/* O Cristo à DIREITA do texto, na própria coluna dele — nunca atrás.
            Foto recortada do Corcovado, tingida de azul com filter (que
            respeita a transparência), sumindo em degradê na base para o navy. */}
        {/* O Cristo grande à DIREITA do texto: gruda no topo enquanto a bio
            rola (sticky), é mais largo que a própria coluna e sangra para a
            borda direita (a seção tem overflow-hidden). Degradê na base. */}
        <div className="relative mx-auto mt-6 w-full max-w-[24rem] lg:sticky lg:top-24 lg:mt-0 lg:max-w-none lg:self-start">
          <div
            ref={coleta(0)}
            aria-hidden="true"
            className="relative aspect-[4/3] w-full lg:-ml-[22%] lg:w-[175%] xl:-ml-[20%] xl:w-[165%]"
            style={{
              /* Dois degradês compostos: um some pela ESQUERDA (onde o texto
                 está), outro fecha a BASE em curva suave, para a foto não
                 terminar numa linha reta. */
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 16%, #000 36%, #000 100%), radial-gradient(115% 95% at 55% 15%, #000 48%, rgba(0,0,0,0.5) 72%, transparent 93%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 16%, #000 36%, #000 100%), radial-gradient(115% 95% at 55% 15%, #000 48%, rgba(0,0,0,0.5) 72%, transparent 93%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          >
            <Image
              src="/crisnovo.webp"
              alt="Cristo Redentor no Corcovado, Rio de Janeiro"
              fill
              sizes="(min-width: 1024px) 75vw, 24rem"
              unoptimized
              className="object-contain object-left-top"
              style={{
                filter:
                  "grayscale(1) sepia(1) hue-rotate(178deg) saturate(2.2) brightness(0.95)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
