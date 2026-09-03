import { bonus } from "@/lib/content";
import { Reveal, Rotulo } from "./ui";

export default function Bonus() {
  if (bonus.length === 0) return null;

  return (
    <section className="bg-areia-100 py-20 sm:py-24">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Reveal>
          <Rotulo>Vai junto, sem custo extra</Rotulo>
        </Reveal>
        <Reveal atraso={70}>
          <h2 className="display mt-6 text-[clamp(1.56rem,4.68vw,2.50rem)] text-tinta">
            Bônus de entrada
          </h2>
        </Reveal>

        <div className="fio mt-12 grid gap-x-10 gap-y-8 border-t pt-10 md:grid-cols-3">
          {bonus.map((item, i) => (
            <Reveal key={item.titulo} atraso={i * 70}>
              <div className={i > 0 ? "md:fio md:border-l md:pl-10" : ""}>
                <p className="placar text-[1.4rem] text-areia-400">
                  +{String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-[1.15rem] font-bold tracking-tight text-tinta">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-[1.65] text-tinta/65">
                  {item.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
