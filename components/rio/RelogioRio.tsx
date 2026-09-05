"use client";

import { useEffect, useState } from "react";

/**
 * A hora do Rio, andando no rodapé ao lado das coordenadas.
 *
 * É assinatura de estúdio, não utilidade: ninguém precisa saber que horas são
 * em Copacabana para comprar o curso. Serve para dizer que a página é feita de
 * um lugar, e que esse lugar existe agora.
 *
 * Fixo em America/Sao_Paulo, e não no fuso de quem visita: a hora que importa
 * é a da areia onde o método nasceu.
 *
 * Começa vazio e só preenche depois de montar. O relógio é o exemplo clássico
 * de coisa que o servidor renderiza diferente do cliente, e um mismatch de
 * hidratação aqui derrubaria a árvore inteira por causa de um enfeite.
 */
export default function RelogioRio({ className = "" }: { className?: string }) {
  const [hora, setHora] = useState("");

  useEffect(() => {
    const formata = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const marca = () => setHora(formata.format(new Date()));
    marca();
    const id = setInterval(marca, 15_000);
    return () => clearInterval(id);
  }, []);

  // Sem a hora ainda, o espaço fica reservado para a linha não pular quando
  // ela chega.
  return (
    <span className={className} suppressHydrationWarning>
      {hora ? `${hora} agora` : " "}
    </span>
  );
}
