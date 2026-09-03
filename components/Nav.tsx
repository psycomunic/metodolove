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
        <div className="fio border-b bg-areia-100/94 backdrop-blur-md">
          <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-4 px-5 py-3 sm:px-8">
            <a href="#topo" className="display text-2xl leading-none text-tinta">
              {marca.nomeCurto}
            </a>

            <nav className="hidden items-center gap-8 text-[0.82rem] font-semibold text-tinta/70 lg:flex">
              <a className="transition-colors hover:text-sol-600" href="#metodo">
                O método
              </a>
              <a className="transition-colors hover:text-sol-600" href="#charllove">
                Quem ensina
              </a>
              <a className="transition-colors hover:text-sol-600" href="#oferta">
                Investimento
              </a>
              <a className="transition-colors hover:text-sol-600" href="#duvidas">
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
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-mar-800 bg-mar-950/97 px-4 py-3 backdrop-blur-md transition-transform duration-400 ease-out sm:hidden ${
          preso ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="leading-tight">
            <p className="text-[0.62rem] font-bold tracking-[0.16em] text-mar-300 uppercase">
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
