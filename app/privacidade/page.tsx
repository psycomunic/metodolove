import type { Metadata } from "next";
import { marca } from "@/lib/content";
import Legal from "@/components/Legal";

export const metadata: Metadata = { title: "Política de privacidade" };

export default function Privacidade() {
  return (
    <Legal titulo="Política de privacidade">
      <p>
        Esta política explica como o site do {marca.nome} trata os dados de quem navega
        por aqui, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).
      </p>

      <h2>Quem é o controlador</h2>
      <p>
        {marca.razaoSocial}, CNPJ {marca.cnpj}. Contato para assuntos de privacidade:{" "}
        <a href={`mailto:${marca.email}`}>{marca.email}</a>.
      </p>

      <h2>Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>Dados de navegação:</strong> páginas visitadas, origem do acesso,
          dispositivo e navegador, coletados por cookies e ferramentas de medição.
        </li>
        <li>
          <strong>Dados de compra:</strong> nome, e-mail, telefone e dados de pagamento
          são coletados e processados pela plataforma de checkout, não por este site.
        </li>
      </ul>

      <h2>Para que usamos</h2>
      <ul>
        <li>Entregar o acesso ao curso e dar suporte a quem comprou.</li>
        <li>Medir o desempenho de campanhas e melhorar a página.</li>
        <li>Enviar comunicações sobre o produto, quando você autorizar.</li>
      </ul>

      <h2>Com quem compartilhamos</h2>
      <p>
        Com a plataforma de pagamento e entrega do curso, com ferramentas de análise e de
        anúncios, e com autoridades quando a lei exigir. Não vendemos dados pessoais.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Você pode pedir confirmação, acesso, correção, portabilidade, anonimização ou
        exclusão dos seus dados, além de revogar consentimento. Escreva para{" "}
        <a href={`mailto:${marca.email}`}>{marca.email}</a> e respondemos em até 15 dias.
      </p>

      <h2>Cookies</h2>
      <p>
        Usamos cookies próprios e de terceiros para lembrar preferências e medir
        campanhas. Você pode bloqueá-los nas configurações do navegador; algumas partes
        do site podem deixar de funcionar.
      </p>
    </Legal>
  );
}
