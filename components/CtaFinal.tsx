import { ctaFinal, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import RioSkyline from "./rio/RioSkyline";
import { Botao, Manchete } from "./ui";

/**
 * Última chamada.
 *
 * Full bleed, aurora forte e manchete no maior corpo da página inteira. É a
 * última coisa que a pessoa lê, e o botão embaixo dela é o único elemento
 * verde da tela: não há mais nada abaixo competindo com ele.
 *
 * O horizonte volta aqui, agora de NOITE: luzes acesas na orla, cada uma no
 * próprio ritmo, e o reflexo dos morros na água. A página abre com o Rio de
 * fim de tarde e fecha com o Rio à noite, o que dá a ela um começo e um fim
 * no mesmo lugar.
 */
export default function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line px-5 pt-20 pb-40 sm:px-8 sm:pt-32 sm:pb-56 lg:pt-40 lg:pb-64">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute bottom-[-30%] left-1/2 h-[26rem] w-[30rem] -translate-x-1/2 rounded-full opacity-[0.2] sm:h-[44rem] sm:w-[68rem]"
          style={{
            background: "radial-gradient(ellipse, #4FA3FF 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute top-[-20%] right-[-10%] h-[26rem] w-[26rem] rounded-full opacity-[0.22] sm:h-[40rem] sm:w-[40rem]"
          style={{
            background: "radial-gradient(circle, #1E3A8A 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      <RioSkyline noturno className="absolute inset-x-0 bottom-0 -z-10" />

      <div className="mx-auto max-w-[54rem] text-center">
        <Manchete
          linhas={ctaFinal.linhas}
          destaque={ctaFinal.linhaDestaque}
          flui
          className="text-[clamp(1.75rem,8vw,2.5rem)] text-ink sm:text-[clamp(2.5rem,7vw,5rem)]"
        />

        <Reveal atraso={160}>
          <p className="mx-auto mt-7 max-w-[40rem] text-[1rem] leading-[1.66] text-mute sm:mt-9 sm:text-[1.05rem]">
            {ctaFinal.texto}
          </p>
        </Reveal>

        <Reveal atraso={240}>
          <div className="mt-9 flex flex-col items-center gap-5 sm:mt-11">
            <Botao href={marca.checkout} ima cheio>
              {ctaFinal.cta}
            </Botao>
            <p className="mono max-w-[30rem] text-[0.8125rem] leading-[1.7] text-fraco sm:text-[0.62rem]">
              {ctaFinal.microcopy}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
