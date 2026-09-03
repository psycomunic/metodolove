import { autor, marca } from "@/lib/content";
import { LinhaDagua } from "./art";
import { Desmascara, Deriva } from "./movimento";
import { Foto, Reveal, Rotulo } from "./ui";

export default function Autor() {
  return (
    <section
      id="charllove"
      className="grao relative overflow-hidden bg-noite-950 py-24 text-areia-100 sm:py-32"
    >
      <Deriva velocidade={50} className="absolute inset-x-0 top-12">
        <LinhaDagua className="balanca h-6 w-full text-noite-600" />
      </Deriva>

      <div className="relative z-10 mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <Reveal className="mx-auto w-full max-w-[21rem] lg:max-w-none">
            {/* Colagem fornecida pelo cliente: DECA 7, pódio, quadra e aula.
                Vale mais que um retrato porque mostra o percurso, que é
                exatamente o que o texto ao lado conta. */}
            <Desmascara className="elevado relative aspect-2/3 overflow-hidden">
              <Foto
                src={autor.foto}
                alt={`${autor.nome}, criador do ${marca.nome}`}
                arte={autor.fotoArte}
              />
            </Desmascara>
            <p className="rotulo mt-5 text-noite-500">{marca.instagramHandle}</p>
          </Reveal>

          <div>
            <Reveal>
              <Rotulo tom="claro">{autor.olho}</Rotulo>
            </Reveal>
            <Reveal atraso={70}>
              <h2 className="display mt-6 text-[clamp(2.34rem,7.02vw,4.06rem)] text-areia-50">
                {autor.nome}
              </h2>
              <p className="mt-3 text-[0.88rem] font-semibold text-bruma-300">
                {autor.cargo}
              </p>
            </Reveal>

            <div className="mt-9 max-w-[38rem] space-y-5">
              {autor.paragrafos.map((p, i) => (
                <Reveal as="p" key={i} atraso={120 + i * 70}>
                  <span
                    className={
                      i === 0
                        ? "block text-[1.16rem] leading-[1.58] font-medium text-areia-100"
                        : "block text-[0.99rem] leading-[1.72] text-areia-200/70"
                    }
                  >
                    {p}
                  </span>
                </Reveal>
              ))}
            </div>

            {/* A tese do produto na voz dele. Fica DEPOIS da história porque
                só faz sentido depois de saber de onde ele veio: é a conclusão
                da trajetória, não uma frase de efeito solta. */}
            <Reveal atraso={330}>
              <blockquote className="mt-10 border-l-[3px] border-sol-500 pl-5">
                <p className="display text-[clamp(1.3rem,3vw,1.85rem)] text-areia-50">
                  {autor.citacao}
                </p>
              </blockquote>
            </Reveal>

            <Reveal atraso={400}>
              <p className="display mt-8 border-t border-noite-800 pt-6 text-[1.6rem] text-noite-500">
                {autor.assinatura}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
