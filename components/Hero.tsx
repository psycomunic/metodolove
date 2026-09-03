import { hero, marca, oferta } from "@/lib/content";
import { Botao, Destaque, Reveal, Rotulo } from "./ui";
import { LinhasReveal } from "./movimento";

/**
 * Hero conduzido pelo banner da marca (public/HERO-DESKTOP.jpg).
 *
 * O banner NÃO é fundo: é peça fechada, com o Charllove à esquerda e o símbolo
 * mais o lettering MÉTODO LLOVE à direita. Nada de texto por cima dele, senão
 * a manchete briga com o próprio nome da marca.
 *
 * Por que duas colunas no desktop, e não o banner em largura cheia no topo:
 * medido, o lettering ocupa de 33% a 62% da altura do banner, então cortar
 * abaixo de 62% decapita o nome. Em largura cheia num monitor de 1440 isso
 * exige 476px só de banner, e banner mais copy passam de 900px. Numa janela
 * baixa e larga (1507x741, a do cliente) nem chega perto. Em coluna o banner
 * fica com metade da largura, aparece INTEIRO e sobra dobra para o botão.
 *
 * No celular volta a empilhar: a 390px o banner tem 195px de altura e cabe
 * completo, sem corte nenhum.
 */
export default function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden bg-noite-900">
      <div className="mx-auto w-full max-w-[80rem] px-5 pt-24 pb-10 sm:px-8 lg:pt-28">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
          {/* ---------------- banner, inteiro e sem corte ---------------- */}
          <div className="elevado order-first w-full overflow-hidden lg:order-last">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/HERO-DESKTOP.jpg"
              alt={`${marca.nome}, curso de ${marca.autor}`}
              width={1536}
              height={768}
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full"
            />
          </div>

          {/* ---------------- copy ---------------- */}
          <div className="order-last lg:order-first">
            <Reveal>
              <Rotulo tom="claro">{hero.olho}</Rotulo>
            </Reveal>

            <h1 className="display mt-4 text-[clamp(2rem,5.2vw,3.4rem)] text-white max-[380px]:text-[1.85rem]">
              <LinhasReveal
                linhas={[
                  hero.linha1,
                  hero.linha2,
                  <Destaque key="destaque" cor="creme">
                    {hero.linha3Destaque}
                  </Destaque>,
                ]}
              />
            </h1>

            <Reveal atraso={120}>
              <p className="mt-6 max-w-[34rem] text-[0.95rem] leading-[1.6] text-bruma-200 sm:text-[1.02rem]">
                {hero.subtitulo}
              </p>
            </Reveal>

            <Reveal atraso={200}>
              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Botao href={marca.checkout} className="w-full sm:w-auto">
                  {hero.cta}
                </Botao>
                <p className="text-[0.8rem] leading-snug text-bruma-200">
                  <span className="font-bold text-white">
                    {oferta.parcelasQtd} de {oferta.parcelasValor}
                  </span>
                  <br />
                  {oferta.garantiaDias} dias de garantia
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------------- fecho ---------------- */}
      <div className="relative border-t border-white/12">
        <div className="mx-auto flex max-w-[80rem] flex-wrap items-center gap-x-8 gap-y-2 px-5 py-5 text-[0.76rem] font-semibold tracking-wide text-bruma-200 sm:px-8">
          <span>Acesso imediato</span>
          <span className="h-3 w-px bg-white/25" />
          <span>{oferta.acesso}</span>
          <span className="h-3 w-px bg-white/25" />
          <span>Cartão, Pix ou boleto</span>
          <span className="h-3 w-px bg-white/25" />
          <span>{oferta.garantiaDias} dias de garantia</span>
        </div>
      </div>

      <div className="relative h-12 w-full overflow-hidden sm:h-20" aria-hidden="true">
        <div className="absolute inset-x-[-14%] top-0 h-[30rem] rounded-[50%] bg-areia-100" />
      </div>
    </section>
  );
}
