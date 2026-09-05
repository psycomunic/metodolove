"use client";

import { useEffect, useState } from "react";
import { marca, oferta } from "@/lib/content";
import { Botao } from "./ui";

/**
 * Barra fixa de compra, só no celular.
 *
 * Aparece depois do hero (antes disso o CTA do hero está na tela, e duas
 * chamadas iguais competindo é ruído) e some enquanto a seção de oferta está
 * visível, porque ali o botão grande já é o elemento principal e a barra
 * cobriria justamente o preço.
 *
 * O padding de baixo respeita a safe area do iPhone, senão a barra fica atrás
 * do indicador de home.
 */
export default function StickyCta() {
  const [visivel, setVisivel] = useState(false);
  const [naOferta, setNaOferta] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 620);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    const alvo = document.getElementById("oferta");
    if (!alvo) return;
    const obs = new IntersectionObserver(([e]) => setNaOferta(e.isIntersecting), {
      threshold: 0.12,
    });
    obs.observe(alvo);
    return () => obs.disconnect();
  }, []);

  const mostra = visivel && !naOferta;

  return (
    <div
      aria-hidden={!mostra}
      className={`fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-line bg-void/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-[16px] transition-transform duration-400 ease-out sm:hidden ${
        mostra ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <p className="leading-tight">
        <span className="placar block text-[1.35rem] text-ink">
          {oferta.parcelasQtd} {oferta.parcelasValor}
        </span>
        <span className="mono text-[0.6rem] text-mute">ou {oferta.preco} à vista</span>
      </p>

      <Botao href={marca.checkout} tamanho="md" className="shrink-0">
        Quero entrar
      </Botao>
    </div>
  );
}
