import { inclusos, marca, oferta } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Botao, CabecalhoSecao, Check, Reveal } from "./ui";

/**
 * Bloco da oferta.
 *
 * Três desenhos foram renderizados e comparados lado a lado antes desta
 * escolha: sem card nenhum, preço centrado no topo, e este.
 *
 * O card era duas colunas de cor encostadas, e o cliente reprovou três vezes
 * por parecer "quadrado". A etiqueta laranja resolve isso pela SILHUETA: ela
 * avança para fora da borda superior, então o contorno do bloco deixa de ser
 * um retângulo. Arredondar canto só suaviza; quebrar a forma resolve.
 *
 * A etiqueta também põe o preço acima de tudo na hierarquia visual, que é
 * onde ele tem de estar num bloco de conversão, sem precisar de um painel de
 * cor ocupando metade da largura.
 */
export default function Oferta() {
  return (
    <section
      id="oferta"
      className="grao relative isolate overflow-hidden bg-noite-900 pt-14 pb-16 text-areia-100 sm:pt-20 sm:pb-24"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(110%_72%_at_18%_-4%,#133f66_0%,#0d2f4d_46%,#082038_100%)]" />
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

        <Reveal atraso={160} className="mt-9 sm:mt-16">
          <div className="elevado relative mx-auto max-w-[60rem] rounded-lg bg-areia-50 p-6 text-tinta sm:p-12">
            {/* A etiqueta sai para fora do card: é ela que quebra o retângulo.
                No celular ela volta para dentro do fluxo, porque saindo em
                tela estreita ela encostaria na borda da janela. */}
            <div className="mb-7 -ml-6 w-fit bg-sol-500 py-4 pr-9 pl-6 text-white shadow-lg sm:absolute sm:-top-8 sm:right-12 sm:mb-0 sm:ml-0 sm:px-7">
              <p className="text-[0.72rem] font-semibold text-white/70">
                De <span className="line-through">{oferta.precoCheio}</span> por
              </p>
              <p className="rotulo mt-2 text-white/85">
                {oferta.parcelasQtd} sem juros de
              </p>
              <p className="placar mt-1 text-[clamp(1.9rem,5vw,2.6rem)] leading-none">
                {oferta.parcelasValor}
              </p>
            </div>

            <p className="rotulo text-noite-600">Você leva</p>
            <h3 className="display mt-3 max-w-[16ch] text-[clamp(1.7rem,4vw,2.4rem)]">
              {marca.nome} completo
            </h3>

            <ul className="mt-7 grid gap-x-10 gap-y-3.5 sm:mt-8 sm:grid-cols-2">
              {inclusos.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.95rem] leading-snug text-tinta/78"
                >
                  <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-noite-600" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="fio mt-9 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-3.5">
                <span className="placar shrink-0 text-[2.2rem] leading-none text-sol-500">
                  {oferta.garantiaDias}
                  <span className="rotulo mt-1 block text-tinta/45">dias</span>
                </span>
                <span className="max-w-[20rem] text-[0.86rem] leading-[1.55] text-tinta/60">
                  Para pedir o dinheiro de volta, sem justificar. Ou {oferta.preco} à
                  vista, se preferir.
                </span>
              </p>
              <Botao href={marca.checkout} className="shrink-0">
                Quero minha vaga
              </Botao>
            </div>

            <p className="mt-6 text-[0.74rem] text-tinta/45">
              Compra segura · Acesso liberado assim que o pagamento aprovar ·{" "}
              {oferta.acesso} · Cartão, Pix ou boleto
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
