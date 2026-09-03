import type { Metadata } from "next";
import { marca, oferta } from "@/lib/content";
import Legal from "@/components/Legal";

export const metadata: Metadata = { title: "Termos de uso" };

export default function Termos() {
  return (
    <Legal titulo="Termos de uso">
      <p>
        Ao comprar o {marca.nome}, você concorda com as condições abaixo. Leia antes de
        finalizar a compra.
      </p>

      <h2>O que você está comprando</h2>
      <p>
        Um curso online de futevôlei, composto por aulas gravadas e materiais de apoio,
        com {oferta.acesso} a partir da confirmação do pagamento. O conteúdo é entregue em
        plataforma digital, sem envio de material físico.
      </p>

      <h2>Uso pessoal e intransferível</h2>
      <p>
        O acesso é individual. É proibido compartilhar login, gravar, redistribuir,
        revender ou exibir publicamente o conteúdo. O descumprimento encerra o acesso sem
        reembolso, sem prejuízo das medidas legais cabíveis.
      </p>

      <h2>Direito de arrependimento e reembolso</h2>
      <p>
        Conforme o art. 49 do Código de Defesa do Consumidor, você pode desistir da compra
        em até 7 dias corridos contados da confirmação do pagamento e receber o valor
        integral de volta. Nossa garantia é de {oferta.garantiaDias} dias. Basta escrever
        para <a href={`mailto:${marca.email}`}>{marca.email}</a>, sem necessidade de
        justificativa.
      </p>

      <h2>Resultados</h2>
      <p>
        O curso ensina técnica, preparo e estratégia. A evolução de cada aluno depende de
        dedicação, frequência de treino e condição física individual. Não prometemos nem
        garantimos desempenho esportivo, classificação em competições, renda ou retorno
        financeiro.
      </p>

      <h2>Saúde</h2>
      <p>
        Atividade física tem riscos. Procure orientação médica antes de iniciar os
        treinos. O {marca.nome} não presta serviço de saúde e não substitui acompanhamento
        profissional presencial.
      </p>

      <h2>Alterações</h2>
      <p>
        Podemos atualizar o conteúdo e estes termos. Mudanças relevantes serão comunicadas
        aos alunos pelo e-mail cadastrado.
      </p>

      <h2>Foro</h2>
      <p>
        Fica eleito o foro da comarca do domicílio do consumidor para resolver questões
        decorrentes destes termos.
      </p>
    </Legal>
  );
}
