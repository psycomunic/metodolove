import { hero, marca, oferta, provas } from "@/lib/content";
import { Contador, LinhasReveal } from "./movimento";
import { Botao, Check, Destaque, Pilula, Reveal, Rotulo } from "./ui";

/**
 * Hero de dobra única, conduzido pelas artes FUNDO-HERO-*.jpg.
 *
 * A foto é CAMADA DE COBERTURA, não uma placa em proporção natural: a versão
 * anterior respeitava o aspecto da imagem e, numa janela baixa, isso empurrava
 * a manchete para fora da primeira dobra. Aqui a seção manda (min-h-svh) e a
 * foto se ajusta por object-cover.
 *
 * O véu azul existe por medição, não por gosto: o mapa de luminância das duas
 * artes mostra a metade esquerda do desktop entre 170 e 255 — céu, areia e pôr
 * do sol. Texto branco cru ali seria ilegível. O gradiente varre da esquerda no
 * desktop (onde fica a escrita) e sobe de baixo no mobile (onde a arte já é
 * azul), sempre no mesmo #002F73 do rodapé das imagens, para não criar emenda.
 *
 * `svh` e não `vh`: no celular a barra de endereço do navegador entra na conta
 * do `vh` e cortaria o botão de compra na carga.
 */
export default function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-noite-800"
    >
      {/* ---------------- camada de foto ---------------- */}
      <div className="absolute inset-0 -z-10">
        <picture>
          <source media="(min-width: 768px)" srcSet="/FUNDO-HERO-DESKTOP.jpg" />
          <img
            src="/FUNDO-HERO-MOBILE.jpg"
            alt="Dupla de atletas em quadra de areia ao pôr do sol, com bola de futevôlei no alto"
            fetchPriority="high"
            decoding="async"
            // O enquadramento puxa para a direita porque é onde estão os
            // atletas: quando o corte vier pela largura, quem sai é a areia
            // vazia da esquerda, que é justamente onde o texto vai por cima.
            className="h-full w-full object-cover object-[54%_top] md:object-[72%_center]"
          />
        </picture>

        {/* Véu. Mobile sobe de baixo; a partir de md varre da esquerda. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#002F73_34%,rgba(0,47,115,0.98)_52%,rgba(0,47,115,0.9)_66%,rgba(0,47,115,0.6)_78%,rgba(0,47,115,0.18)_91%,transparent_100%)] md:bg-[linear-gradient(to_right,#002F73_3%,rgba(0,47,115,0.95)_28%,rgba(0,47,115,0.66)_46%,rgba(0,47,115,0.18)_64%,transparent_79%)]" />
        {/* Fecho inferior: garante o azul chapado na emenda com a próxima seção. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,#002F73)] md:h-44" />
      </div>

      {/* ---------------- conteúdo, centrado na dobra ---------------- */}
      {/* No mobile o conteúdo desce para o pé: o miolo da arte vertical é
          onde estão os atletas, e texto ali cai em cima dos rostos. A partir
          de md o texto é uma coluna à esquerda e centra na vertical. */}
      <div className="flex flex-1 items-end md:items-center">
        <div className="mx-auto w-full max-w-[80rem] px-5 pt-24 pb-7 sm:px-8 md:pt-20 md:pb-8">
          <div className="max-w-[45rem]">
            <Reveal>
              <Rotulo tom="claro">{hero.olho}</Rotulo>
            </Reveal>

            <h1 className="display mt-5 text-[clamp(2.2rem,7.4vw,4.4rem)] text-white">
              <LinhasReveal
                linhas={[
                  hero.linha1,
                  hero.linha2,
                  <Destaque key="destaque" cor="campo">
                    {hero.linha3Destaque}
                  </Destaque>,
                ]}
              />
            </h1>

            <Reveal atraso={120}>
              <p className="mt-5 max-w-[32rem] text-[0.98rem] leading-[1.6] text-bruma-200 sm:text-[1.05rem] md:mt-6">
                {hero.subtitulo}
              </p>
            </Reveal>

            <Reveal atraso={180}>
              <p className="mt-4 max-w-[32rem] border-l-[3px] border-sol-500 pl-4 text-[0.92rem] leading-[1.5] font-medium text-white">
                {hero.assinaturaSub}
                <span className="mt-1 block text-[0.76rem] font-normal text-bruma-300">
                  {marca.autor}, {marca.instagramHandle}
                </span>
              </p>
            </Reveal>

            <Reveal atraso={240}>
              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-7">
                <Botao href={marca.checkout} className="w-full sm:w-auto">
                  {hero.cta}
                </Botao>
                {/* Pílula vazada: parcelamento é dado de apoio, não segundo CTA.
                    Sai no celular para o texto não subir em cima dos rostos da
                    arte — e não se perde nada: o mesmo dado aparece na barra
                    fixa que sobe na rolagem e na seção de oferta. */}
                <span className="hidden sm:block">
                  <Pilula className="text-bruma-200">
                    <span className="text-white">
                      {oferta.parcelasQtd} de {oferta.parcelasValor}
                    </span>
                    <span className="h-4 w-px bg-current opacity-40" />
                    <span>{oferta.garantiaDias} dias de garantia</span>
                  </Pilula>
                </span>
              </div>
            </Reveal>

            {/* As notas somem em janela baixa: numa dobra apertada, quem tem de
                sobreviver é a manchete e o botão, não a lista de apoio. */}
            <Reveal atraso={300}>
              <ul className="mt-7 hidden flex-wrap gap-x-6 gap-y-2 min-[900px]:flex">
                {hero.notas.map((nota) => (
                  <li
                    key={nota}
                    className="flex items-center gap-2 text-[0.76rem] font-semibold text-bruma-200"
                  >
                    <Check className="h-4 w-4 text-sol-400" />
                    {nota}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------------- placar, ancorado no pé da dobra ---------------- */}
      <div className="relative border-t border-noite-600/40 bg-noite-900/85 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-[80rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {provas.map((item, i) => (
            <div
              key={item.rotulo}
              className={`py-2.5 md:py-4 lg:px-7 ${i % 2 === 1 ? "border-l border-noite-600/30 pl-5 lg:pl-7" : ""} ${
                i > 1 ? "border-t border-noite-600/30 lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:border-noite-600/30" : ""}`}
            >
              <dt className="placar text-[clamp(1.25rem,3.4vw,2.1rem)] text-sol-400">
                <Contador valor={item.valor} decimais={item.decimais} pad={item.pad} />
                {item.sufixo ? (
                  <span className="ml-1 text-[0.42em] text-white">{item.sufixo}</span>
                ) : null}
              </dt>
              <dd className="mt-0.5 max-w-[13rem] text-[0.64rem] leading-tight text-bruma-300 md:mt-1 md:text-[0.7rem]">
                {item.rotulo}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
