import Image from "next/image";

/**
 * A aquarela do Rio como marca d'água no fundo do hero.
 *
 * O PROBLEMA. O arquivo é um JPEG de fundo BRANCO, sem transparência. Chapado
 * sobre o navy ele seria um retângulo branco no meio da página, e nenhum
 * ajuste de opacidade resolve: opacidade baixa só deixa o retângulo cinza.
 *
 * A SOLUÇÃO, em duas etapas que dependem uma da outra:
 *
 * 1. `invert(1)` faz o branco do fundo virar PRETO, e o desenho, que é claro
 *    e colorido, virar claro sobre esse preto.
 * 2. `mix-blend-mode: screen` descarta o preto (screen com preto não muda
 *    nada) e deixa passar só o que ficou claro.
 *
 * Ou seja: o fundo branco desaparece de verdade, sem máscara e sem PNG
 * recortado. O que sobra é o traço da aquarela, e ele entra como LUZ sobre o
 * navy, do mesmo jeito que a silhueta desenhada entrava antes.
 *
 * Entre as duas etapas, `sepia` + `hue-rotate` levam tudo para o azul da
 * página: sem isso o verde da mata e o vermelho das flores voltariam
 * invertidos, em magenta e ciano, e a marca d'água brigaria com o azul de
 * destaque dos títulos.
 *
 * `screen` sobre navy nunca escurece, então a marca d'água não pode reduzir o
 * contraste do texto que passa por cima dela. O que ela pode é CLAREAR o
 * fundo e comer o contraste do texto claro que passa por cima, e é por isso
 * que a opacidade fica em 0,3: a 0,42 a linha de preço do hero já começava a
 * sumir dentro das palmeiras.
 *
 * Baixar a opacidade, porém, não resolvia o problema real, que era de FORMA e
 * não de intensidade: a faixa cobria a altura inteira da copy, e a 0,3 já
 * lia como véu. A correção veio das máscaras abaixo, que tiram a aquarela de
 * onde há texto em vez de apagá-la por igual. Apagar por igual só deixaria a
 * arte do cliente fraca em todo lugar e suja onde importa.
 *
 * A imagem é sempre `w-full`, nunca com largura mínima. Assim ela nunca é
 * recortada, e a posição de qualquer ponto do desenho (o Corcovado, por
 * exemplo) pode ser calculada em porcentagem da própria faixa.
 */

/**
 * A CORREÇÃO DE COR, e por que ela é só um `hue-rotate` depois do `invert`.
 *
 * `invert(1)` resolve o fundo branco, mas inverte a arte junto: a mata verde
 * vira magenta e as flores rosa viram ciano. A cadeia antiga escondia isso
 * empurrando TUDO para um azul só (`sepia` + `saturate 2.6`), e o preço era a
 * aquarela do cliente virar monocromática.
 *
 * `hue-rotate(180deg)` desfaz justamente a rotação de matiz que o `invert`
 * causou, e devolve a cor original: mata verde, flores rosa, areia, mar azul.
 * A inversão de LUMINÂNCIA continua de pé, que é o que interessa, porque é
 * ela que faz o branco virar preto e sumir no `screen`. Preto sob
 * `hue-rotate` continua preto, então o fundo segue desaparecendo.
 *
 * `saturate` fica em 1,15 e não mais alto: a 1,6 o verde da mata começa a
 * competir com o botão de compra, que é a única coisa da página que pode ser
 * o ponto mais quente da tela.
 */
const MARCA_DAGUA = "invert(1) hue-rotate(180deg) saturate(1.15) contrast(1.05)";

/**
 * VERTICAL. A rampa antiga chegava a 45% de alpha em 18% da altura e fechava
 * em 46%: a aquarela ganhava corpo já na primeira quarta parte da faixa, bem
 * onde moram o subtítulo, o botão e a linha de preço do hero. Com `screen`
 * ela CLAREIA o navy, então o que se via era um véu azul por cima da copy, e
 * não um horizonte.
 *
 * Agora o topo é invisível de verdade até 32% e o desenho só toma corpo no
 * terço de baixo. É o que faz a aquarela ler como horizonte nascendo do navy,
 * que era a intenção desde o começo.
 */
const MASCARA_V =
  "linear-gradient(to bottom, transparent 0%, transparent 32%, rgba(0,0,0,0.14) 54%, rgba(0,0,0,0.48) 73%, rgba(0,0,0,0.86) 89%, #000 100%)";

/**
 * HORIZONTAL, e só onde quem usa pede (`recuaNasPontas`).
 *
 * No hero a coluna de texto ocupa a esquerda e a foto do Charllove a direita.
 * A aquarela em força cheia atravessava as duas: à esquerda comia o contraste
 * da copy, à direita jogava prédio e mata por cima do ombro dele. A faixa
 * fica forte no MIOLO, que é o vão entre o texto e a foto, e recua nas duas
 * pontas.
 *
 * No CTA final o texto é centralizado, então lá não entra: recuar as pontas
 * ali deixaria a aquarela justamente atrás da manchete e do botão.
 */
const MASCARA_H =
  "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 24%, #000 45%, #000 70%, rgba(0,0,0,0.42) 100%)";

const MASCARA_CHEIA = "linear-gradient(#000 0 0)";

export default function AquarelaRio({
  className = "",
  opacidade = 0.3,
  prioridade = false,
  recuaNasPontas = false,
}: {
  className?: string;
  opacidade?: number;
  prioridade?: boolean;
  /** Enfraquece as duas pontas da faixa. Ver MASCARA_H. */
  recuaNasPontas?: boolean;
}) {
  /* As duas máscaras se multiplicam: `intersect` mantém o menor alpha dos
     dois gradientes em cada ponto. Sem o composite, a segunda apenas somaria
     e a faixa ficaria MAIS visível, que é o oposto do que se quer aqui.
     `source-in` é o nome do mesmo composite no prefixo -webkit. */
  const mascaras = `${MASCARA_V}, ${recuaNasPontas ? MASCARA_H : MASCARA_CHEIA}`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{
        WebkitMaskImage: mascaras,
        maskImage: mascaras,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <Image
        src="/fundo-hero.webp"
        alt=""
        width={1920}
        height={645}
        priority={prioridade}
        sizes="100vw"
        className="h-auto w-full"
        style={{ filter: MARCA_DAGUA, mixBlendMode: "screen", opacity: opacidade }}
      />
    </div>
  );
}
