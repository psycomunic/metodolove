import { ctaFinal, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import { Botao, Manchete } from "./ui";

/**
 * Última chamada.
 *
 * Full bleed, aurora verde forte e manchete no maior corpo da página inteira.
 * É a única seção onde o verde ocupa área, e ele só pode ocupar aqui porque
 * não há mais nada abaixo competindo com o botão.
 */
export default function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute bottom-[-30%] left-1/2 h-[44rem] w-[68rem] -translate-x-1/2 rounded-full opacity-[0.22]"
          style={{
            background: "radial-gradient(ellipse, #22C55E 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute top-[-20%] right-[-10%] h-[40rem] w-[40rem] rounded-full opacity-[0.22]"
          style={{
            background: "radial-gradient(circle, #1E3A8A 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[54rem] text-center">
        <Manchete
          linhas={ctaFinal.linhas}
          destaque={ctaFinal.linhaDestaque}
          className="text-[clamp(2.5rem,7vw,5rem)] text-ink"
        />

        <Reveal atraso={160}>
          <p className="mx-auto mt-9 max-w-[40rem] text-[1rem] leading-[1.66] text-mute sm:text-[1.05rem]">
            {ctaFinal.texto}
          </p>
        </Reveal>

        <Reveal atraso={240}>
          <div className="mt-11 flex flex-col items-center gap-5">
            <Botao href={marca.checkout} ima className="w-full sm:w-auto">
              {ctaFinal.cta}
            </Botao>
            <p className="mono text-[0.62rem] text-fraco">{ctaFinal.microcopy}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
