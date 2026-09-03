import { ctaFinal, marca, oferta } from "@/lib/content";
import { Arcos, Ondas } from "./art";
import { Deriva, LinhasReveal } from "./movimento";
import { Botao, Destaque, Reveal, Rotulo } from "./ui";

export default function CtaFinal() {
  return (
    <section className="grao relative isolate overflow-hidden bg-noite-950 pt-24 pb-0 text-areia-100 sm:pt-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(105%_75%_at_50%_-10%,#16308F_0%,#0B1A5E_44%,#060E3A_100%)]" />
      {/* Arcos irradiando do alto, centrados na manchete: a página inteira
          converge para este bloco, e a forma repete essa convergência. */}
      <Deriva velocidade={70} className="absolute -top-40 left-1/2 z-0 -translate-x-1/2">
        <Arcos
          className="pulsa h-[44rem] w-[44rem]"
          cores={["#FC6000", "#FF7F2E", "#003D93"]}
          quantidade={7}
          raioInicial={15}
          passo={13}
          espessura={7}
          origem="50% 44%"
          opacidade={0.26}
        />
      </Deriva>
      {/* >>> SLOT DE IMAGEM: a silhueta do Rio saiu daqui em set/2026.
          O cliente vai fornecer uma arte para esta borda. Enquanto não
          existir, a seção fecha no gradiente — sem buraco e sem erro. */}

      <div className="relative z-10 mx-auto max-w-[80rem] px-5 pb-44 text-center sm:px-8 sm:pb-52">
        <Reveal>
          <div className="flex justify-center">
            <Rotulo tom="claro">{ctaFinal.olho}</Rotulo>
          </div>
        </Reveal>
        <h2 className="display mx-auto mt-7 max-w-[20ch] text-[clamp(1.95rem,6.63vw,3.90rem)] text-areia-50">
          <LinhasReveal
            linhas={ctaFinal.titulo.map((linha, i) =>
              // A última linha fecha em bloco chapado — é o eco do hero e o
              // último empurrão antes do botão.
              i === 2 ? (
                <Destaque key={linha} cor="sol" inclina={-1.1}>
                  {linha}
                </Destaque>
              ) : (
                <span key={linha}>{linha}</span>
              ),
            )}
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

      <Ondas cor="#060E3A" className="absolute inset-x-0 bottom-0 z-0 h-16 w-full" />
    </section>
  );
}
