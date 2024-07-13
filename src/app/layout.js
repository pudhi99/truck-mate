import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Truck Mate",
  description:
    "TruckMate is a comprehensive platform that seamlessly connects truck drivers and contractors in India. Our mission is to streamline the freight transportation process by providing a user-friendly interface for both parties to collaborate efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
