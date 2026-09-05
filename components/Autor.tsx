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
      {/* Marca d'água: o Cristo grande, ao fundo, com pouca opacidade, alinhado
          ao topo do texto e ancorado à direita. Some pela esquerda antes de
          chegar na coluna de texto e fecha em curva na base. */}
      <div
        ref={coleta(0)}
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-0 bottom-0 -z-10 hidden w-[32%] opacity-50 sm:top-28 lg:top-20 lg:block xl:w-[33%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 12%, #000 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 12%, #000 30%, #000 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 12%, #000 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 12%, #000 30%, #000 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <Image
          src="/crisnovo.webp"
          alt=""
          fill
          sizes="33vw"
          unoptimized
          className="object-cover"
          style={{
            /* A estátua ocupa só o terço esquerdo da foto (o resto é o morro).
               Com cover e o foco em 34% da largura, ela preenche a faixa
               inteira, em altura, com os braços dentro do quadro. */
            objectPosition: "34% 0%",
            filter:
              "grayscale(1) sepia(1) hue-rotate(178deg) saturate(2) brightness(0.9)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-[80rem] gap-9 sm:gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-16">
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

        <div className="text-center sm:text-left lg:max-w-[26rem]">
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

        {/* Celular: marca d'água menor, abaixo do texto. */}
        <div
          aria-hidden="true"
          className="relative mx-auto mt-4 -mb-6 aspect-[4/3] w-full max-w-[22rem] opacity-40 lg:hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, #000 30%, #000 100%)",
            maskImage: "linear-gradient(to top, transparent 0%, #000 30%, #000 100%)",
          }}
        >
          <Image
            src="/crisnovo.webp"
            alt=""
            fill
            sizes="22rem"
            unoptimized
            className="object-contain object-bottom"
            style={{
              filter:
                "grayscale(1) sepia(1) hue-rotate(178deg) saturate(2) brightness(0.9)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
