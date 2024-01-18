import "./globals.css";
import { Header, Footer } from "@/components";
import { constructMetaData } from "@/utils/metadata";
import LenisContext from "@/context/LenisContext";

export const metadata = constructMetaData()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisContext>
      <html lang="en">
        <body className="bg-bridal-health text-trace-ash">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </LenisContext>
  );
}
