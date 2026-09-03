import type { ReactNode } from "react";
import { marca } from "@/lib/content";

/** Casca das páginas legais. Mesma tipografia, densidade de leitura. */
export default function Legal({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-areia-100">
      <header className="border-b fio">
        <div className="mx-auto flex max-w-[46rem] items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="display text-2xl text-tinta">
            {marca.nomeCurto}
          </a>
          <a
            href="/"
            className="text-[0.82rem] font-semibold text-tinta/60 transition-colors hover:text-sol-600"
          >
            ← Voltar
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[46rem] px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="display text-[clamp(2.2rem,7vw,3.2rem)] text-tinta">{titulo}</h1>
        <p className="rotulo mt-4 text-mar-600">
          Atualizado em {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </p>

        <div className="mt-12 space-y-5 text-[0.98rem] leading-[1.75] text-tinta/75 [&_a]:font-semibold [&_a]:text-mar-600 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-11 [&_h2]:mb-3 [&_h2]:text-[1.15rem] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-tinta [&_li]:pl-1 [&_strong]:text-tinta [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-5">
          {children}
        </div>

        <p className="mt-16 border-t fio pt-8 text-[0.8rem] leading-relaxed text-tinta/45">
          Este texto é um ponto de partida gerado para o site. Peça a um advogado que
          revise antes de publicar — as obrigações mudam conforme a sua operação.
        </p>
      </main>
    </div>
  );
}
