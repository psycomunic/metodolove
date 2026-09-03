import { inclusos, marca, oferta } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Botao, CabecalhoSecao, Check, Reveal } from "./ui";

export default function Oferta() {
  return (
    <section
      id="oferta"
      className="grao relative isolate overflow-hidden bg-noite-900 pt-24 pb-28 text-areia-100 sm:pt-32"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(110%_72%_at_18%_-4%,#16308F_0%,#0B1A5E_46%,#060E3A_100%)]" />
      {/* >>> SLOT DE IMAGEM: a silhueta do Rio saiu daqui em set/2026. */}

      <div className="relative z-10 mx-auto max-w-[80rem] px-5 sm:px-8">
        <CabecalhoSecao
          tom="claro"
          rotulo="O investimento"
          titulo={
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
          }
          texto="Pagamento único. Sem mensalidade, sem taxa escondida, sem renovação automática. Você entra hoje e o material é seu pelo tempo de acesso combinado."
        />

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

            {/* Painel de preço em MARINHO, não num segundo creme. Os dois
                cremes tinham tom quase igual e a divisão do card não lia como
                intenção; e sobre marinho o laranja do botão ganha o contraste
                que ele precisa ter no ponto da decisão. */}
            <div className="flex flex-col justify-center bg-noite-900 p-8 text-areia-50 sm:p-11">
              {oferta.vagas ? (
                <p className="rotulo mb-6 text-sol-400">{oferta.vagas}</p>
              ) : null}

              <p className="rotulo text-bruma-300">
                De <span className="line-through">{oferta.precoCheio}</span> por
              </p>

              {/* Uma só escala tipográfica no preço. Antes eram três corpos
                  diferentes na mesma linha e o "de" minúsculo entre eles
                  quebrava a leitura do número. */}
              <p className="mt-5">
                <span className="rotulo block text-bruma-200">
                  {oferta.parcelasQtd} sem juros de
                </span>
                <span className="placar mt-2 block text-[clamp(2.6rem,9vw,4.2rem)] text-white">
                  {oferta.parcelasValor}
                </span>
              </p>

              <p className="mt-4 border-t border-white/15 pt-4 text-[0.9rem] text-bruma-200">
                ou <span className="font-bold text-white">{oferta.preco}</span> à vista
              </p>

              <Botao href={marca.checkout} className="mt-8 w-full">
                Quero minha vaga
              </Botao>

              <p className="mt-5 text-[0.74rem] leading-relaxed text-bruma-300">
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
