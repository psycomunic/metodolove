import { inclusos, marca, oferta } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Botao, CabecalhoSecao, Check, Reveal } from "./ui";

export default function Oferta() {
  return (
    <section
      id="oferta"
      className="grao relative isolate overflow-hidden bg-noite-900 pt-14 pb-16 text-areia-100 sm:pt-20 sm:pb-24"
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

        {/* Bloco da oferta. Aqui o card é justificado: é o container da
            conversão, o único lugar da página com interação de verdade.

            Três correções de set/2026, todas de alinhamento:

            1. A coluna do preço estava centrada na vertical enquanto a da
               esquerda era alinhada ao topo. Os dois lados corriam em ritmos
               diferentes e sobrava um vazio no pé da esquerda. Agora as duas
               partem da mesma linha.
            2. O canto era vivo em tudo e o conjunto lia como duas caixas
               encostadas. Um raio pequeno tira a dureza sem virar bolha: é a
               exceção do container de conversão, não uma licença geral.
            3. A divisão entre os painéis era só a troca de cor. Ganhou um fio
               dourado, que é o recurso do banner da marca. */}
        <Reveal atraso={160} className="mt-14">
          <div className="elevado mx-auto grid max-w-[64rem] overflow-hidden rounded-lg bg-areia-50 text-tinta lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col p-8 sm:p-11">
              <p className="rotulo text-noite-600">Você leva</p>
              <h3 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.1rem)] text-tinta">
                {marca.nome} completo
              </h3>

              <ul className="mt-8 space-y-4">
                {inclusos.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3.5 text-[0.95rem] leading-snug text-tinta/80"
                  >
                    <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-noite-600" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Fecha o pé da coluna, que antes terminava no ar. A garantia
                  aqui não é repetição do bloco de baixo: ali ela é argumento,
                  aqui é a última objeção derrubada ao lado do botão. */}
              <div className="fio mt-auto flex items-start gap-4 border-t pt-7">
                <p className="placar shrink-0 text-[2.6rem] leading-none text-sol-500">
                  {oferta.garantiaDias}
                  <span className="rotulo mt-1 block text-tinta/45">dias</span>
                </p>
                <p className="text-[0.9rem] leading-[1.6] text-tinta/65">
                  Entre, assista tudo e leve para a sua turma. Se em {oferta.garantiaDias}{" "}
                  dias achar que não é para você, manda um e-mail e eu devolvo cada
                  centavo. Sem justificativa, sem enrolação.
                </p>
              </div>
            </div>

            {/* Painel de preço em marinho, com fio dourado na emenda.
                O conteúdo corre do topo, sem mt-auto empurrando o botão para
                baixo: aquilo abria um vão no MEIO da coluna, entre o preço e o
                botão, e vazio no meio de um bloco lê como erro. Sobrando no
                fim de um painel de cor chapada, lê como respiro. */}
            <div className="relative flex flex-col bg-noite-900 p-8 text-areia-50 sm:p-11 lg:border-l lg:border-areia-400/30">
              {oferta.vagas ? (
                <p className="rotulo mb-6 text-sol-400">{oferta.vagas}</p>
              ) : null}

              <p className="text-[0.86rem] text-bruma-300">
                De <span className="line-through">{oferta.precoCheio}</span> por
              </p>

              <p className="mt-6">
                <span className="rotulo block text-bruma-200">
                  {oferta.parcelasQtd} sem juros de
                </span>
                <span className="placar mt-2 block text-[clamp(2.6rem,8vw,3.9rem)] text-white">
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
      </div>
    </section>
  );
}
