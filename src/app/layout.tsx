import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Dynamic Tilt Showcase",
  description: "Experience interactive 3D tilt effects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
