import { marca, menu } from "@/lib/content";

/**
 * Rodapé.
 *
 * O aviso legal não é enfeite: o produto é treinamento esportivo, e a página
 * não pode prometer desempenho, colocação ou renda (CDC art. 37 e política do
 * Meta Ads). Não remova esses três parágrafos.
 *
 * O padding de baixo é maior no celular por causa da barra fixa de compra,
 * que cobriria a última linha.
 */
export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-navy px-5 pt-16 pb-36 sm:px-8 sm:pb-16">
      <div className="mx-auto max-w-[80rem]">
        <div className="flex flex-col gap-10 border-b border-line pb-10 md:flex-row md:items-start md:justify-between">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-llove.png"
              alt={marca.nome}
              width={360}
              height={64}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-[24rem] text-[0.9rem] leading-relaxed text-mute">
              {marca.resumo}
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-[0.85rem] text-mute md:items-end">
            {menu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-ink"
              >
                {item.rotulo}
              </a>
            ))}
            <a
              className="transition-colors hover:text-ink"
              href={marca.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {marca.instagramHandle}
            </a>
            <a
              className="transition-colors hover:text-ink"
              href={`mailto:${marca.email}`}
            >
              {marca.email}
            </a>
          </nav>
        </div>

        {/* Aviso legal. Exigido pelo Meta e recomendado pelo CDC. */}
        <div className="mt-8 space-y-4 text-[0.74rem] leading-relaxed text-fraco">
          <p>
            <strong className="font-semibold text-mute">Aviso sobre resultados.</strong> O{" "}
            {marca.nome} é um curso de treinamento esportivo. Os resultados dependem da
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

          <div className="mono flex flex-col gap-3 border-t border-line pt-6 text-[0.6rem] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {ano} {marca.razaoSocial} · CNPJ {marca.cnpj}
            </p>
            <div className="flex gap-5">
              <a className="transition-colors hover:text-ink" href="/privacidade">
                Política de privacidade
              </a>
              <a className="transition-colors hover:text-ink" href="/termos">
                Termos de uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
