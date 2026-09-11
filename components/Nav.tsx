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
 * TRANSPARENTE no topo, VIDRO ao rolar, e não o contrário. Antes ela já
 * chegava com fundo e terminava quase sólida; agora sobre o hero ela não tem
 * pílula nenhuma, só o logo e o botão flutuando, e a foto chega inteira à
 * borda de cima. Ao sair do hero ela materializa: fundo translúcido, desfoque
 * e o fio de 1px de volta, para não deixar palavra passando por baixo.
 *
 * O desfoque só existe depois que ela materializa. `backdrop-filter` ligado o
 * tempo todo cria camada de composição na GPU mesmo quando não há nada para
 * desfocar, e isso pesa justamente na rolagem do celular, que é onde a página
 * precisa ser leve.
 *
 * Quem segura a legibilidade do logo no topo, contra o céu claro da foto, é o
 * véu escuro no alto do hero, e não a nav. Ver `Hero`.
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

  /* No celular a pílula chega mais perto da borda (px-2 fora e px-2 dentro,
     contra px-3 e px-3 de antes): são 8px de cada lado devolvidos, e é o que
     empurra o botão para a direita. No sm para cima nada muda.
  
     A ALTURA É FIXA em h-14 abaixo do lg, e não sobra do conteúdo. O hero é
     puxado para trás desta barra por margem negativa, e as duas medidas
     precisam bater: com altura automática, mexer no tamanho do logo ou do
     botão mudava a altura da nav e a margem do hero passava a errar, ora
     deixando um fio do fundo aparecer, ora comendo o topo da foto. Com h-14
     dos dois lados, o hero usa -mt-14 e elas não têm como divergir. */
  return (
    <div className="sticky top-3 z-50 flex h-14 items-center px-2 sm:top-4 sm:px-5 lg:block lg:h-auto">
      <div
        className={`mx-auto flex max-w-[60rem] items-center justify-between gap-3 rounded-full border px-2 py-2 transition-[background-color,border-color,backdrop-filter] duration-500 sm:gap-4 sm:px-4 ${
          rolou
            ? "border-line bg-navy/70 backdrop-blur-[18px]"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#topo" className="shrink-0 pl-1" aria-label={marca.nome}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-llove.png"
            alt={marca.nome}
            width={360}
            height={64}
            className="h-6 w-auto sm:h-8"
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

        <Botao
          href={marca.checkout}
          tamanho="xs"
          className="shrink-0 sm:px-4 sm:py-2.5 sm:text-[0.72rem]"
        >
          {ctaNav}
        </Botao>
      </div>
    </div>
  );
}
