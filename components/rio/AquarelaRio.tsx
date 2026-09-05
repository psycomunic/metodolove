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
 * A imagem é sempre `w-full`, nunca com largura mínima. Assim ela nunca é
 * recortada, e a posição de qualquer ponto do desenho (o Corcovado, por
 * exemplo) pode ser calculada em porcentagem da própria faixa.
 */

const MARCA_DAGUA =
  "invert(1) sepia(1) hue-rotate(176deg) saturate(2.6) brightness(0.92) contrast(1.05)";

/* O desenho ocupa a faixa central do arquivo: há margem branca em cima e nas
   pontas. Como o branco vira preto e o preto some no screen, a máscara só
   precisa suavizar o topo, para a aquarela nascer do navy em vez de começar
   numa linha. */
const MASCARA =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, #000 46%, #000 100%)";

export default function AquarelaRio({
  className = "",
  opacidade = 0.3,
  prioridade = false,
}: {
  className?: string;
  opacidade?: number;
  prioridade?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{
        WebkitMaskImage: MASCARA,
        maskImage: MASCARA,
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
