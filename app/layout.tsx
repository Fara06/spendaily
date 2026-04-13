import Providers from "@/core/providers/providers";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"] 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.className} bg-white`} style={{ colorScheme: 'light' }}>
      <body className="bg-white text-slate-800 min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}