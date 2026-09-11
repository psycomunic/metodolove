import { urgencia } from "@/lib/content";

/**
 * Barra de urgência honesta.
 *
 * Não tem contador regressivo, e é esse o ponto: a página inteira se vende
 * como a que não promete o que não cumpre, e um relógio falso no topo
 * derrubaria a tese antes do primeiro parágrafo. A escassez aqui é
 * verificável, porque o preço de lançamento realmente sobe quando entrarem
 * os primeiros depoimentos.
 *
 * Fica no fluxo, não fixa: é contexto de chegada, não aviso permanente.
 *
 * ELA MUDA DE LUGAR no celular, e por isso recebe o posicionamento de fora.
 * No desktop segue no topo. No celular ia para cima do hero três linhas de
 * texto corrido, empurrando foto e manchete para baixo da dobra, e o cliente
 * reprovou em set/2026. Lá ela desceu para logo antes da oferta.
 *
 * O que ela NÃO pode é sumir: esta frase é o único lugar da página inteira
 * que explica por que o preço é o que é, e sem ela a invariante da escassez
 * honesta fica sem enunciado. Ao lado do preço ela até trabalha melhor, que é
 * onde a pessoa pergunta "por que tão barato?".
 */
export default function BarraUrgencia({ className = "" }: { className?: string }) {
  return (
    <div className={`border-line bg-card ${className}`}>
      <p className="mx-auto max-w-[74rem] px-5 py-2.5 text-center text-[0.875rem] leading-[1.6] text-mute sm:px-8 sm:text-[0.82rem]">
        {urgencia}
      </p>
    </div>
  );
}
