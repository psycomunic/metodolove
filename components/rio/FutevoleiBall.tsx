/**
 * Bola, sem marca nenhuma.
 *
 * Os gomos são a construção clássica: um pentágono no polo e cinco costuras
 * saindo dos vértices dele, curvando até a borda. Em silhueta de traço isso
 * basta para o olho fechar "bola de futebol" sem precisar desenhar os trinta
 * e dois painéis, que nesse tamanho viram sujeira.
 *
 * Dois elementos aninhados de propósito: o de fora boia e o de dentro gira.
 * Compor rotação e translação no mesmo nó faz a bola parecer que balança
 * presa a um fio, em vez de boiar.
 */
export default function FutevoleiBall({
  className = "",
  opacidade = 0.16,
}: {
  className?: string;
  opacidade?: number;
}) {
  return (
    <div className={`boia ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 120 120"
        className="gira h-full w-full"
        style={{ opacity: opacidade }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="60" cy="60" r="55" />
        {/* pentágono do polo */}
        <path d="M60,34 L78,47 L71,68 L49,68 L42,47 Z" />
        {/* costuras dos vértices até a borda */}
        <path d="M60,34 C60,26 60,18 60,5" />
        <path d="M78,47 C86,42 94,38 112,29" />
        <path d="M71,68 C78,76 84,84 95,101" />
        <path d="M49,68 C42,76 36,84 25,101" />
        <path d="M42,47 C34,42 26,38 8,29" />
        {/* segundo anel de gomos, sugerido pelas costuras que os fecham */}
        <path d="M60,5 C41,7 24,16 12,30" strokeOpacity="0.5" />
        <path d="M112,29 C118,45 118,66 111,82" strokeOpacity="0.5" />
        <path d="M95,101 C79,111 57,113 39,106" strokeOpacity="0.5" />
      </svg>
    </div>
  );
}
