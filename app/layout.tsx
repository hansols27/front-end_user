"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<"pc" | "mo" | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth < 1024 ? "mo" : "pc");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <AppRouterCacheProvider>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="flex flex-col min-h-screen">
                <Header />
                <main>
                  {children}
                  <Toaster
                    position="bottom-center"
                    toastOptions={{
                      style: {
                        zIndex: 9999,
                      },
                    }}
                  />
                </main>

                <Footer />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}