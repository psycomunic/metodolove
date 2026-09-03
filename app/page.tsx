import Autor from "@/components/Autor";
import Bonus from "@/components/Bonus";
import CtaFinal from "@/components/CtaFinal";
import Depoimentos from "@/components/Depoimentos";
import Faixa from "@/components/Faixa";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Metodo from "@/components/Metodo";
import Nav from "@/components/Nav";
import Oferta from "@/components/Oferta";
import Problema from "@/components/Problema";
import Publico from "@/components/Publico";
import Rodape from "@/components/Rodape";

/**
 * Ordem da página: o problema e a história vêm ANTES do conteúdo do curso.
 * Quem chega do Instagram precisa se reconhecer antes de ver módulos.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Autor />
        <Faixa />
        <Metodo />
        <Publico />
        <Bonus />
        <Depoimentos />
        <Oferta />
        <Faq />
        <CtaFinal />
      </main>
      <Rodape />
    </>
  );
}
