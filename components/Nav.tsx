"use client";

import { useEffect, useState } from "react";
import { marca, oferta } from "@/lib/content";
import { Botao } from "./ui";

export default function Nav() {
  const [preso, setPreso] = useState(false);

  useEffect(() => {
    const aoRolar = () => setPreso(window.scrollY > 700);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-400 ease-out ${
          preso ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="border-b border-white/10 bg-noite-900/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-4 px-5 py-3 sm:px-8">
            {/* Logo oficial. Antes era o nome em tipografia, que competia com
                o lettering da marca sem ser ele. */}
            <a href="#topo" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-llove.png"
                alt={marca.nome}
                width={360}
                height={64}
                className="h-8 w-auto sm:h-9"
              />
            </a>

            <nav className="hidden items-center gap-8 text-[0.82rem] font-semibold text-bruma-200 lg:flex">
              <a className="transition-colors hover:text-sol-400" href="#metodo">
                O método
              </a>
              <a className="transition-colors hover:text-sol-400" href="#charllove">
                Quem ensina
              </a>
              <a className="transition-colors hover:text-sol-400" href="#oferta">
                Investimento
              </a>
              <a className="transition-colors hover:text-sol-400" href="#duvidas">
                Dúvidas
              </a>
            </nav>

            <Botao href={marca.checkout} tamanho="md" className="shrink-0">
              <span className="hidden sm:inline">Quero entrar</span>
              <span className="sm:hidden">Entrar</span>
            </Botao>
          </div>
        </div>
      </header>

      {/* barra fixa de conversão — celular */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-noite-800 bg-noite-950/97 px-4 py-3 backdrop-blur-md transition-transform duration-400 ease-out sm:hidden ${
          preso ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="leading-tight">
            <p className="text-[0.62rem] font-bold tracking-[0.16em] text-bruma-300 uppercase">
              {oferta.parcelasQtd} de {oferta.parcelasValor}
            </p>
            <p className="text-sm font-bold text-areia-100">ou {oferta.preco} à vista</p>
          </div>
          <Botao href={marca.checkout} tamanho="md" className="shrink-0">
            Garantir vaga
          </Botao>
        </div>
      </div>
    </>
  );
}
