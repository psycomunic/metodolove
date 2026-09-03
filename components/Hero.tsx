import { hero, marca, oferta } from "@/lib/content";
import BolaTroca from "./BolaTroca";
import { Botao, Destaque, Reveal, Rotulo } from "./ui";
import { LinhasReveal } from "./movimento";

/**
 * Hero conduzido pelo banner da marca (public/HERO-DESKTOP.jpg).
 *
 * O banner NÃO é fundo: é peça fechada, com o Charllove à esquerda e o símbolo
 * mais o lettering MÉTODO LLOVE à direita. Nada de texto por cima dele, senão
 * a manchete briga com o próprio nome da marca.
 *
 * O banner ocupa a largura inteira, sem corte, e o CTA fica POR CIMA dele, na
 * área clara logo abaixo do lettering. As posições vêm de medição na arte, não
 * de tentativa: o símbolo ocupa de 47% a 63% da largura, o lettering de 66% a
 * 91%, e os dois vão de 33% a 63% da altura. O creme abaixo disso está limpo
 * de 55% a 95% da largura, que é onde o botão pousa.
 *
 * A sobreposição só existe a partir de lg. No celular o banner tem 195px de
 * altura a 390px de largura, e 27% disso não comporta um botão: lá ele volta
 * para o fluxo, abaixo da manchete.
 */
export default function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden bg-noite-900">
      {/* ---------------- banner em largura total ---------------- */}
      <div className="relative w-full">
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

        {/* CTA sobre o creme. left 51% + width 36% da o centro em 69%, que e o
            eixo do conjunto simbolo+lettering. Medido: nessa faixa de altura o
            creme limpo comeca em 51%, entao a borda esquerda do bloco encosta
            no limite sem invadir o azul. */}
        <div className="absolute top-[68%] left-[51%] hidden w-[36%] md:block">
          <div className="flex flex-col items-center gap-3">
            <Botao
              href={marca.checkout}
              tamanho="md"
              className="lg:px-11 lg:py-5 lg:text-[1rem]"
            >
              {hero.cta}
            </Botao>
            <p className="text-center text-[0.82rem] leading-snug text-noite-900">
              <span className="font-bold">
                {oferta.parcelasQtd} de {oferta.parcelasValor}
              </span>
              <span className="opacity-70">
                {" "}
                · {oferta.garantiaDias} dias de garantia
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- copy ---------------- */}
      <div className="mx-auto w-full max-w-[80rem] px-5 pt-10 pb-10 sm:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-6 lg:gap-8">
          <div className="max-w-[45rem]">
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

            {/* No desktop o botão já está sobre o banner; aqui ele só existe
                abaixo de lg, onde a sobreposição não cabe. */}
            <Reveal atraso={200}>
              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:hidden">
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

          {/* A bola entra a partir de md, não de lg: com o navegador em zoom,
              uma janela de 1507px cai abaixo de 1024 em pixels CSS e a bola
              sumia sem motivo aparente. No celular ela continua fora, porque
              empurraria o botão de compra para fora da primeira dobra e hover
              não existe em toque. */}
          <Reveal atraso={260} className="hidden md:block">
            <BolaTroca className="w-[14rem] lg:w-[21rem] xl:w-[29rem]" />
          </Reveal>
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
