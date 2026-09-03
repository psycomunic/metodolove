import { ctaFinal, marca, oferta } from "@/lib/content";
import { Ondas, Sol } from "./art";
import { Deriva, Horizonte, LinhasReveal } from "./movimento";
import { Botao, Reveal, Rotulo } from "./ui";

export default function CtaFinal() {
  return (
    <section className="grao relative isolate overflow-hidden bg-mar-950 pt-24 pb-0 text-areia-100 sm:pt-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(105%_75%_at_50%_-10%,#0E5180_0%,#062A45_44%,#04192B_100%)]" />
      <Deriva velocidade={70} className="absolute -top-32 left-1/2 z-0 -translate-x-1/2">
        <Sol className="flutua h-96 w-96 opacity-30" />
      </Deriva>
      <Horizonte className="absolute inset-x-0 bottom-0 z-0 h-44 w-full opacity-70 sm:h-60" />

      <div className="relative z-10 mx-auto max-w-[80rem] px-5 pb-44 text-center sm:px-8 sm:pb-52">
        <Reveal>
          <div className="flex justify-center">
            <Rotulo tom="claro">{ctaFinal.olho}</Rotulo>
          </div>
        </Reveal>
        <h2 className="display mx-auto mt-7 max-w-[20ch] text-[clamp(2.5rem,8.5vw,5rem)] text-areia-50">
          <LinhasReveal
            linhas={ctaFinal.titulo.map((linha, i) => (
              <span key={linha} className={i === 2 ? "text-mar-300" : undefined}>
                {linha}
              </span>
            ))}
          />
        </h2>
        <Reveal atraso={130}>
          <p className="mx-auto mt-8 max-w-[36rem] text-[1rem] leading-[1.68] text-areia-200/75">
            {ctaFinal.texto}
          </p>
        </Reveal>
        <Reveal atraso={200}>
          <div className="mt-11 flex flex-col items-center gap-5">
            <Botao href={marca.checkout}>{ctaFinal.cta}</Botao>
            <p className="text-[0.82rem] text-areia-300/75">
              <span className="font-bold text-areia-100">
                {oferta.parcelasQtd} de {oferta.parcelasValor}
              </span>{" "}
              ou {oferta.preco} à vista · {oferta.garantiaDias} dias de garantia
            </p>
          </div>
        </Reveal>
      </div>

      <Ondas cor="#04192B" className="absolute inset-x-0 bottom-0 z-0 h-16 w-full" />
    </section>
  );
}
