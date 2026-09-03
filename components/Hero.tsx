import { hero, marca, oferta, provas } from "@/lib/content";
import { Contador, LinhasReveal } from "./movimento";
import { Botao, Destaque, Reveal, Rotulo } from "./ui";

/**
 * Hero de dobra única, conduzido pelas artes FUNDO-HERO-*.jpg.
 *
 * A foto é CAMADA DE COBERTURA, não uma placa em proporção natural: a versão
 * anterior respeitava o aspecto da imagem e, numa janela baixa, isso empurrava
 * a manchete para fora da primeira dobra. Aqui a seção manda (min-h-svh) e a
 * foto se ajusta por object-cover.
 *
 * O véu azul existe por medição, não por gosto: o mapa de luminância das duas
 * artes mostra a metade esquerda do desktop entre 170 e 255 — céu, areia e pôr
 * do sol. Texto branco cru ali seria ilegível. O gradiente varre da esquerda no
 * desktop (onde fica a escrita) e sobe de baixo no mobile (onde a arte já é
 * azul), sempre no mesmo #002F73 do rodapé das imagens, para não criar emenda.
 *
 * `svh` e não `vh`: no celular a barra de endereço do navegador entra na conta
 * do `vh` e cortaria o botão de compra na carga.
 */
export default function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-noite-800"
    >
      {/* ---------------- camada de foto ---------------- */}
      <div className="absolute inset-0 -z-10">
        <picture>
          <source
            media="(min-width: 768px) and (min-aspect-ratio: 1/1)"
            srcSet="/FUNDO-HERO-DESKTOP.jpg"
          />
          <img
            src="/FUNDO-HERO-MOBILE.jpg"
            alt="Dupla de atletas em quadra de areia ao pôr do sol, com bola de futevôlei no alto"
            fetchPriority="high"
            decoding="async"
            // CELULAR: largura total em proporção natural, SEM corte. A arte
            // vertical é 1441x1800; forçá-la a cobrir 390x846 descartava 287px
            // de largura (42% da imagem) e comia a bola e os arcos laterais.
            // Abaixo dela aparece o fundo da seção, que é o mesmo #002F73 do
            // rodapé da arte — a emenda é invisível.
            //
            // md+: aí sim object-cover, porque a arte deitada (1800x969) tem
            // proporção parecida com a da janela e o corte é mínimo. O
            // enquadramento puxa para a direita, onde estão os atletas.
            className="w-full deitado:h-full deitado:object-cover deitado:object-[72%_center]"
          />
        </picture>

        {/* Véu. Mobile sobe de baixo; a partir de md varre da esquerda. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#002F73_34%,rgba(0,47,115,0.98)_52%,rgba(0,47,115,0.9)_66%,rgba(0,47,115,0.6)_78%,rgba(0,47,115,0.18)_91%,transparent_100%)] deitado:bg-[linear-gradient(to_right,#002F73_3%,rgba(0,47,115,0.95)_28%,rgba(0,47,115,0.66)_46%,rgba(0,47,115,0.18)_64%,transparent_79%)]" />
        {/* Fecho inferior: garante o azul chapado na emenda com a próxima seção. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,#002F73)] deitado:h-44" />
      </div>

      {/* ---------------- conteúdo, centrado na dobra ---------------- */}
      {/* No celular o texto começa onde a arte vira azul chapado; a partir
          de md ele vira coluna à esquerda, centrada na vertical. */}
      <div className="flex flex-1 items-start deitado:items-center">
        <div className="mx-auto w-full max-w-[80rem] px-5 pt-[min(68vw,42svh)] pb-6 max-[380px]:pt-[60vw] sm:px-8 deitado:pt-20 deitado:pb-8">
          <div className="max-w-[45rem]">
            <Reveal>
              <Rotulo tom="claro">{hero.olho}</Rotulo>
            </Reveal>

            <h1 className="display mt-5 text-[clamp(2rem,7.4vw,4.1rem)] text-white max-[380px]:text-[1.85rem]">
              <LinhasReveal
                linhas={[
                  hero.linha1,
                  hero.linha2,
                  <Destaque key="destaque" cor="campo">
                    {hero.linha3Destaque}
                  </Destaque>,
                ]}
              />
            </h1>

            <Reveal atraso={120}>
              <p className="mt-5 max-w-[32rem] text-[0.93rem] leading-[1.55] text-bruma-200 sm:text-[1.05rem] md:mt-6">
                {hero.subtitulo}
              </p>
            </Reveal>

            <Reveal atraso={180}>
              <p className="mt-3.5 max-w-[32rem] border-l-[3px] border-sol-500 pl-4 text-[0.92rem] leading-[1.5] font-medium text-white md:mt-4">
                {hero.assinaturaSub}
                <span className="mt-1 block text-[0.76rem] font-normal text-bruma-300">
                  {marca.autor}, {marca.instagramHandle}
                </span>
              </p>
            </Reveal>

            <Reveal atraso={240}>
              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-7">
                <Botao href={marca.checkout} className="w-full sm:w-auto">
                  {hero.cta}
                </Botao>
                {/* Dado de apoio em texto puro, sem contêiner. A pílula
                    arredondada ao lado de um botão de canto vivo colocava duas
                    gramáticas de forma lado a lado, na mesma altura, e as duas
                    brigavam. Aqui só o botão tem forma — que é o que deve ter. */}
                <p className="hidden text-[0.8rem] leading-snug text-bruma-200 sm:block">
                  <span className="font-bold text-white">
                    {oferta.parcelasQtd} de {oferta.parcelasValor}
                  </span>
                  <br />
                  {oferta.garantiaDias} dias de garantia
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------------- prova, no pé da dobra ----------------
          Fio de 1px sobre o próprio azul do hero, não uma barra escura
          separada: a barra criava uma terceira zona entre a foto e a seção
          seguinte e cortava o hero em vez de fechá-lo.

          A faixa só existe se houver número de verdade. Ver o comentário em
          lib/content.ts: prova fraca em lugar nobre custa mais que espaço
          vazio. */}
      {provas.some((p) => p.valor !== null) ? (
        <div className="relative border-t border-white/12">
          <dl className="mx-auto flex max-w-[80rem] flex-col gap-5 px-5 py-5 sm:flex-row sm:items-baseline sm:gap-12 sm:px-8">
            {provas
              .filter((item) => item.valor !== null)
              .map((item) => (
                <div key={item.rotulo} className="flex items-baseline gap-3">
                  <dt className="placar text-[clamp(1.5rem,3.4vw,2.1rem)] text-sol-400">
                    <Contador
                      valor={item.valor as number}
                      decimais={item.decimais}
                      pad={item.pad}
                    />
                    {item.sufixo ? (
                      <span className="ml-1 text-[0.42em] text-white">{item.sufixo}</span>
                    ) : null}
                  </dt>
                  <dd className="max-w-[15rem] text-[0.74rem] leading-snug text-bruma-200">
                    {item.rotulo}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      ) : null}

      {/* ---------------- fecho do hero ----------------
          Duas coisas resolvidas aqui, e elas não competem:

          1. O espaço abaixo do botão estava morto desde que a barra de
             métricas saiu. Agora ele carrega o que derruba objeção bem na
             hora da decisão — prazo, forma de pagamento, garantia.
          2. O azul encontrava o creme numa linha reta absoluta, e parecia
             duas imagens coladas. O arco é do mesmo vocabulário dos arcos
             concêntricos que já existem na arte do hero, então a borda fecha
             a peça em vez de só terminá-la. */}
      <div className="relative border-t border-white/15">
        <div className="mx-auto flex max-w-[80rem] flex-wrap items-center gap-x-8 gap-y-2 px-5 py-5 text-[0.76rem] font-semibold tracking-wide text-bruma-200 sm:px-8">
          <span>Acesso imediato</span>
          <span className="h-3 w-px bg-white/25" />
          <span>{oferta.acesso}</span>
          <span className="h-3 w-px bg-white/25" />
          <span>Cartão, Pix ou boleto</span>
          <span className="h-3 w-px bg-white/25" />
          <span>{oferta.garantiaDias} dias de garantia</span>
        </div>
      </div>

      {/* O raio enorme faz a curva ler como arco amplo, não como bolha. */}
      <div className="relative h-12 w-full overflow-hidden sm:h-20" aria-hidden="true">
        <div className="absolute inset-x-[-14%] top-0 h-[30rem] rounded-[50%] bg-areia-100" />
      </div>
    </section>
  );
}
