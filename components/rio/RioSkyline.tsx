"use client";

import { useId } from "react";
import { useParallax } from "./parallax";

/**
 * A orla do Rio vista do mar.
 *
 * Não é um mapa: é a composição que a cidade tem na cabeça de quem já esteve
 * lá. Da esquerda para a direita: Pedra da Gávea (monólito de topo achatado e
 * face de pedra quase vertical do lado do mar), Morro Dois Irmãos (dois picos
 * colados, o da esquerda bem mais alto e pontiagudo), Corcovado com o Cristo
 * no cume, e Pão de Açúcar com o Morro da Urca menor à frente, ligados pelo
 * cabo do bondinho.
 *
 * O QUE FAZ LER COMO RIO. Os morros do Rio são domos de granito: ALTOS PARA A
 * BASE QUE TÊM. A primeira versão deste desenho espalhou cada morro por 200 a
 * 300 unidades de largura e o resultado foi uma serra genérica, dessas de
 * papel de parede. Aqui cada um sobe entre 100 e 174 unidades numa base de
 * 150 a 280: é a inclinação, mais do que o contorno, que entrega a cidade.
 *
 * PROPORÇÃO DO CRISTO. A estátua tem 30 m num morro de 710 m: 4% da altura,
 * 5,4% contando o pedestal. Aqui o Corcovado sobe 172 unidades e o Cristo tem
 * 11, ou 6,5%. Um fio acima do real, porque abaixo disso ele some no traço, e
 * ainda muito longe do bonequinho de ilustração de agência.
 *
 * TRÊS CAMADAS, e a de trás é a mais CLARA. Sobre fundo escuro a perspectiva
 * atmosférica inverte: o que está longe recebe bruma e clareia. Escurecer a
 * camada de trás para "afastar" faz ela sumir no fundo.
 *
 * ENQUADRAMENTO. `xMidYMax slice` corta o excedente, e o corte muda de eixo
 * conforme a tela. No desktop, mais achatado que o viewBox, o corte é EM CIMA,
 * e sobram uns 16px de folga acima do Cristo. No celular o corte é NAS
 * LATERAIS: em 360px sobra a faixa de x=350 a x=1250. Por isso a composição
 * inteira vive entre x=300 e x=1300, e não espalhada nos 1600.
 */

const BASE = 214;

/* Cristas, sem o comando inicial: cada uma é usada duas vezes, uma fechada em
   preenchimento e outra aberta em traço de contraluz. O traço só corre pela
   crista, nunca pela base, senão a silhueta ganha contorno de adesivo. */

const P_GAVEA = { x: 300, y: BASE };
const D_GAVEA =
  "C316,206 330,190 344,168 C356,150 366,124 380,104 " +
  "C390,90 398,80 410,76 L452,74 " + // topo achatado
  "C458,84 462,104 466,130 C469,154 470,182 470,214"; // face de pedra

const P_DOIS_IRMAOS = { x: 480, y: BASE };
const D_DOIS_IRMAOS =
  "C494,204 506,186 518,162 C530,138 542,104 552,80 C556,70 558,66 560,62 " + // pico maior
  "C564,70 570,86 576,104 C582,122 590,142 598,154 C604,162 610,166 616,164 " + // sela
  "C622,158 628,144 634,128 C640,112 646,100 654,96 " + // pico menor
  "C662,102 670,120 678,142 C686,164 694,190 700,214";

const P_CORCOVADO = { x: 720, y: BASE };
const D_CORCOVADO =
  "C744,204 768,188 792,164 C814,142 832,112 848,74 C852,62 855,50 858,42 " +
  "C862,52 866,66 872,82 C884,116 900,150 918,176 C936,200 962,212 1000,214";

const P_PAO = { x: 1112, y: BASE };
const D_PAO =
  "C1122,196 1134,170 1150,148 C1164,128 1182,114 1200,116 " +
  "C1218,118 1234,132 1246,152 C1260,175 1270,196 1276,214";

const P_URCA = { x: 1000, y: BASE };
const D_URCA =
  "C1014,208 1028,196 1042,180 C1052,168 1060,160 1068,158 " +
  "C1078,160 1086,168 1094,180 C1104,194 1114,206 1124,214";

const traco = (p: { x: number; y: number }, d: string) => `M${p.x},${p.y} ${d}`;
const massa = (p: { x: number; y: number }, d: string, fim: number) =>
  `M${p.x},${p.y} ${d} L${fim},400 L${p.x},400 Z`;

/* Linha d'água. Mesma curva no preenchimento e na espuma. */
const COSTA =
  "M0,250 C160,244 320,240 480,242 C640,244 800,252 960,252 " +
  "C1120,252 1280,244 1440,242 C1500,241 1560,243 1600,246";

export default function RioSkyline({
  altura = "h-[104px] sm:h-[170px] lg:h-[220px]",
  noturno = false,
  className = "",
}: {
  altura?: string;
  /** Versão do CTA final: luzes na orla e reflexo dos morros no mar. */
  noturno?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const { raiz, coleta } = useParallax([20, 50, 90]);

  const ceu = `ceu-${id}`;
  const areia = `areia-${id}`;
  const reflexo = `reflexo-${id}`;
  const icones = `icones-${id}`;

  // Luzes da orla. Posições e ritmos escritos à mão: Math.random daria valores
  // diferentes no servidor e no cliente e quebraria a hidratação.
  const luzes: [number, number][] = [
    [128, 3.6],
    [214, 4.8],
    [305, 4.1],
    [402, 5.4],
    [498, 3.9],
    [596, 4.6],
    [702, 5.1],
    [806, 3.7],
    [905, 4.4],
    [1008, 5.6],
    [1104, 4.0],
    [1206, 4.9],
    [1310, 3.8],
    [1418, 5.2],
    [1520, 4.3],
  ];

  return (
    <div
      ref={raiz}
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden ${altura} ${className}`}
    >
      <svg
        viewBox="0 0 1600 260"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          {/* Céu abrindo para azul-noite na linha do horizonte. É contra ele
              que a silhueta escura tem o que recortar. */}
          <linearGradient id={ceu} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06111F" stopOpacity="0" />
            <stop offset="58%" stopColor="#0F2A55" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0F2A55" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id={areia} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1A2E" />
            <stop offset="100%" stopColor="#06111F" />
          </linearGradient>

          {/* Reflexo: forte junto ao horizonte e some antes da areia, como
              reflexo de verdade em água mexida. */}
          <linearGradient id={reflexo} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <mask id={`m-${reflexo}`}>
            <rect x="0" y="214" width="1600" height="42" fill={`url(#${reflexo})`} />
          </mask>
        </defs>

        <rect x="0" y="0" width="1600" height="260" fill={`url(#${ceu})`} />

        {/* -------- camada 1: serra distante -------- */}
        <g ref={coleta(0)} opacity="0.32">
          <path
            fill="#16294A"
            d="M0,400 L0,206 C60,200 110,182 160,164 C214,144 264,132 316,140
               C368,148 414,172 464,182 C520,193 574,182 628,172
               C688,161 744,158 800,168 C860,179 912,198 968,202
               C1024,206 1080,196 1136,184 C1196,171 1258,166 1318,176
               C1382,187 1444,206 1508,214 C1540,218 1572,219 1600,219
               L1600,400 Z"
          />
        </g>

        {/* -------- camada 2: os cartões-postais -------- */}
        <g ref={coleta(1)}>
          <g id={icones}>
            <g opacity="0.68" fill="#0E1F3A">
              <path d={massa(P_GAVEA, D_GAVEA, 470)} />
              <path d={massa(P_DOIS_IRMAOS, D_DOIS_IRMAOS, 700)} />
              <path d={massa(P_CORCOVADO, D_CORCOVADO, 1000)} />
              {/* Pão de Açúcar entra ANTES da Urca: a Urca é o morro da frente
                  e precisa recortar por cima dele. */}
              <path d={massa(P_PAO, D_PAO, 1276)} />
              <path d={massa(P_URCA, D_URCA, 1124)} />
            </g>

            {/* Contraluz do fim de tarde: um fio de 1px só na crista. É o que
                separa morro de céu quando os dois são navy. */}
            <g
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.2"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={traco(P_GAVEA, D_GAVEA)} />
              <path d={traco(P_DOIS_IRMAOS, D_DOIS_IRMAOS)} />
              <path d={traco(P_CORCOVADO, D_CORCOVADO)} />
              <path d={traco(P_PAO, D_PAO)} />
              <path d={traco(P_URCA, D_URCA)} />
              {/* Cabo do bondinho, de cume a cume. Sem ele os dois morros da
                  direita são só dois montes; com ele, é o Rio. */}
              <path
                d="M1068,158 Q1134,142 1200,116"
                strokeOpacity="0.2"
                strokeWidth="0.9"
              />
            </g>

            {/* Cristo Redentor, 11 unidades num morro de 172. Traço mais aceso
                que o das cristas: é o elemento mais reconhecível da composição
                e o menor de todos. */}
            <g
              fill="#0E1F3A"
              stroke="#ffffff"
              strokeOpacity="0.6"
              strokeWidth="0.8"
              strokeLinejoin="round"
            >
              <path d="M855.4,42.2 L855.4,39 L860.6,39 L860.6,42.2 Z" />
              <path d="M856.7,39 L856.7,33.6 L859.3,33.6 L859.3,39 Z" />
              <path d="M851.2,35.8 L851.2,34.5 L864.8,34.5 L864.8,35.8 Z" />
              <circle cx="858" cy="32.4" r="1.3" />
            </g>
          </g>
        </g>

        {/* -------- camada 3: mar e areia -------- */}
        <g ref={coleta(2)}>
          {/* O reflexo mora AQUI, e não na camada dos morros: precisa ficar
              por cima do mar e por baixo da areia, senão a praia o cobre. O
              espelho é a própria base dos morros, em y=214. */}
          {noturno ? (
            <use
              href={`#${icones}`}
              transform="matrix(1 0 0 -1 0 428)"
              mask={`url(#m-${reflexo})`}
            />
          ) : null}

          <path fill={`url(#${areia})`} d={`${COSTA} L1600,400 L0,400 Z`} />
          {/* Arrebentação: um fio de espuma na quebra da areia. */}
          <path
            d={COSTA}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.1"
            strokeWidth="1"
          />

          {noturno ? (
            <g fill="#ffffff">
              {luzes.map(([x, dur], i) => (
                <circle
                  key={x}
                  className="luz"
                  cx={x}
                  cy={244 - (i % 3)}
                  r={i % 4 === 0 ? 1.9 : 1.3}
                  style={
                    {
                      "--duracao": `${dur}s`,
                      "--atraso": `${(i * 0.37).toFixed(2)}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </g>
          ) : null}
        </g>
      </svg>
    </div>
  );
}
