import { inclusos, marca, oferta } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Botao, Check, Reveal, Rotulo } from "./ui";

export default function Oferta() {
  return (
    <section
      id="oferta"
      className="grao relative isolate overflow-hidden bg-noite-900 pt-24 pb-28 text-areia-100 sm:pt-32"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(110%_72%_at_18%_-4%,#16308F_0%,#0B1A5E_46%,#060E3A_100%)]" />
      {/* >>> SLOT DE IMAGEM: a silhueta do Rio saiu daqui em set/2026. */}

      <div className="relative z-10 mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="max-w-[34rem]">
          <Reveal>
            <Rotulo tom="claro">O investimento</Rotulo>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(1.79rem,5.46vw,2.96rem)] text-areia-50">
            <LinhasReveal
              linhas={[
                "Menos que um par",
                <span key="chuteiras" className="text-bruma-300">
                  de chuteiras de areia.
                </span>,
              ]}
            />
          </h2>
          <Reveal atraso={130}>
            <p className="mt-6 text-[1rem] leading-[1.68] text-areia-200/75">
              Pagamento único. Sem mensalidade, sem taxa escondida, sem renovação
              automática.
            </p>
          </Reveal>
        </div>

        {/* bloco da oferta — aqui o card é justificado: é o container da conversão */}
        <Reveal atraso={160} className="mt-14">
          <div className="elevado mx-auto grid max-w-[64rem] overflow-hidden bg-areia-50 text-tinta lg:grid-cols-[1.02fr_0.98fr]">
            <div className="fio border-b p-8 sm:p-11 lg:border-r lg:border-b-0">
              <p className="rotulo text-noite-600">Você leva</p>
              <h3 className="display mt-4 text-[2.1rem] text-tinta">
                {marca.nome} completo
              </h3>
              <ul className="mt-8 space-y-3.5">
                {inclusos.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3.5 text-[0.93rem] leading-snug text-tinta/80"
                  >
                    <Check className="mt-0.5 h-4.5 w-4.5 text-noite-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center bg-areia-200 p-8 sm:p-11">
              {oferta.vagas ? (
                <p className="rotulo mb-6 text-sol-600">{oferta.vagas}</p>
              ) : null}

              <p className="text-[0.82rem] font-semibold text-tinta/45">
                De{" "}
                <span className="line-through decoration-noite-600 decoration-2">
                  {oferta.precoCheio}
                </span>{" "}
                por
              </p>

              <p className="placar mt-4 flex items-baseline gap-2 text-tinta">
                <span className="text-[clamp(1.72rem,5.46vw,2.34rem)]">
                  {oferta.parcelasQtd}
                </span>
                <span className="font-sans text-[0.9rem] font-bold text-tinta/50">
                  de
                </span>
                <span className="text-[clamp(2.03rem,7.80vw,3.28rem)]">
                  {oferta.parcelasValor}
                </span>
              </p>

              <p className="fio mt-4 border-t pt-4 text-[0.88rem] font-semibold text-tinta/60">
                ou {oferta.preco} à vista
              </p>

              <Botao href={marca.checkout} className="mt-8 w-full">
                Quero minha vaga
              </Botao>

              <p className="mt-5 text-[0.72rem] leading-relaxed text-tinta/50">
                Compra segura · Acesso liberado assim que o pagamento aprovar
                <br />
                {oferta.acesso} · Cartão, Pix ou boleto
              </p>
            </div>
          </div>
        </Reveal>

        {/* garantia */}
        <Reveal atraso={110} className="mt-14">
          <div className="mx-auto flex max-w-[48rem] flex-col items-start gap-6 border-t border-noite-700/60 pt-10 sm:flex-row sm:gap-10">
            <p className="placar shrink-0 text-[3.6rem] leading-none text-sol-500">
              {oferta.garantiaDias}
              <span className="rotulo mt-1 block text-bruma-300">dias</span>
            </p>
            <div>
              <h3 className="display text-[1.6rem] text-areia-50">
                Risco zero, de verdade
              </h3>
              <p className="mt-3 max-w-[34rem] text-[0.95rem] leading-[1.68] text-areia-200/72">
                Entre, assista tudo, leve pra areia e teste. Se em {oferta.garantiaDias}{" "}
                dias você achar que não é pra você, manda um e-mail e eu devolvo cada
                centavo. Sem justificativa, sem enrolação.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
