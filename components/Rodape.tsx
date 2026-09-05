import { marca, menu } from "@/lib/content";
import CalcadaoWaves from "./rio/CalcadaoWaves";
import Monograma from "./rio/Monograma";

/**
 * Rodapé.
 *
 * O aviso legal não é enfeite: o produto é treinamento esportivo, e a página
 * não pode prometer desempenho, colocação ou renda (CDC art. 37 e política do
 * Meta Ads). Não remova esses três parágrafos.
 *
 * O padding de baixo é maior no celular por causa da barra fixa de compra,
 * que cobriria a última linha.
 *
 * O monograma e as coordenadas fecham a página como estúdio assina projeto:
 * discreto, no pé, e sem explicar. Quem é do Rio reconhece a latitude.
 */
export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-navy px-5 pt-14 pb-32 text-center sm:px-8 sm:pt-16 sm:pb-16 sm:text-left">
      <CalcadaoWaves className="absolute inset-x-0 top-0 text-ink" opacidade={0.06} />

      <div className="mx-auto max-w-[80rem]">
        <div className="flex flex-col gap-8 border-b border-line pb-9 sm:gap-10 sm:pb-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Monograma className="mx-auto h-14 w-auto text-ink sm:mx-0" />
            <p className="mx-auto mt-4 max-w-[24rem] text-[1rem] leading-relaxed text-mute sm:text-[0.9rem]">
              {marca.resumo}
            </p>
            <p className="mono mt-4 text-[0.75rem] text-fraco sm:text-[0.62rem]">
              {marca.coordenadas}
            </p>
          </div>

          <nav className="flex flex-col gap-3 text-[1rem] text-mute sm:text-[0.85rem] md:items-end">
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
        <div className="mt-8 space-y-4 text-left text-[0.8125rem] leading-relaxed text-fraco sm:text-[0.74rem]">
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

          <div className="mono flex flex-col gap-3 border-t border-line pt-6 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between sm:text-[0.6rem]">
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
