import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import { faq, marca } from "@/lib/content";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const descricao =
  "O método completo de futevôlei do Charllove: fundamento, leitura de jogo, preparo pra areia e o caminho para transformar o esporte em profissão.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${marca.dominio}`),
  title: {
    default: "Método LLOVE — transforme sua paixão pelo futevôlei em profissão",
    template: "%s · Método LLOVE",
  },
  description: descricao,
  keywords: [
    "futevôlei",
    "curso de futevôlei",
    "método llove",
    "charllove",
    "aula de futevôlei online",
    "treino de futevôlei",
  ],
  openGraph: {
    title: "Método LLOVE — do racha de domingo à quadra profissional",
    description: descricao,
    url: `https://${marca.dominio}`,
    siteName: "Método LLOVE",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Método LLOVE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Método LLOVE — futevôlei do fundamento à profissão",
    description: descricao,
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#04192B",
  width: "device-width",
  initialScale: 1,
};

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Método LLOVE",
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

const faqEstruturado = {
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
      className={`${anton.variable} ${archivo.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqEstruturado) }}
        />
      </body>
    </html>
  );
}
