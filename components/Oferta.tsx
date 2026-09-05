import { investimento, marca, oferta } from "@/lib/content";
import { Reveal } from "./movimento";
import { Botao, Check, Escudo, Olho } from "./ui";

/**
 * Investimento.
 *
 * Coluna única e estreita: no bloco de conversão nada pode disputar o olho
 * com o preço e o botão. O preço fica COLADO no botão, sem parágrafo entre os
 * dois, porque a distância entre ler o valor e poder agir é a fricção mais
 * cara da página.
 *
 * A garantia vem depois do botão, não antes: ela é o que derruba a última
 * objeção de quem já leu o preço, e antes do botão só adiaria a decisão.
 */
export default function Oferta() {
  return (
    <section
      id="oferta"
      className="relative isolate overflow-hidden border-t border-line px-5 py-20 sm:px-8 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 opacity-[0.16]"
        style={{
          background: "radial-gradient(circle, #22C55E 0%, transparent 68%)",
          filter: "blur(140px)",
        }}
      />

      <div className="mx-auto max-w-[42rem]">
        <Reveal className="text-center">
          <Olho className="justify-center">{investimento.olho}</Olho>
          <h2 className="display mt-5 text-[clamp(2.5rem,7vw,4.5rem)] text-ink">
            {investimento.titulo}
          </h2>
        </Reveal>

        <Reveal
          atraso={100}
          className="card mt-10 border-verde/45 p-7 shadow-[0_0_80px_-30px_rgba(34,197,94,0.55)] sm:p-10"
        >
          <ul className="space-y-4">
            {investimento.inclusos.map((item) => (
              <li key={item} className="flex gap-4">
                <Check className="mt-0.5 h-5 w-5 text-verde" />
                <span className="text-[0.97rem] leading-[1.6] text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-line pt-8 text-center">
            <p className="mono text-[0.7rem] text-fraco line-through">
              de {oferta.precoCheio}
            </p>
            <p className="placar mt-3 text-[clamp(3rem,10vw,4.5rem)] text-ink">
              {oferta.parcelasQtd} de {oferta.parcelasValor}
            </p>
            <p className="mt-2 text-[0.95rem] text-mute">ou {oferta.preco} à vista</p>

            <Botao href={marca.checkout} ima className="mt-8 w-full" id="cta-oferta">
              {investimento.cta}
            </Botao>

            <p className="mono mt-4 text-[0.62rem] text-fraco">
              {investimento.microcopy}
            </p>
          </div>

          <p className="mt-8 border-t border-line pt-7 text-center text-[0.92rem] leading-[1.6] text-mute">
            {investimento.ancora}
          </p>
        </Reveal>

        <Reveal atraso={140} className="card mt-4 p-7 sm:p-9">
          <div className="flex gap-5">
            <Escudo className="mt-0.5 h-8 w-8 shrink-0 text-verde" />
            <div>
              <h3 className="display text-[1.4rem] text-ink sm:text-[1.6rem]">
                {investimento.garantia.titulo}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.62] text-mute">
                {investimento.garantia.texto}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
