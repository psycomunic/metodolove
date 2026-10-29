import { bonus } from "@/lib/content";
import { Reveal } from "./movimento";
import { CardSpot, Manchete, Olho } from "./ui";

/**
 * Os sete bônus da Turma Fundadora.
 *
 * Entra DEPOIS dos módulos e antes de quem ensina, e não colado na oferta.
 * Empilhar valor logo antes do preço é o reflexo de página de venda, mas aqui
 * isso custaria caro: a ordem desta página existe para o filtro ("pra quem é,
 * pra quem não é") ser a última coisa que a pessoa lê antes de pagar. Bônus
 * logo depois dos módulos responde "o que mais vem junto" exatamente quando a
 * pergunta nasce, e deixa o convite para desistir no lugar dele.
 *
 * SEM IMAGEM, por enquanto. O briefing cita um Kit_Bonus_Metodo_LLOVE.zip que
 * não chegou, e card com imagem faltando é pior do que card tipográfico: o
 * arquivo quebrado vira retângulo vazio no meio da grade. Quando as artes
 * chegarem, elas entram sem mexer no texto.
 *
 * A NOTA EM LETRA MIÚDA não é decoração. Três bônus estão marcados como
 * pendentes no próprio briefing (uniforme sem logística fechada, aula extra
 * ainda não gravada, encontro sem data), e o documento proíbe anunciá-los
 * como prontos. Enquanto a `nota` existir, ela aparece e o card diz a
 * verdade. Some a nota, some o aviso.
 */
export default function Bonus() {
  return (
    <section
      id="bonus"
      className="border-t border-fio-areia px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[80rem]">
        <header className="text-center sm:max-w-[48rem] sm:text-left">
          <Reveal>
            <Olho>{bonus.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={bonus.linhas}
            destaque={bonus.linhaDestaque}
            umaLinha
            className="mt-5 text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />
          <Reveal atraso={140}>
            <p className="mx-auto mt-6 max-w-[42rem] text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-7">
              {bonus.texto}
            </p>
          </Reveal>
        </header>

        <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {bonus.itens.map((item, i) => (
            <Reveal as="li" key={item.n} atraso={(i % 3) * 70}>
              <CardSpot
                className={`flex h-full flex-col rounded-2xl p-6 text-left sm:p-7 ${
                  item.limitado ? "border-areia/35" : ""
                }`}
              >
                <p className="mono text-[0.8125rem] text-areia sm:text-[0.66rem]">
                  Bônus {item.n}
                </p>
                <h3 className="display mt-3 text-[1.5rem] text-ink sm:mt-4">
                  {item.titulo}
                </h3>
                <p className="mt-3 border-t border-line pt-4 text-[1rem] leading-[1.6] text-mute sm:text-[0.93rem]">
                  {item.texto}
                </p>

                {/* Quantidade limitada dita como FRASE, nunca como contador:
                    a escassez desta página é verificável, e relógio falso
                    derrubaria a tese dela inteira. */}
                {item.limitado ? (
                  <p className="mono mt-4 text-[0.8125rem] leading-[1.6] text-areia/70 sm:text-[0.62rem]">
                    Vagas limitadas: {item.limitado}
                  </p>
                ) : null}

                {item.nota ? (
                  <p className="mono mt-4 border-t border-dashed border-line-forte pt-3 text-[0.8125rem] leading-[1.6] text-fraco sm:text-[0.6rem]">
                    {item.nota}
                  </p>
                ) : null}
              </CardSpot>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
