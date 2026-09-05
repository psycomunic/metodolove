import { ctaFinal, marca, oferta } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Botao, Destaque, Reveal, Rotulo } from "./ui";

/**
 * Último empurrão antes do rodapé.
 *
 * Os arcos concêntricos que viviam aqui foram removidos em set/2026. Eles
 * vinham das artes FUNDO-HERO-*, que o banner da marca substituiu, e a marca
 * de verdade — logo e banner — não tem arco nenhum: tem o coração, fios
 * dourados e trama de hexágonos. Eram órfãos de uma direção morta, como o
 * verde que saiu antes. Pior: viravam alvo de dardos atrás da manchete, e o
 * texto ficava ilegível em cima dos anéis.
 *
 * No lugar deles, nada. Esta é a última coisa que a pessoa lê antes de
 * decidir, e aqui a pergunta do Charllove tem de ser a única coisa na tela.
 * O fundo é só profundidade: um clarão suave no alto, que levanta o centro
 * sem competir com letra nenhuma.
 */
export default function CtaFinal() {
  return (
    <section className="grao relative isolate overflow-hidden bg-noite-950 pt-14 pb-16 text-areia-100 sm:pt-20 sm:pb-24">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(80%_60%_at_50%_0%,#10365c_0%,#0a2340_45%,#050f1f_100%)]" />

      {/* Fio dourado: o único ornamento, e vem do banner da marca, onde os
          fios finos separam os blocos. Um traço, centrado, acima do rótulo. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 mx-auto h-px w-[min(28rem,60%)] bg-[linear-gradient(to_right,transparent,#c0a268,transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-[80rem] px-5 text-center sm:px-8">
        <Reveal>
          <div className="flex justify-center">
            <Rotulo tom="claro">{ctaFinal.olho}</Rotulo>
          </div>
        </Reveal>

        <h2 className="display mx-auto mt-7 max-w-[48rem] text-[clamp(1.8rem,5.4vw,3.35rem)] text-areia-50">
          <LinhasReveal
            linhas={ctaFinal.titulo.map((linha, i) =>
              // A última linha fecha em bloco chapado: é o eco do hero e o
              // último empurrão antes do botão.
              i === 2 ? (
                <Destaque key={linha} cor="sol">
                  {linha}
                </Destaque>
              ) : (
                <span key={linha}>{linha}</span>
              ),
            )}
          />
        </h2>

        <Reveal atraso={130}>
          <p className="mx-auto mt-8 max-w-[34rem] text-[1rem] leading-[1.68] text-bruma-200">
            {ctaFinal.texto}
          </p>
        </Reveal>

        <Reveal atraso={200}>
          <div className="mt-11 flex flex-col items-center gap-5">
            <Botao href={marca.checkout}>{ctaFinal.cta}</Botao>
            <p className="text-[0.84rem] text-bruma-300">
              <span className="font-bold text-white">
                {oferta.parcelasQtd} de {oferta.parcelasValor}
              </span>{" "}
              ou {oferta.preco} à vista · {oferta.garantiaDias} dias de garantia
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
