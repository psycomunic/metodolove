import { hero, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import GaivotasLoop from "./rio/GaivotasLoop";
import AquarelaRio from "./rio/AquarelaRio";
import { Botao, Foto, LinhaPreco, Manchete, Olho } from "./ui";

/**
 * COMO A FOTO SOME NO FUNDO, no desktop.
 *
 * Antes era um véu de cor por cima: `from-void via-black/40 to-transparent`,
 * três paradas numa rampa reta. Duas coisas denunciavam a emenda. A rampa
 * reta faz o olho enxergar exatamente onde a cor começa a mudar, porque a
 * derivada é constante e a nossa visão lê justamente a variação. E o véu
 * levava o tom da foto junto: ele não apagava a imagem, pintava por cima
 * dela.
 *
 * Agora quem some é a IMAGEM, por `mask-image`, e não a cor. A máscara
 * recorta opacidade e não encosta no matiz, então a foto chega ao fim com a
 * cor real dela, do mesmo jeito que a `Foto` de ui.tsx já fazia na base.
 *
 * As paradas seguem uma curva em S (devagar, rápido no meio, devagar de
 * novo). Numa rampa reta a transição tem começo e fim visíveis; com o S ela
 * nasce e morre sem aresta, que é o que se lê como esfumaçado. São muitas
 * paradas de propósito: poucas produzem faixas, o banding.
 *
 * A coluna da foto também ficou mais larga (58% contra 46%). Não é para a
 * foto aparecer mais, é para a dissolução ter ONDE acontecer: em 46% ela
 * tinha que sumir em pouco mais de um terço da tela e, por mais suave que
 * fosse a curva, acabava espremida. Como o recorte está ancorado à direita,
 * alargar só acrescenta imagem do lado que vai ser dissolvido; o Charllove
 * não se move.
 */
const DISSOLVE_ESQUERDA = `linear-gradient(to right,
  transparent 0%,
  rgba(0,0,0,0.008) 8%,
  rgba(0,0,0,0.035) 16%,
  rgba(0,0,0,0.085) 24%,
  rgba(0,0,0,0.16) 32%,
  rgba(0,0,0,0.26) 40%,
  rgba(0,0,0,0.38) 48%,
  rgba(0,0,0,0.52) 56%,
  rgba(0,0,0,0.66) 64%,
  rgba(0,0,0,0.78) 72%,
  rgba(0,0,0,0.88) 80%,
  rgba(0,0,0,0.95) 88%,
  rgba(0,0,0,0.99) 94%,
  #000 100%)`;

/* Mesma curva, agora subindo: é onde a aquarela do Rio passa, e ela precisa
   de fundo liso para a crista não brigar com o ombro dele. */
const DISSOLVE_BASE = `linear-gradient(to top,
  transparent 0%,
  rgba(0,0,0,0.02) 6%,
  rgba(0,0,0,0.07) 12%,
  rgba(0,0,0,0.16) 18%,
  rgba(0,0,0,0.3) 25%,
  rgba(0,0,0,0.46) 32%,
  rgba(0,0,0,0.62) 39%,
  rgba(0,0,0,0.76) 46%,
  rgba(0,0,0,0.87) 53%,
  rgba(0,0,0,0.95) 60%,
  #000 68%)`;

/* As duas se multiplicam: `intersect` fica com o MENOR alpha dos dois em cada
   ponto, então o canto de baixo à esquerda some pelos dois motivos. Sem o
   composite elas somariam e o canto ficaria mais opaco, não menos. */
const FOTO_DESKTOP = {
  WebkitMaskImage: `${DISSOLVE_ESQUERDA}, ${DISSOLVE_BASE}`,
  maskImage: `${DISSOLVE_ESQUERDA}, ${DISSOLVE_BASE}`,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
} as const;

/**
 * Escurecimento sob a manchete.
 *
 * Continua PRETO, nunca colorido: véu de cor em cima de foto é o que o
 * cliente reprovou. Ficou bem mais fraco que antes porque agora ele divide o
 * trabalho com a máscara, que já tirou quase toda a imagem desse lado. Ele
 * está DENTRO do container mascarado, então esmaece junto com a foto em vez
 * de virar uma mancha escura sobrando no navy.
 */
const VEU_TEXTO = {
  background: `linear-gradient(to right,
    rgba(0,0,0,0.5) 0%,
    rgba(0,0,0,0.42) 10%,
    rgba(0,0,0,0.32) 20%,
    rgba(0,0,0,0.22) 30%,
    rgba(0,0,0,0.13) 40%,
    rgba(0,0,0,0.06) 50%,
    rgba(0,0,0,0.02) 60%,
    transparent 70%)`,
} as const;

/**
 * Hero.
 *
 * Duas montagens diferentes, e não uma só que "responde":
 *
 * · Celular: a foto é uma faixa de 52vh no topo, com a cor real dela, e o
 *   texto vem abaixo, centralizado. Nada de foto atrás do texto: com a foto
 *   sem tratamento (o cliente reprovou o duotone) qualquer texto por cima
 *   dela perde contraste em metade dos aparelhos.
 * · Desktop: a foto ocupa a metade direita e a manchete avança sobre ela.
 *   O escurecimento sobre a foto é PRETO, nunca colorido, e só do lado onde
 *   a palavra passa por cima.
 *
 * A altura desconta a barra de urgência e a pílula da nav, que estão no fluxo
 * acima: 100svh cheios empurrariam o CTA para fora da primeira dobra.
 *
 * TUDO CABE NA PRIMEIRA DOBRA, e é por isso que a manchete e os espaços
 * daqui são medidos em `vh` e não só em `vw`. `min-h` sozinho garantia que a
 * seção FOSSE alta, não que o conteúdo COUBESSE: numa tela de 900px o placar
 * e a linha de preço caíam abaixo do corte, porque o corpo do texto só
 * respondia à largura da janela.
 *
 * A manchete usa `min(7.4vw, 9vh)`: manda quem for menor, largura ou altura.
 * Em monitor alto ela continua no tamanho cheio; em notebook baixo ela encolhe
 * sozinha e leva junto os espaços, que também são `clamp` com `vh`. O piso de
 * cada `clamp` existe para a manchete nunca virar letra miúda numa janela
 * muito baixa: a partir dali é melhor a página rolar do que ficar ilegível.
 *
 * Isto vale do `lg` para cima. No celular a foto ocupa 52vh no topo e o texto
 * vem abaixo dela, então a dobra não comporta os dois, e é o certo: ali a
 * pessoa rola.
 *
 * O RIO. O horizonte é o elemento de identidade da página e fica na base da
 * seção, acima da foto e abaixo do texto. Agora é a AQUARELA do cliente,
 * entrando como marca d'água azul (ver AquarelaRio), e não mais a silhueta
 * desenhada em SVG. Gaivotas cruzam o céu em 45 s.
 *
 * A silhueta desenhada em SVG continua viva no CTA final, na versão noturna.
 */

export default function Hero() {
  return (
    <section
      id="topo"
      /* A margem negativa puxa o hero PARA TRÁS da nav, só no celular.
         Sem ela a nav transparente fica sobre o fundo chapado da página e
         não há nada para transparecer: ela lê como barra sólida, e a foto
         começa 55px abaixo do topo. Com ela a foto sangra até a borda de
         cima e o logo flutua sobre a imagem, que é o que "menu transparente"
         quer dizer.

         `-mt-14` casa com o `h-14` que a nav tem abaixo do lg: a altura dela
         é FIXA justamente para as duas medidas não poderem divergir quando
         alguém mexer no tamanho do logo ou do botão. No desktop a barra de
         urgência continua no topo e o hero segue no lugar. */
      className="relative isolate -mt-14 overflow-hidden lg:mt-0"
    >
      {/* ---------- aurora ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="absolute top-[-14%] left-[-8%] h-[28rem] w-[28rem] rounded-full opacity-[0.16] sm:h-[46rem] sm:w-[46rem]"
          style={{
            background: "radial-gradient(circle, #4FA3FF 0%, transparent 68%)",
            filter: "blur(140px)",
          }}
        />
        <div
          className="absolute top-[6%] right-[-10%] h-[30rem] w-[30rem] rounded-full opacity-[0.22] sm:h-[52rem] sm:w-[52rem]"
          style={{
            background: "radial-gradient(circle, #1E3A8A 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      {/* Gaivotas: três, em alturas e ritmos diferentes, para nunca lerem como
          uma fila. */}
      <GaivotasLoop className="-z-10 text-areia" />

      {/* Horizonte, colado na base da seção. */}
      {/* Acima da foto (-z-5 contra -z-10), e não atrás dela: atrás, a metade
          direita da orla ficava escondida e o Corcovado era cortado ao meio
          pela borda da imagem. À frente, o horizonte cruza justamente o terço
          de baixo da foto, que já está desbotado no navy. */}
      <AquarelaRio
        prioridade
        recuaNasPontas
        className="absolute inset-x-0 bottom-0 -z-[5]"
      />

      {/* Alvo do Cristo, para o rótulo aparecer no hover.

          Fica FORA da aquarela e depois do conteúdo, com z positivo: a
          aquarela está em -z-5, atrás da coluna de texto, e um alvo lá embaixo
          nunca receberia o ponteiro.

          A posição sai da própria arte: no arquivo, o cume do Corcovado está a
          70,7% da largura e a 4,5% da altura. A faixa tem proporção de 2,977,
          então a altura dela é 0,336 da largura da tela, e o cume fica a
          0,955 x 0,336 = 32,1vw acima da base. Como a imagem nunca é
          recortada (é sempre w-full), essa conta vale em qualquer largura. */}
      <div className="group absolute bottom-[32.08vw] left-[70.7%] z-20 hidden h-16 w-16 -translate-x-1/2 translate-y-1/2 lg:block">
        <span className="mono pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-full border border-fio-areia bg-void/92 px-3 py-1.5 text-[0.6rem] whitespace-nowrap text-areia opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          Corcovado · 710 m
        </span>
      </div>

      {/* ---------- foto, celular ----------
          ARQUIVO PRÓPRIO, e não o mesmo do desktop com outro recorte.

          A foto do desktop é DEITADA (1468x1093) com o Charllove encostado na
          direita. Numa faixa de celular, que é mais larga do que alta, o
          `cover` apara as laterais, e qualquer recorte dela ou cortava ele ou
          o empurrava para o canto. `hero-mobile.webp` é um retrato 3:4 tirado
          da mesma arte, ancorado à direita: pega o Charllove inteiro E o
          Cristo, com ele no meio do quadro. São 37 KB, então o celular baixa
          menos do que baixava recortando a imagem larga.

          A faixa ficou em 48vh. Ela chegou a 58vh quando a barra de urgência
          saiu do topo, mas aí a manchete nascia cortada pela dobra: a foto é
          a entrada, a manchete é a promessa, e a promessa não pode precisar de
          rolagem. Com 48vh entram o rosto dele E as três linhas da manchete
          na primeira tela, que é o que importa. */}
      <div className="relative h-[48vh] max-h-[25rem] w-full lg:hidden">
        <Foto
          src="/hero-mobile.webp"
          alt={`${marca.autor}, criador do ${marca.nome}`}
          arte={hero.fotoArte}
          prioridade
          className="[&_img]:object-top"
        />
        {/* Véu no alto, só no celular: a nav ficou transparente e o topo desta
            foto é céu claro, onde o logo claro sumiria. Preto, nunca colorido,
            que é a regra para escurecimento sobre foto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
        />
      </div>

      {/* ---------- foto, desktop ----------
          Metade direita. O retrato em pé cai bem melhor aqui do que o banner
          deitado caía: a coluna é alta e estreita, que é a forma da foto.
          Ancorado no topo pelo mesmo motivo do celular. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] lg:block"
        style={FOTO_DESKTOP}
      >
        <div className="relative h-full w-full">
          <Foto
            src="/HERO-DESKTOP.jpg"
            alt=""
            arte={hero.fotoArte}
            prioridade
            desbota={false}
            className="[&_img]:object-right"
          />
          <div className="absolute inset-0" style={VEU_TEXTO} />
        </div>
      </div>

      {/* ---------- conteúdo ---------- */}
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center px-5 pt-10 pb-14 text-center sm:px-8 lg:min-h-[calc(100svh-7rem)] lg:items-start lg:justify-center lg:pt-[clamp(2rem,5vh,5rem)] lg:pb-[clamp(2rem,4vh,4rem)] lg:text-left">
        <div className="w-full lg:max-w-[54rem]">
          <Reveal>
            <Olho vivo={hero.selo}>{hero.olho}</Olho>
          </Reveal>

          <Manchete
            as="h1"
            linhas={hero.linhas}
            destaque={hero.linhaDestaque}
            flui
            className="mt-5 text-[clamp(2.75rem,12.5vw,4rem)] text-ink sm:mt-7 sm:text-[clamp(2.5rem,min(7.4vw,9vh),6.5rem)]"
          />

          <Reveal atraso={160}>
            <p className="mx-auto mt-6 max-w-[38rem] text-[1rem] leading-[1.6] text-mute sm:mt-[clamp(1rem,2.6vh,2rem)] sm:text-[1.08rem] lg:mx-0">
              {hero.subtitulo}
            </p>
          </Reveal>

          <Reveal atraso={240}>
            <div className="mt-8 flex flex-col items-center gap-5 sm:mt-[clamp(1.25rem,3.4vh,2.5rem)] lg:flex-row lg:items-center lg:gap-6">
              <Botao href={marca.checkout} ima cheio>
                {hero.cta}
              </Botao>
              <a
                href="#metodo"
                className="mono inline-flex items-center gap-2 text-[0.8125rem] text-mute transition-colors duration-200 hover:text-ink sm:text-[0.7rem]"
              >
                {hero.ctaSecundario}
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </a>
            </div>
            <LinhaPreco className="mt-5" />
          </Reveal>
        </div>

        {/* ---------- placar ----------
            LISTA no celular, fila única no desktop.

            Era grade de duas colunas, e são TRÊS números: o terceiro sobrava
            sozinho numa segunda linha, encostado à esquerda, e a peça lia
            como grade quebrada em vez de placar. Três colunas também não
            servem: a 360px cada uma fica com 82px de texto útil, e "BÔNUS
            NETWORKING" em mono de 13px (o piso da página) não cabe sem
            quebrar feio.

            Em lista, o número fica numa coluna de largura fixa e o rótulo
            corre ao lado com a linha inteira. Alinha os três pela mesma
            guia, aceita rótulo comprido sem quebrar, e o fio de 1px entre
            eles é a mesma linguagem do resto da página. Ocupa menos altura do
            que a grade órfã ocupava. */}
        <Reveal
          atraso={320}
          className="mt-9 w-full sm:mt-12 lg:mt-[clamp(1.5rem,5vh,6rem)]"
        >
          <dl className="flex flex-col divide-y divide-line sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-16 sm:divide-y-0">
            {hero.stats.map((stat) => (
              <div key={stat.rotulo} className="py-3 first:pt-0 last:pb-0 sm:py-0">
                <dt className="sr-only">{stat.rotulo}</dt>
                <dd className="flex items-baseline gap-4 sm:block">
                  <span className="placar w-[3.1rem] shrink-0 text-[2.3rem] text-ink sm:w-auto sm:text-[2.9rem]">
                    {stat.valor}
                  </span>
                  <span className="mono text-[0.8125rem] text-mute sm:mt-1.5 sm:block sm:text-[0.66rem]">
                    {stat.rotulo}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
