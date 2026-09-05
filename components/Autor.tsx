"use client";

import { autor, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import CalcadaoWaves from "./rio/CalcadaoWaves";
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
      className="claro relative isolate overflow-hidden bg-creme px-5 py-16 pb-28 sm:px-8 sm:py-28 sm:pb-36 lg:py-32 lg:pb-40"
    >
      {/* Calçadão navy fechando a seção, na largura toda: é a emenda para a
          faixa escura que vem depois. */}
      <CalcadaoWaves
        className="absolute inset-x-0 bottom-0 text-navy"
        opacidade={0.85}
        altura={64}
      />

      {/* O Cristo fica na borda direita da seção, fora da coluna de texto, que
          por sua vez tem largura máxima para nunca alcançá-lo. Desenho em cima
          de linha de texto foi exatamente o que o cliente reprovou. */}
      <div
        ref={coleta(0)}
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-[-2%] -z-10 hidden overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(60,40,20,0.45)] lg:block lg:h-[31rem] lg:w-[20rem]"
      >
        <Image
          src="/basecristo.webp"
          alt=""
          fill
          sizes="320px"
          className="object-cover object-[78%_center]"
        />
      </div>
      <div className="mx-auto grid max-w-[80rem] gap-9 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <div className="mx-auto aspect-[3/4] w-full max-w-[22rem] overflow-hidden rounded-2xl border-[6px] border-[#FFFDF8] shadow-[0_18px_50px_rgba(201,111,74,0.18)] lg:max-w-none">
            <Foto
              src={autor.foto}
              alt={`${autor.nome}, criador do ${marca.nome}`}
              arte={autor.fotoArte}
              desbota={false}
            />
          </div>
          <p className="mono mt-4 text-center text-[0.8125rem] text-tinta-suave sm:mt-5 sm:text-left sm:text-[0.7rem]">
            {marca.instagramHandle}
          </p>
        </Reveal>

        <div className="text-center sm:text-left lg:max-w-[31rem]">
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
            {/* Citação em navy, para ler; aspas em dourado, para respirar.
                A cor quente fica só no sinal, nunca na frase. */}
            <blockquote className="mt-9 border-l-2 border-dourado pl-5 text-left sm:mt-10 sm:pl-6">
              <p className="display text-[clamp(1.25rem,5.5vw,1.9rem)] text-tinta">
                <span className="text-dourado">“</span>
                {autor.citacao}
                <span className="text-dourado">”</span>
              </p>
              <cite className="mono mt-4 block text-[0.8125rem] text-tinta-suave not-italic sm:text-[0.66rem]">
                {autor.nome}
              </cite>
            </blockquote>
          </Reveal>

          <Reveal atraso={120}>
            <ul className="mono mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-line pt-6 text-[0.8125rem] text-tinta-suave sm:mt-10 sm:justify-start sm:text-[0.62rem]">
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
          <div
            aria-hidden="true"
            className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_-16px_rgba(60,40,20,0.4)] lg:hidden"
          >
            <Image
              src="/basecristo.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
