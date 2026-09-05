import Link from "next/link";
import type { ReactNode } from "react";
import { marca } from "@/lib/content";

/**
 * Casca das páginas legais.
 *
 * Mesmo navy da landing, mas com medida de leitura estreita e nenhum acento
 * verde além do link: aqui ninguém compra nada, e um CTA verde no meio de um
 * termo de uso só confunde.
 */
export default function Legal({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[46rem] items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="display text-2xl text-ink">
            {marca.nomeCurto}
          </Link>
          <Link
            href="/"
            className="mono text-[0.66rem] text-mute transition-colors hover:text-ink"
          >
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[46rem] px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="display text-[clamp(2rem,6vw,3rem)] text-ink">{titulo}</h1>
        <p className="mono mt-4 text-[0.66rem] text-mute">
          Atualizado em{" "}
          {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </p>

        <div className="mt-12 space-y-5 text-[0.98rem] leading-[1.75] text-mute [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-11 [&_h2]:mb-3 [&_h2]:text-[1.15rem] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-5">
          {children}
        </div>

        <p className="mt-16 border-t border-line pt-8 text-[0.8rem] leading-relaxed text-fraco">
          Este texto é um ponto de partida gerado para o site. Peça a um advogado que
          revise antes de publicar. As obrigações mudam conforme a sua operação.
        </p>
      </main>
    </div>
  );
}
