"use client";

import { useEffect, useState } from "react";
import { ctaNav, marca, menu } from "@/lib/content";
import { Botao } from "./ui";

/**
 * Pílula flutuante.
 *
 * É `sticky`, não `fixed`: assim ela entra no fluxo logo abaixo da barra de
 * urgência e sobe sozinha quando a barra sai de cena, sem eu precisar medir a
 * altura da barra (que quebra em duas linhas no celular). Para isso o body usa
 * `overflow-x: clip` e não `hidden`, que criaria um contêiner de rolagem e
 * mataria o sticky.
 *
 * Translúcida no topo, sólida ao rolar: sobre o hero ela some no fundo, e
 * sobre texto ela ganha corpo para não deixar palavra passando por baixo.
 *
 * No celular ela é só logo mais botão de compra. Sem hambúrguer: o menu tem
 * quatro âncoras da própria página, e numa landing de rolagem única um menu
 * escondido atrás de um ícone só acrescenta um toque para chegar onde a
 * rolagem já leva.
 */
export default function Nav() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 240);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <div className="sticky top-3 z-50 px-3 sm:top-4 sm:px-5">
      <div
        className={`mx-auto flex max-w-[60rem] items-center justify-between gap-3 rounded-full border border-line px-3 py-2 backdrop-blur-[16px] transition-colors duration-500 sm:gap-4 sm:px-4 ${
          rolou ? "bg-navy/92" : "bg-navy/55"
        }`}
      >
        <a href="#topo" className="shrink-0 pl-1" aria-label={marca.nome}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-llove.png"
            alt={marca.nome}
            width={360}
            height={64}
            className="h-5 w-auto sm:h-7"
          />
        </a>

        <nav className="hidden items-center gap-7 text-[0.8rem] font-medium text-mute lg:flex">
          {menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-ink"
            >
              {item.rotulo}
            </a>
          ))}
        </nav>

        <Botao href={marca.checkout} tamanho="sm" className="shrink-0">
          {ctaNav}
        </Botao>
      </div>
    </div>
  );
}
