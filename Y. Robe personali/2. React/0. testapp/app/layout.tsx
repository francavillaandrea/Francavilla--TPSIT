import type { Metadata } from "next";
import { Comic_Relief } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../1. Portfolio/css/styles.css";

export const metadata: Metadata = {
    title: "Portfolio - Andrea Francavilla",
    description: "Portfolio personale convertito in Next.js",
};

const comicRelief = Comic_Relief({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="it" data-bs-theme="dark">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                />
            </head>
            <body className={comicRelief.className}>
                {children}
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
