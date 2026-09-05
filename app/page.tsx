import Autor from "@/components/Autor";
import BarraUrgencia from "@/components/BarraUrgencia";
import CtaFinal from "@/components/CtaFinal";
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
import Emenda from "@/components/rio/Emenda";
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
        {/* Areia para creme: o calçadão navy faz a passagem. */}
        <Emenda fundo="bg-areia" tom="text-navy" />
        <Mecanismo />
        {/* Creme para navy: o mesmo desenho, agora em areia sobre o escuro. */}
        <Emenda fundo="bg-navy" tom="text-areia" opacidade={0.5} />
        <Modulos />
        <Emenda fundo="bg-navy" tom="text-areia" opacidade={0.5} />
        <Autor />
        <Publico />
        {/* Areia para o escuro da oferta. */}
        <Emenda fundo="bg-areia" tom="text-navy" />
        <Oferta />
        {/* Escuro para o creme do FAQ, e o creme de volta para o escuro do
            fechamento. Toda troca de família passa pelo calçadão: corte reto
            entre claro e escuro lê como duas páginas coladas. */}
        <Emenda fundo="bg-void" tom="text-areia" opacidade={0.5} />
        <Faq />
        <Emenda fundo="bg-creme" tom="text-navy" />
        <CtaFinal />
      </main>
      <Rodape />
      <StickyCta />
    </>
  );
}
