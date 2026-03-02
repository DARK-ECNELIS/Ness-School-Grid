import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ness-School Grid",
  description: "school grid for ness-project.",
  openGraph: {
    title: "Ness-School Grid",
    description: "school grid for ness-project",
    url: "https://ness-project.com/school",
    images: [{ url: "https://ness-project.com/school/og-image.png" }],
    siteName: "Ness-School",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ness-School Grid",
    description: "school grid for ness-project",
    images: ["https://ness-project.com/school/og-image.png"],
  },
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
