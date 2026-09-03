import { autor, marca } from "@/lib/content";
import { LinhaDagua } from "./art";
import { Desmascara, Deriva } from "./movimento";
import { Foto, Reveal, Rotulo } from "./ui";

export default function Autor() {
  return (
    <section
      id="charllove"
      className="grao relative overflow-hidden bg-mar-950 py-24 text-areia-100 sm:py-32"
    >
      <Deriva velocidade={50} className="absolute inset-x-0 top-12">
        <LinhaDagua className="balanca h-6 w-full text-mar-600" />
      </Deriva>

      <div className="relative z-10 mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <Reveal className="mx-auto w-full max-w-[21rem] lg:max-w-none">
            <Desmascara className="elevado relative aspect-3/4 overflow-hidden">
              <Foto
                src={autor.foto}
                alt={`${autor.nome}, criador do ${marca.nome}`}
                arte={autor.fotoArte}
              />
            </Desmascara>
            <p className="rotulo mt-5 text-mar-400">{marca.instagramHandle}</p>
          </Reveal>

          <div>
            <Reveal>
              <Rotulo tom="claro">{autor.olho}</Rotulo>
            </Reveal>
            <Reveal atraso={70}>
              <h2 className="display mt-6 text-[clamp(3rem,9vw,5.2rem)] text-areia-50">
                {autor.nome}
              </h2>
              <p className="mt-3 text-[0.88rem] font-semibold text-mar-300">
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

            <Reveal atraso={340}>
              <p className="display mt-10 border-t border-mar-800 pt-6 text-[1.6rem] text-mar-400">
                — {autor.assinatura}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
