/**
 * Monograma: LLOVE assentado sobre o contorno do Pão de Açúcar.
 *
 * A curva não é enfeite colado embaixo da palavra: ela é a linha de base do
 * lettering, e os dois cumes nascem dela sem levantar a caneta. É o que separa
 * um monograma de um logo com um desenho por baixo.
 *
 * O lettering usa a face de display do site em vez de virar path: no rodapé a
 * fonte já está carregada, e converter cinco letras em contorno engorda o
 * bundle sem ganho nenhum. O favicon, que não tem fonte, é a marca sem texto,
 * em `app/icon.svg`.
 */
export default function Monograma({
  className = "",
  titulo = "Método LLOVE",
}: {
  className?: string;
  titulo?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 100"
      role="img"
      aria-label={titulo}
      className={className}
      fill="none"
    >
      <text
        x="120"
        y="46"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="50"
        letterSpacing="1.5"
      >
        LLOVE
      </text>
      {/* Morro da Urca à esquerda, menor; Pão de Açúcar à direita, mais alto e
          de cume arredondado: a mesma hierarquia do desenho grande.
          Os dois cumes ficam ABAIXO da linha de base do lettering; subindo
          mais, cortam as letras. */}
      <path
        d="M6,88 L48,88
           C60,88 70,84 79,78 C86,73 92,70 99,71
           C107,72 114,77 120,84
           C128,75 137,64 150,58 C165,51 181,54 191,64
           C200,73 205,80 208,88
           L234,88"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
