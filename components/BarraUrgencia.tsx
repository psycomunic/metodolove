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
 */
export default function BarraUrgencia() {
  return (
    <div className="escuro border-b border-fio-areia bg-void">
      <p className="mx-auto max-w-[74rem] px-5 py-2.5 text-center text-[0.875rem] leading-[1.6] text-mute sm:px-8 sm:text-[0.82rem]">
        {urgencia}
      </p>
    </div>
  );
}
