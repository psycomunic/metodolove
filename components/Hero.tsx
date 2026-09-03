"use client";

import { useState } from "react";
import { hero, marca, oferta, provas } from "@/lib/content";
import { Areia, Sol } from "./art";
import HeroReveal from "./HeroReveal";
import { Contador, Deriva, Desmascara, Horizonte, LinhasReveal } from "./movimento";
import { Botao, Check, Foto, Rabisco, Rotulo } from "./ui";

/**
 * Hero conduzido por imagem, com sobreposição.
 * A manchete invade o painel da foto — a tensão é o ponto, não o alinhamento.
 * O horizonte do Rio corre em três camadas conforme a página desce.
 */
export default function Hero() {
  // Com os vídeos no ar, eles viram a mídia principal e o painel de foto sai
  // de cena — ficariam disputando a mesma metade da tela.
  const [comVideo, setComVideo] = useState(false);

  return (
    <section
      id="topo"
      className="grao relative isolate overflow-hidden bg-mar-900 text-areia-100"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(115%_78%_at_72%_-6%,#0E5180_0%,#062A45_48%,#04192B_100%)]" />

      {/* Vídeos das bolas com holofote de revelação no cursor. */}
      <HeroReveal aoCarregar={setComVideo} />

      {/* O sol se põe atrás do painel de foto — a sobreposição é o que dá profundidade. */}
      <Deriva velocidade={90} className="absolute -top-32 right-[4%] z-0 sm:-top-16 sm:right-[10%]">
        <Sol className="flutua h-56 w-56 opacity-90 sm:h-80 sm:w-80" />
      </Deriva>

      <Areia className="absolute inset-0 z-0 h-full w-full fill-areia-200/10" />

      <Horizonte
        forca={1.2}
        className="absolute inset-x-0 bottom-[5.5rem] z-0 h-44 w-full sm:h-64 lg:bottom-[6rem] lg:h-80"
      />

      {/* --------- painel de foto: sangra na borda direita --------- */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-[42%] ${
          comVideo ? "hidden" : "hidden lg:block"
        }`}
      >
        <Desmascara atraso={320} className="elevado absolute top-36 right-0 bottom-16 left-10">
          <div className="relative h-full w-full overflow-hidden">
            <Foto
              src="/images/hero.jpg"
              alt="Charllove jogando futevôlei em quadra de areia"
              arte={hero.fotoArte}
            />
            {/* o azul do campo invade a foto pela esquerda, para a manchete respirar */}
            <div className="absolute inset-0 bg-[linear-gradient(100deg,#04192B_2%,rgba(4,25,43,0.86)_26%,rgba(4,25,43,0.12)_66%,transparent_100%)]" />
          </div>
        </Desmascara>
        <div className="absolute top-1/2 right-0 left-0 h-px bg-sol-500/45" />
      </div>

      <div className="relative z-20 mx-auto max-w-[80rem] px-5 pt-28 sm:px-8 lg:pt-36">
        <div className="max-w-[46rem]">
          <Rotulo tom="claro">{hero.olho}</Rotulo>

          <h1 className="display mt-7 text-[clamp(3rem,11.5vw,6.4rem)] text-areia-50">
            <LinhasReveal
              linhas={[
                hero.linha1,
                hero.linha2,
                <>
                  <Rabisco>{hero.linha3Rabisco}</Rabisco>.
                </>,
              ]}
            />
          </h1>

          {/* foto no celular: entra depois da manchete, ainda dominante */}
          <Desmascara
            className={`elevado relative mt-9 aspect-4/3 w-full overflow-hidden ${
              comVideo ? "hidden" : "lg:hidden"
            }`}
          >
            <Foto
              src="/images/hero.jpg"
              alt="Charllove jogando futevôlei em quadra de areia"
              arte={hero.fotoArte}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,25,43,0.7),transparent_58%)]" />
          </Desmascara>

          <p className="mt-9 max-w-[33rem] text-[1.02rem] leading-[1.62] text-areia-200/85 sm:text-[1.08rem]">
            {hero.subtitulo}
          </p>
          <p className="mt-4 max-w-[33rem] border-l border-sol-500 pl-4 text-[0.95rem] leading-[1.55] font-medium text-areia-100">
            {hero.assinaturaSub}
            <span className="mt-1 block text-[0.78rem] font-normal text-mar-300">
              {marca.autor}, {marca.instagramHandle}
            </span>
          </p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Botao href={marca.checkout} className="w-full sm:w-auto">
              {hero.cta}
            </Botao>
            <p className="text-[0.82rem] leading-snug text-areia-300/85">
              <span className="font-bold text-areia-100">
                {oferta.parcelasQtd} de {oferta.parcelasValor}
              </span>
              <br />
              Acesso imediato · {oferta.garantiaDias} dias de garantia
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 pb-14">
            {hero.notas.map((nota) => (
              <li
                key={nota}
                className="flex items-center gap-2 text-[0.78rem] font-semibold text-areia-200/70"
              >
                <Check className="h-4 w-4 text-sol-400" />
                {nota}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --------- placar fixado na base do hero --------- */}
      <div className="relative z-20 border-t border-mar-700/60 bg-mar-950/70 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-[80rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {provas.map((item, i) => (
            <div
              key={item.rotulo}
              className={`py-6 lg:px-7 ${i % 2 === 1 ? "border-l border-mar-700/50 pl-6 lg:pl-7" : ""} ${
                i > 1 ? "border-t border-mar-700/50 lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:border-mar-700/50" : ""}`}
            >
              <dt className="placar text-[clamp(2rem,5vw,2.9rem)] text-areia-50">
                <Contador valor={item.valor} decimais={item.decimais} pad={item.pad} />
                {item.sufixo ? (
                  <span className="ml-1 text-[0.42em] text-sol-400">{item.sufixo}</span>
                ) : null}
              </dt>
              <dd className="mt-2 max-w-[13rem] text-[0.74rem] leading-snug text-areia-300/65">
                {item.rotulo}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
