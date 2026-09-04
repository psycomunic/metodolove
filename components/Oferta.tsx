import { inclusos, marca, oferta } from "@/lib/content";
import { Botao, Check, Reveal, Rotulo } from "./ui";

/**
 * Bloco da oferta, em desenho de página de vendas.
 *
 * A versão anterior tinha cabeçalho de seção com manchete de duas linhas,
 * texto de apoio ao lado, card com etiqueta saindo pela borda, lista em duas
 * colunas, bloco de garantia e letra miúda. Muita peça para o momento em que
 * a pessoa só quer saber quanto custa e onde clica.
 *
 * Aqui a ordem é a da decisão, de cima para baixo e em coluna única: o que é,
 * o que vem junto, quanto custa, o botão, e só então a garantia e a letra
 * miúda. Sem manchete conceitual, sem duas colunas, sem etiqueta flutuando.
 *
 * O preço fica junto do botão de propósito. Separá-los obriga a pessoa a subir
 * o olho para conferir o valor antes de clicar, e cada ida e volta dessas é
 * uma chance de desistir.
 */
export default function Oferta() {
  return (
    <section
      id="oferta"
      className="relative isolate overflow-hidden bg-noite-900 py-14 text-areia-100 sm:py-20"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(110%_72%_at_50%_-10%,#133f66_0%,#0d2f4d_46%,#082038_100%)]" />

      <div className="relative z-10 mx-auto max-w-[46rem] px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <Rotulo tom="claro">O investimento</Rotulo>
          </div>
        </Reveal>

        <Reveal atraso={70}>
          <div className="elevado mt-10 border-t-8 border-sol-500 bg-areia-50 p-8 text-tinta sm:p-12">
            <p className="rotulo text-noite-600">Você leva</p>
            <h2 className="display mt-3 text-[clamp(2rem,5vw,2.8rem)]">
              {marca.nome} completo
            </h2>

            <ul className="mt-7 space-y-3.5">
              {inclusos.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.97rem] leading-snug text-tinta/80"
                >
                  <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-noite-600" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Preço e botão colados: o valor é a última coisa lida antes do
                clique, e não pode obrigar a pessoa a subir o olho de novo. */}
            <div className="fio mt-9 border-t pt-8 text-center">
              <p className="text-[0.88rem] text-tinta/50">
                De <span className="line-through">{oferta.precoCheio}</span> por
              </p>
              <p className="rotulo mt-3 text-noite-600">
                {oferta.parcelasQtd} sem juros de
              </p>
              <p className="placar mt-2 text-[clamp(3.2rem,11vw,4.8rem)] tracking-tighter text-tinta">
                {oferta.parcelasValor}
              </p>
              <p className="mt-2 text-[0.95rem] text-tinta/60">
                ou <span className="font-bold text-tinta">{oferta.preco}</span> à vista
              </p>

              <Botao href={marca.checkout} className="mt-7 w-full">
                Quero minha vaga
              </Botao>

              <p className="mt-4 text-[0.76rem] leading-relaxed text-tinta/50">
                Compra segura · Acesso na hora · {oferta.acesso}
                <br />
                Cartão, Pix ou boleto
              </p>
            </div>
          </div>
        </Reveal>

        {/* A garantia fica FORA do card, depois do botão: ela não é argumento
            de venda, é a rede embaixo de quem já decidiu. */}
        <Reveal atraso={130}>
          <p className="mx-auto mt-8 flex max-w-[34rem] items-start gap-4">
            <span className="placar shrink-0 text-[2.4rem] leading-none text-sol-500">
              {oferta.garantiaDias}
              <span className="rotulo mt-1 block text-bruma-300">dias</span>
            </span>
            <span className="text-[0.92rem] leading-[1.6] text-bruma-200">
              Entre, assista tudo e leve para a sua turma. Se achar que não é para você,
              manda um e-mail e eu devolvo cada centavo. Sem justificativa.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
