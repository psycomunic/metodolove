import CalcadaoWaves from "./CalcadaoWaves";

/**
 * Emenda entre uma seção e a seguinte.
 *
 * A página alterna faixas claras e escuras, e corte reto entre elas lê como
 * duas páginas coladas. O calçadão faz a passagem: navy sobre creme quando a
 * seção que chega é clara, areia sobre navy quando é escura. É o mesmo
 * desenho nas duas, trocando só de lado, e é isso que amarra o ritmo.
 *
 * `fundo` é a cor da faixa, e `tom` é a cor do desenho em cima dela. Quem usa
 * escolhe os dois, porque a emenda pertence à fronteira e não a uma das duas
 * seções.
 */
export default function Emenda({
  fundo = "bg-creme",
  tom = "text-navy",
  opacidade = 0.9,
  className = "",
}: {
  /** Classe de fundo da faixa. */
  fundo?: string;
  /** Classe de cor do desenho do calçadão. */
  tom?: string;
  opacidade?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`${fundo} ${className}`}>
      <CalcadaoWaves className={tom} opacidade={opacidade} altura={64} grosso={30} />
    </div>
  );
}
