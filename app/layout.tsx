import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers"; 

import Navbar from "@/components/navBar";
import { ReactQueryProvider } from "@/app/providers/reactQueryProvider";
import { Theme } from "@/app/providers/Theme";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Viewer",
  description: "A dark-mode blog viewer",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';

  return (
    <html 
      lang="en" 
      className={theme}
      style={{ colorScheme: theme }}
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme>
          <ReactQueryProvider>
            <Navbar />
            {children}
          </ReactQueryProvider>
        </Theme>
      </body>
    </html>
  );
}