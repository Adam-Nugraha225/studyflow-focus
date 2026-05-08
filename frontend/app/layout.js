import "./globals.css";

import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "StudyFlow Focus",
  description:
    "Mini Fullstack Productivity App",
  manifest: "/manifest.json",
  themeColor: "#060816",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={jakarta.variable}>
        {children}
      </body>
    </html>
  );
}