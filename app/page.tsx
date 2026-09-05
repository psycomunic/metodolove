import Autor from "@/components/Autor";
import BarraUrgencia from "@/components/BarraUrgencia";
import CtaFinal from "@/components/CtaFinal";
import Depoimentos from "@/components/Depoimentos";
import Dor from "@/components/Dor";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Mecanismo from "@/components/Mecanismo";
import Mercado from "@/components/Mercado";
import Modulos from "@/components/Modulos";
import { BarraProgresso } from "@/components/movimento";
import Nav from "@/components/Nav";
import Oferta from "@/components/Oferta";
import Publico from "@/components/Publico";
import Rodape from "@/components/Rodape";
import StickyCta from "@/components/StickyCta";

/**
 * Ordem da página.
 *
 * Dor antes de mercado, mercado antes de mecanismo, mecanismo antes de
 * módulos: quem chega do Instagram precisa se reconhecer no problema, ver que
 * ele tem tamanho de mercado e entender POR QUE este produto resolve, antes
 * de olhar a lista do que vem na caixa. Índice não vende; reconhecimento sim.
 *
 * A oferta vem depois do filtro (pra quem é / não é) de propósito: a última
 * coisa que a pessoa lê antes do preço é o convite para desistir. Quem passa
 * por esse filtro e chega no botão compra com muito menos reembolso.
 *
 * Os depoimentos entram entre o autor e o filtro, e não colados na oferta,
 * justamente para não furar essa regra: prova social logo depois de quem
 * ensina, e o convite para desistir seguindo como a última coisa antes do
 * preço. Hoje a seção não aparece, porque não há depoimento real autorizado
 * ainda (ver `depoimentos` em lib/content.ts).
 */
export default function Home() {
  return (
    <>
      <BarraProgresso />
      <BarraUrgencia />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Dor />
        <Mercado />
        <Mecanismo />
        <Modulos />
        <Autor />
        <Depoimentos />
        <Publico />
        <Oferta />
        <Faq />
        <CtaFinal />
      </main>
      <Rodape />
      <StickyCta />
    </>
  );
}
