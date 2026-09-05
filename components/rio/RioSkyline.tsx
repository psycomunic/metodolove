"use client";

import { useEffect, useId, useState } from "react";
import { useMovimentoReduzido } from "../movimento";
import { useParallax } from "./parallax";

/**
 * A orla do Rio, desenhada a partir das fotos e vetores clássicos do skyline.
 *
 * Da esquerda para a direita: Pedra da Gávea (monólito de topo achatado),
 * Morro Dois Irmãos (dois picos, o da esquerda mais alto), Corcovado com o
 * Cristo Redentor no cume, Arcos da Lapa com o sol se pondo por trás,
 * Catedral Metropolitana e os prédios do Centro, Morro da Urca na frente e o
 * Pão de Açúcar atrás, ligados pelo cabo do bondinho, que sobe e desce sem
 * parar. Na frente, o mar com a espuma, a faixa de areia e dois coqueiros.
 *
 * Paleta: os morros em três tons de navy (o mais distante é o mais CLARO,
 * porque a bruma clareia o que está longe), o céu abrindo para areia no
 * horizonte, e a luz do fim de tarde como traço de areia nas cristas.
 *
 * Enquadramento: no desktop, viewBox de 1600 com `slice` (corta em cima, os
 * cumes sobrevivem porque nada passa de y=24). No celular, viewBox recortado
 * de 290 a 1370 com `meet`, para a composição inteira caber — inclusive o
 * Pão de Açúcar, que é a primeira coisa que alguém procura.
 */

const AREIA = "#E9D8B4";
const LUZ = "#EFDFBB";
const ESCURO = "#0E1F3A";

function useMovel() {
  const [movel, setMovel] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const aplica = () => setMovel(mq.matches);
    aplica();
    mq.addEventListener("change", aplica);
    return () => mq.removeEventListener("change", aplica);
  }, []);
  return movel;
}

/* Cristas (sem o M inicial): usadas fechadas como massa e abertas como traço. */
const GAVEA =
  "C318,214 338,196 354,176 C368,158 378,140 390,126 C398,118 406,114 418,112 L452,110";
const GAVEA_FECHA = " C458,120 462,138 466,158 C470,182 472,208 478,230 Z";
const DOIS_IRMAOS =
  "C486,212 500,192 512,168 C524,142 536,110 548,86 C552,78 556,74 560,70 C566,80 572,96 580,116 C588,136 596,154 606,164 C614,170 620,172 626,168 C636,160 644,148 652,136 C658,128 664,124 672,124";
const DOIS_IRMAOS_FECHA = " C680,132 688,150 696,176 C704,200 712,220 718,230 Z";
const CORCOVADO =
  "C712,216 736,198 756,172 C776,146 792,112 806,80 C810,72 812,66 816,60";
const CORCOVADO_FECHA =
  " C820,68 824,80 830,94 C844,126 860,158 880,186 C898,210 918,224 940,230 Z";
const PAO =
  "C1210,200 1222,170 1236,146 C1248,124 1262,106 1280,96 C1290,91 1300,90 1310,94 C1324,102 1334,120 1342,146";
const PAO_FECHA = " C1350,172 1356,204 1362,230 Z";
const URCA = "C1110,212 1126,196 1144,184 C1156,176 1168,172 1182,172";
const URCA_FECHA = " C1196,174 1208,182 1220,194 C1232,206 1242,218 1250,230 Z";

const CABO = "M1182,172 Q1244,140 1302,92";

const ARCOS = [6, 30, 54, 78, 102, 126];

const JANELAS: [number, number][] = [
  [1073, 172],
  [1081, 184],
  [1119, 160],
  [1131, 172],
  [1125, 196],
  [1149, 180],
  [1054, 194],
  [1101, 188],
  [1158, 176],
  [1075, 206],
];

const LUZES: [number, number][] = [
  [330, 3.6],
  [412, 4.8],
  [506, 4.1],
  [590, 5.4],
  [668, 3.9],
  [742, 4.6],
  [828, 5.1],
  [1002, 3.7],
  [1088, 4.4],
  [1176, 5.6],
  [1262, 4.0],
  [1348, 4.9],
];

function Coqueiro({
  x,
  y,
  espelha = false,
}: {
  x: number;
  y: number;
  espelha?: boolean;
}) {
  const s = espelha ? -1 : 1;
  return (
    <g
      transform={`translate(${x},${y}) scale(${s},1)`}
      fill="none"
      stroke="#08152A"
      strokeLinecap="round"
    >
      <path strokeWidth="2.6" d="M0,0 C1,-14 3,-28 8,-40" />
      <g strokeWidth="2.2">
        <path d="M8,-40 C0,-44 -10,-44 -18,-38" />
        <path d="M8,-40 C2,-48 -4,-52 -12,-52" />
        <path d="M8,-40 C10,-50 14,-56 20,-58" />
        <path d="M8,-40 C16,-44 24,-44 30,-38" />
        <path d="M8,-40 C14,-36 20,-30 22,-24" />
        <path d="M8,-40 C2,-34 -2,-30 -4,-24" />
      </g>
    </g>
  );
}

export default function RioSkyline({
  altura = "h-[108px] sm:h-[180px] lg:h-[240px]",
  noturno = false,
  className = "",
}: {
  altura?: string;
  /** Versão do CTA final: lua no lugar do sol, janelas e luzes da orla acesas. */
  noturno?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const movel = useMovel();
  const reduzido = useMovimentoReduzido();
  const { raiz, coleta } = useParallax([16, 40, 72]);

  const g = (n: string) => `${n}-${id}`;

  return (
    <div
      ref={raiz}
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden ${altura} ${className}`}
    >
      <svg
        viewBox={movel ? "290 0 1080 300" : "0 0 1600 300"}
        preserveAspectRatio={movel ? "xMidYMax meet" : "xMidYMax slice"}
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={g("ceu")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#06111F" stopOpacity="0" />
            <stop offset="0.35" stopColor="#1B2F55" stopOpacity={noturno ? 0.35 : 0.5} />
            <stop
              offset="0.66"
              stopColor={noturno ? "#3A4A6E" : "#6E5F4A"}
              stopOpacity="0.55"
            />
            <stop offset="0.766" stopColor={AREIA} stopOpacity={noturno ? 0.16 : 0.38} />
          </linearGradient>
          <radialGradient id={g("sol")} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F3E4C2" stopOpacity="0.55" />
            <stop offset="1" stopColor={AREIA} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={g("mar")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1C3357" />
            <stop offset="1" stopColor="#0B1A2E" />
          </linearGradient>
          <linearGradient id={g("areia")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={AREIA} stopOpacity={noturno ? 0.22 : 0.34} />
            <stop offset="1" stopColor={AREIA} stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id={g("m1")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2E4874" />
            <stop offset="1" stopColor="#1C3054" />
          </linearGradient>
          <linearGradient id={g("m2")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#172B4D" />
            <stop offset="1" stopColor={ESCURO} />
          </linearGradient>
          <linearGradient id={g("m3")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0F2140" />
            <stop offset="1" stopColor="#08152A" />
          </linearGradient>
        </defs>

        {/* céu */}
        <rect width="1600" height="230" fill={`url(#${g("ceu")})`} />

        {/* ---------- camada 1: serra distante + sol/lua ---------- */}
        <g ref={coleta(0)}>
          <path
            fill={`url(#${g("m1")})`}
            d="M0,230 L0,178 C50,170 90,156 140,150 C200,143 240,156 290,150 C340,144 370,128 420,126 C470,124 500,140 550,150 C600,160 640,152 690,140 C740,128 780,124 830,134 C880,144 920,164 970,170 C1020,176 1070,168 1120,162 C1170,156 1220,162 1270,170 C1330,180 1390,190 1450,194 C1510,198 1560,200 1600,202 L1600,230 Z"
          />
          {noturno ? (
            <>
              <circle cx="640" cy="52" r="26" fill={`url(#${g("sol")})`} />
              <circle cx="640" cy="52" r="9" fill="#F3E4C2" fillOpacity="0.9" />
              <circle cx="644" cy="49" r="7.5" fill="#0B1A2E" />
            </>
          ) : (
            <>
              <circle cx="928" cy="208" r="70" fill={`url(#${g("sol")})`} />
              <circle cx="928" cy="208" r="36" fill="#F3E4C2" fillOpacity="0.9" />
            </>
          )}
        </g>

        {/* ---------- camada 2: os cartões-postais ---------- */}
        <g ref={coleta(1)}>
          <path fill={`url(#${g("m2")})`} d={`M296,230 ${GAVEA}${GAVEA_FECHA}`} />
          <path
            fill={`url(#${g("m2")})`}
            d={`M470,230 ${DOIS_IRMAOS}${DOIS_IRMAOS_FECHA}`}
          />
          <path fill={`url(#${g("m2")})`} d={`M690,230 ${CORCOVADO}${CORCOVADO_FECHA}`} />

          {/* Cristo Redentor no cume do Corcovado */}
          <g
            transform="translate(816,60)"
            fill={ESCURO}
            stroke={LUZ}
            strokeOpacity="0.95"
            strokeWidth="1.2"
            strokeLinejoin="round"
          >
            <path d="M-6,0 L-6,-11 L6,-11 L6,0 Z" />
            <path d="M-4.5,-11 L-2.6,-33 L2.6,-33 L4.5,-11 Z" />
            <path d="M-18,-28.5 L-2.6,-32.5 L2.6,-32.5 L18,-28.5 L18,-25.8 L2.6,-29 L-2.6,-29 L-18,-25.8 Z" />
            <circle cx="0" cy="-36.6" r="2.3" />
          </g>

          {/* Arcos da Lapa */}
          <g transform="translate(860,230)">
            <path fill={ESCURO} d="M0,0 L0,-44 L150,-44 L150,0 Z" />
            <g fill="#233B63">
              {ARCOS.map((x) => (
                <path
                  key={`a${x}`}
                  d={`M${x},-28 a9,9 0 0 1 18,0 L${x + 18},-12 L${x},-12 Z`}
                />
              ))}
              {ARCOS.map((x) => (
                <path
                  key={`b${x}`}
                  d={`M${x},-6 a9,7 0 0 1 18,0 L${x + 18},0 L${x},0 Z`}
                />
              ))}
            </g>
            <path d="M0,-44 L150,-44" stroke={LUZ} strokeOpacity="0.55" strokeWidth="1" />
          </g>

          {/* Catedral Metropolitana e prédios do Centro */}
          <g fill={ESCURO}>
            <path d="M990,230 L1004,172 L1026,172 L1040,230 Z" />
            <rect x="1048" y="184" width="16" height="46" rx="1.5" />
            <path d="M1068,230 L1068,166 C1068,164 1070,163 1072,163 L1088,163 C1090,163 1092,164 1092,166 L1092,230 Z" />
            <rect x="1096" y="176" width="14" height="54" rx="1.5" />
            <path d="M1114,230 L1114,156 C1114,153 1116,152 1119,152 L1127,140 L1135,152 C1138,152 1140,153 1140,156 L1140,230 Z" />
            <rect x="1144" y="170" width="16" height="60" rx="1.5" />
            <path d="M1058,184 L1061,178 L1064,184 Z" />
          </g>
          <g fill={LUZ} fillOpacity={noturno ? 0.85 : 0.55}>
            {JANELAS.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="2.5" height="3.5" />
            ))}
          </g>

          {/* Pão de Açúcar atrás, Morro da Urca na frente */}
          <path fill={`url(#${g("m2")})`} d={`M1196,230 ${PAO}${PAO_FECHA}`} />
          <path fill={`url(#${g("m3")})`} d={`M1096,230 ${URCA}${URCA_FECHA}`} />

          {/* cabo do bondinho e o bondinho subindo */}
          <path d={CABO} fill="none" stroke={LUZ} strokeOpacity="0.75" strokeWidth="1" />
          <g fill={ESCURO} stroke={LUZ} strokeOpacity="0.95" strokeWidth="1">
            <g>
              <path d="M0,0 L0,4" />
              <rect x="-4.5" y="4" width="9" height="6" rx="1.4" />
              {reduzido ? (
                <animateMotion
                  dur="1s"
                  fill="freeze"
                  path={CABO}
                  keyPoints="0.3;0.3"
                  keyTimes="0;1"
                />
              ) : (
                <animateMotion
                  dur="26s"
                  repeatCount="indefinite"
                  path={CABO}
                  keyPoints="0;1;1;0;0"
                  keyTimes="0;0.42;0.5;0.92;1"
                  calcMode="linear"
                />
              )}
            </g>
            <g>
              <path d="M0,0 L0,4" />
              <rect x="-4.5" y="4" width="9" height="6" rx="1.4" />
              {reduzido ? (
                <animateMotion
                  dur="1s"
                  fill="freeze"
                  path={CABO}
                  keyPoints="0.7;0.7"
                  keyTimes="0;1"
                />
              ) : (
                <animateMotion
                  dur="26s"
                  repeatCount="indefinite"
                  path={CABO}
                  keyPoints="1;0;0;1;1"
                  keyTimes="0;0.42;0.5;0.92;1"
                  calcMode="linear"
                />
              )}
            </g>
          </g>

          {noturno ? null : (
            <g fill={AREIA} fillOpacity="0.1">
              <path d="M816,60 C820,68 824,80 830,94 C844,126 860,158 880,186 C898,210 918,224 940,230 L900,230 C880,214 862,190 848,160 C836,134 826,104 816,60 Z" />
              <path d="M1096,230 C1110,212 1126,196 1144,184 C1156,176 1168,172 1182,172 L1160,182 C1146,190 1130,208 1120,230 Z" />
              <path d="M860,186 L1010,186 L1010,230 L860,230 Z" fillOpacity="0.05" />
            </g>
          )}
          {/* luz do fim de tarde nas cristas + veios de pedra */}
          <g fill="none" stroke={LUZ} strokeLinecap="round" strokeLinejoin="round">
            <g strokeOpacity="0.5" strokeWidth="1.2">
              <path d={`M296,230 ${GAVEA}`} />
              <path d={`M470,230 ${DOIS_IRMAOS}`} />
              <path d={`M690,230 ${CORCOVADO}`} />
              <path d={`M1196,230 ${PAO}`} />
              <path d={`M1096,230 ${URCA}`} />
            </g>
            <g strokeOpacity="0.16" strokeWidth="1">
              <path d="M452,110 C456,140 458,170 462,200" />
              <path d="M560,70 C562,110 566,150 572,190" />
              <path d="M816,60 C824,100 836,140 852,180" />
              <path d="M1306,94 C1318,124 1330,160 1340,200" />
              <path d="M1280,96 C1270,130 1262,164 1258,200" />
            </g>
          </g>

          {noturno ? (
            <g fill={LUZ}>
              {LUZES.map(([x, dur], i) => (
                <circle
                  key={x}
                  className="luz"
                  cx={x}
                  cy={226 - (i % 3)}
                  r={i % 4 === 0 ? 1.8 : 1.2}
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

        {/* ---------- camada 3: mar, espuma, areia e coqueiros ---------- */}
        <g ref={coleta(2)}>
          <rect x="0" y="230" width="1600" height="70" fill={`url(#${g("mar")})`} />
          {noturno ? (
            <g fill="none" stroke="#F3E4C2" strokeLinecap="round" strokeWidth="1.2">
              <path strokeOpacity="0.35" d="M628,235 L652,235" />
              <path strokeOpacity="0.22" d="M624,241 L656,241" />
              <path strokeOpacity="0.12" d="M632,248 L648,248" />
            </g>
          ) : (
            <g fill="none" stroke="#F3E4C2" strokeLinecap="round" strokeWidth="1.5">
              <path strokeOpacity="0.5" d="M902,235 L954,235" />
              <path strokeOpacity="0.35" d="M894,241 L962,241" />
              <path strokeOpacity="0.22" d="M906,248 L950,248" />
              <path strokeOpacity="0.12" d="M916,256 L940,256" />
            </g>
          )}
          <g fill="none" stroke={AREIA} strokeWidth="1" strokeLinecap="round">
            <path
              strokeOpacity="0.32"
              d="M0,234 C120,230 200,238 320,234 C440,230 520,238 640,234 C760,230 840,238 960,234 C1080,230 1160,238 1280,234 C1400,230 1480,238 1600,234"
            />
            <path
              strokeOpacity="0.16"
              d="M0,246 C100,242 180,250 300,246 C420,242 500,250 620,246 C740,242 820,250 940,246 C1060,242 1140,250 1260,246 C1380,242 1460,250 1600,246"
            />
            <path
              strokeOpacity="0.08"
              d="M0,258 C140,254 220,262 340,258 C460,254 540,262 660,258 C780,254 860,262 980,258 C1100,254 1180,262 1300,258 C1420,254 1500,262 1600,258"
            />
          </g>
          <path
            d="M0,300 L0,272 C200,268 400,276 600,272 C800,268 1000,275 1200,271 C1400,267 1520,273 1600,271 L1600,300 Z"
            fill={`url(#${g("areia")})`}
          />
          <Coqueiro x={380} y={272} />
          <Coqueiro x={1060} y={272} espelha />
        </g>
      </svg>
    </div>
  );
}
