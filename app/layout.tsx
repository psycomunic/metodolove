import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, JetBrains_Mono, Manrope } from "next/font/google";
import { faq, marca } from "@/lib/content";
import "./globals.css";

/**
 * Três faces, três funções que não se confundem:
 *  · Barlow Condensed carrega a manchete. A condensada aguenta 100px de
 *    display sem quebrar em três linhas no celular.
 *  · Manrope é o corpo, com bojo alto: parágrafo longo em fundo escuro
 *    precisa de x-height generoso para não fechar.
 *  · JetBrains Mono é só metadado ("01/04", "MÓDULO 03", fonte do dado).
 *    Mono em rótulo é o que faz o número ler como referência, não como texto.
 *
 * Todas via next/font: self-hosted, sem requisição a fonts.googleapis.com em
 * runtime e sem troca de layout no carregamento.
 */
const barlow = Barlow_Condensed({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const descricao =
  "Formação para professores de futevôlei. Dar aula com começo, meio e fim, segurar turma desnivelada e cobrar como profissional. 6 módulos mais bônus, com o Charllove.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${marca.dominio}`),
  title: {
    default: "Método LLOVE · formação para professores de futevôlei",
    template: "%s · Método LLOVE",
  },
  description: descricao,
  keywords: [
    "futevôlei",
    "professor de futevôlei",
    "formação de professor de futevôlei",
    "método llove",
    "charllove",
    "dar aula de futevôlei",
  ],
  openGraph: {
    title: "Pare de improvisar aula. Comece a viver de futevôlei.",
    description: descricao,
    url: `https://${marca.dominio}`,
    siteName: "Método LLOVE",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Método LLOVE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pare de improvisar aula. Comece a viver de futevôlei.",
    description: descricao,
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#06111F",
  width: "device-width",
  initialScale: 1,
};

const dadosCurso = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: marca.nome,
  description: descricao,
  inLanguage: "pt-BR",
  provider: {
    "@type": "Organization",
    name: marca.autor,
    sameAs: marca.instagram,
  },
  offers: {
    "@type": "Offer",
    price: "297.90",
    priceCurrency: "BRL",
    category: "Paid",
    availability: "https://schema.org/InStock",
    url: marca.checkout,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT20H",
  },
};

const dadosFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.p,
    acceptedAnswer: { "@type": "Answer", text: item.r },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${barlow.variable} ${manrope.variable} ${jetbrains.variable}`}
      // O script abaixo acrescenta a classe `js` antes da hidratação, então o
      // className do <html> É diferente no servidor e no cliente, de propósito.
      suppressHydrationWarning
    >
      <head>
        {/* Marca o documento como "tem JavaScript" ANTES da primeira pintura.
            Todo estado inicial escondido das animações depende dessa classe,
            então sem JS a página aparece inteira em vez de ficar em branco, e
            com JS ninguém vê o texto surgir e sumir. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
        {/* FAQPage e Course em JSON-LD. Ficam no head porque o rich result do
            Google lê o documento inicial, e a página é estática. */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosCurso) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosFaq) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
