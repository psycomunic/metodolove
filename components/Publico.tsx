import { publico } from "@/lib/content";
import { Reveal } from "./movimento";
import { CardSpot, Check, Manchete, Olho, Xis } from "./ui";

/**
 * O filtro.
 *
 * A coluna da direita não é enfeite de honestidade: ela existe para afastar
 * quem quer aprender a JOGAR, que é o comprador errado deste produto e a
 * origem quase certa de pedido de reembolso e review ruim. Vender menos aqui
 * sai mais barato do que vender errado.
 *
 * AS DUAS COLUNAS NÃO TÊM O MESMO PESO, e essa é a correção principal desta
 * seção. Desenhadas iguais, elas liam como uma tabela de comparação, e uma
 * tabela pede que a pessoa escolha um lado. Aqui não há escolha: um lado é
 * onde ela deve se reconhecer, o outro é a porta de saída. A hierarquia vem
 * por TOM, como manda o resto da página, e não por sombra nem por cor nova:
 *
 * · A da esquerda usa `--color-card`, que é mais claro que o navy da seção,
 *   então avança. Ganha o fio de acento no topo, o spotlight no hover e o
 *   texto em `--color-ink` cheio.
 * · A da direita usa `--color-void`, que é mais ESCURO que o navy, então
 *   recua e afunda no fundo. Contorno tracejado, texto em `--color-mute` e
 *   nenhum brilho. Ela precisa ser lida, não desejada.
 *
 * Os itens ganharam fio de 1px entre eles. Soltos, os dois blocos pareciam
 * dois parágrafos picados; com o fio viram lista de conferência, que é o que
 * a pessoa está fazendo ali: passando o dedo item por item.
 *
 * O remate deixou de ser um parágrafo em itálico no rodapé da seção e virou
 * citação assinada, em areia, que é a cor que esta página reserva para
 * citação. É a frase que sustenta o filtro inteiro e estava com o menor peso
 * visual da tela.
 */

/** Uma das duas colunas. `convite` é a da esquerda, a que a pessoa quer ser. */
function Coluna({
  rotulo,
  itens,
  convite,
}: {
  rotulo: string;
  itens: readonly string[];
  convite: boolean;
}) {
  const corpo = (
    <>
      <header className="flex items-baseline justify-between gap-4">
        <h3
          className={`mono text-[0.8125rem] sm:text-[0.7rem] ${
            convite ? "text-accent" : "text-fraco"
          }`}
        >
          {rotulo}
        </h3>
        {/* O contador sai do tamanho da lista. Nunca escrito à mão. */}
        <span className="mono shrink-0 text-[0.8125rem] text-fraco sm:text-[0.68rem]">
          {itens.length} {publico.contagem}
        </span>
      </header>

      <ul className="mt-5 divide-y divide-line sm:mt-6">
        {itens.map((item) => (
          <li key={item} className="flex gap-3.5 py-3.5 first:pt-0 last:pb-0">
            {convite ? (
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            ) : (
              <Xis className="mt-0.5 h-5 w-5 shrink-0 text-fraco" />
            )}
            <span
              className={`text-[1rem] leading-[1.55] ${
                convite ? "text-ink" : "text-mute"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </>
  );

  if (convite) {
    return (
      <CardSpot className="relative h-full overflow-hidden p-6 text-left sm:p-9">
        {/* Fio de acento no topo, esmaecendo nas pontas: o único sinal de que
            esta é a coluna onde a pessoa deve se reconhecer. Um fio, e não um
            glow, porque box-shadow nesta página é só do CTA e da oferta. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        />
        {corpo}
      </CardSpot>
    );
  }

  return (
    <div className="h-full rounded-[1.25rem] border border-dashed border-line bg-void/70 p-6 text-left sm:p-9">
      {corpo}
    </div>
  );
}

export default function Publico() {
  return (
    <section
      id="filtro"
      className="border-t border-fio-areia bg-navy px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[80rem]">
        <header className="text-center sm:max-w-[46rem] sm:text-left">
          <Reveal>
            <Olho>{publico.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={publico.linhas}
            destaque={publico.linhaDestaque}
            fim={publico.linhasFim}
            umaLinha
            className="mt-5 text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />
          <Reveal atraso={140}>
            <p className="mx-auto mt-6 max-w-[38rem] text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-7">
              {publico.texto}
            </p>
          </Reveal>
        </header>

        {/* A coluna do convite é mais larga. As duas com a mesma medida davam
            de novo a leitura de tabela, e é a da esquerda que carrega cinco
            itens contra três. */}
        <div className="mt-10 grid items-stretch gap-4 sm:mt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-5">
          <Reveal className="h-full">
            <Coluna rotulo={publico.ehRotulo} itens={publico.eh} convite />
          </Reveal>
          <Reveal atraso={90} className="h-full">
            <Coluna rotulo={publico.naoEhRotulo} itens={publico.naoEh} convite={false} />
          </Reveal>
        </div>

        {/* A assinatura fica FORA do blockquote, em figcaption. Dentro dele,
            ela viraria parte da própria citação, que é o que o HTML diz que
            ela não é. */}
        <Reveal atraso={80} as="figure" className="mt-10 sm:mt-12">
          <blockquote className="border-l-2 border-fio-areia pl-5 sm:pl-7">
            <p className="max-w-[42rem] text-[1.15rem] leading-[1.45] text-areia sm:text-[1.5rem]">
              {publico.remate}
            </p>
          </blockquote>
          <figcaption className="mono mt-4 pl-5 text-[0.8125rem] text-fraco sm:pl-7 sm:text-[0.68rem]">
            {publico.remateAssinatura}
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
