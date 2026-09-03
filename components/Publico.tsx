import { publico } from "@/lib/content";
import { CabecalhoSecao, Check, Reveal } from "./ui";

/**
 * Os dois lados da quadra.
 *
 * Até set/2026 esta seção eram duas listas de texto corrido sobre papel, com
 * um fio no meio: o conteúdo era bom e não parecia decidido por ninguém. Agora
 * os dois lados são materialmente diferentes — quem entra fica no papel claro,
 * quem não entra fica do lado marinho. A oposição é o assunto da seção, então
 * ela precisa ser visível antes de qualquer palavra ser lida.
 *
 * O remate ("prefiro perder a venda…") mora no lado marinho porque é sobre
 * quem NÃO deve comprar. Solto no cabeçalho, ele boiava.
 */
export default function Publico() {
  return (
    <section className="bg-areia-100 py-14 sm:py-20">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <CabecalhoSecao
          rotulo="Antes de você decidir"
          titulo={
            <h2 className="display mt-6 max-w-[24rem] text-[clamp(1.87rem,5.46vw,2.96rem)] text-tinta">
              Isso aqui não é<span className="block text-noite-600">pra todo mundo.</span>
            </h2>
          }
          texto="Duas listas curtas. Se você se reconhecer na da esquerda, o método foi feito pra você. Se se reconhecer na da direita, economize seu dinheiro."
        />

        <div className="mt-12 grid items-stretch gap-px sm:mt-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ---------------- lado de dentro ---------------- */}
          <Reveal atraso={110} className="h-full">
            <div className="fio h-full border p-7 sm:p-9">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="rotulo text-noite-600">É pra você se…</h3>
                <span className="placar text-[1.6rem] text-areia-300">
                  {String(publico.eh.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="fio mt-6 border-t">
                {publico.eh.map((item) => (
                  <li
                    key={item}
                    className="fio flex gap-4 border-b py-4 text-[1rem] leading-[1.45] font-medium text-tinta last:border-b-0"
                  >
                    <Check className="mt-0.5 h-5 w-5 text-noite-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ---------------- lado de fora ---------------- */}
          <Reveal atraso={180} className="h-full">
            <div className="flex h-full flex-col bg-noite-900 p-7 text-bruma-200 sm:p-9">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="rotulo text-bruma-400">Não é pra você se…</h3>
                <span className="placar text-[1.6rem] text-white/20">
                  {String(publico.naoEh.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-6 border-t border-white/12">
                {publico.naoEh.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-white/12 py-4 text-[0.95rem] leading-[1.45] last:border-b-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-5 w-5 shrink-0 text-bruma-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-8 text-[1.02rem] leading-[1.5] font-medium text-areia-100">
                {publico.remate}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
