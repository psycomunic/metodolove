import { marca } from "@/lib/content";

export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-noite-800 bg-noite-950 px-5 pt-16 pb-28 text-areia-200/60 sm:px-8 sm:pb-16">
      <div className="mx-auto max-w-[80rem]">
        <div className="flex flex-col gap-10 border-b border-noite-800 pb-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="display text-3xl text-areia-100">{marca.nomeCurto}</p>
            <p className="mt-3 max-w-[24rem] text-[0.85rem] leading-relaxed">
              Método completo de futevôlei, do primeiro toque à quadra profissional.
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-[0.85rem] md:items-end">
            <a className="transition-colors hover:text-sol-400" href="#metodo">
              O método
            </a>
            <a className="transition-colors hover:text-sol-400" href="#oferta">
              Investimento
            </a>
            <a className="transition-colors hover:text-sol-400" href="#duvidas">
              Dúvidas
            </a>
            <a
              className="transition-colors hover:text-sol-400"
              href={marca.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {marca.instagramHandle}
            </a>
            <a
              className="transition-colors hover:text-sol-400"
              href={`mailto:${marca.email}`}
            >
              {marca.email}
            </a>
          </nav>
        </div>

        {/* Aviso legal — exigido pelo Meta e recomendado pelo CDC. */}
        <div className="mt-8 space-y-4 text-[0.74rem] leading-relaxed text-areia-200/40">
          <p>
            <strong className="font-semibold text-areia-200/60">
              Aviso sobre resultados.
            </strong>{" "}
            O {marca.nome} é um curso de treinamento esportivo. Os resultados dependem da
            dedicação, da frequência de treino e das condições físicas de cada aluno. Não
            há promessa nem garantia de desempenho atlético, classificação em competições,
            renda ou retorno financeiro.
          </p>
          <p>
            Antes de iniciar qualquer programa de treinamento físico, procure orientação
            médica. Este site não presta serviço de saúde nem substitui acompanhamento
            profissional presencial.
          </p>
          <p>
            Este site não é afiliado ao Facebook, ao Instagram ou à Meta Platforms, Inc.
          </p>
          <div className="flex flex-col gap-2 border-t border-noite-800/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {ano} {marca.razaoSocial} · CNPJ {marca.cnpj}
            </p>
            <div className="flex gap-5">
              <a className="transition-colors hover:text-sol-400" href="/privacidade">
                Política de privacidade
              </a>
              <a className="transition-colors hover:text-sol-400" href="/termos">
                Termos de uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
