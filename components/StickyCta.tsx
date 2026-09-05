"use client";

import { useEffect, useState } from "react";
import { ctaBarraFixa, marca, oferta } from "@/lib/content";
import { Botao } from "./ui";

/**
 * Barra fixa de compra, só no celular. 64px de altura, preço à esquerda,
 * botão de compra à direita.
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
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-void/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-[16px] transition-transform duration-400 ease-out sm:hidden ${
        mostra ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* `min-w-0` no preço: sem ele o bloco de texto se recusa a encolher e
          empurra o botão para fora da tela num iPhone SE de 360px, criando
          rolagem horizontal na página inteira. */}
      <div className="flex h-16 items-center justify-between gap-3 px-4">
        <p className="min-w-0 leading-tight">
          <span className="placar block text-[1.15rem] text-ink">
            {oferta.parcelasQtd} {oferta.parcelasValor}
          </span>
          {/* Só "ou R$ 297,90": a barra tem 64px e uns 146px de texto úteis
              num aparelho de 360px, e "à vista" não cabe a 13px sem espremer
              o rótulo abaixo do piso de legibilidade. */}
          <span className="mono text-[0.8125rem] text-mute">ou {oferta.preco}</span>
        </p>

        <Botao href={marca.checkout} tamanho="sm" className="shrink-0">
          {ctaBarraFixa}
        </Botao>
      </div>
    </div>
  );
}
