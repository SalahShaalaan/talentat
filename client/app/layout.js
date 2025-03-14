
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/shared/Header";
import Sidebar from "./components/widgets/Sidebar";
import ReduxProvider from "./providers/ReduxProvider";

const mainFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap'
});


export const metadata = {
  title: "Talentat - Task",
  description: "Developed by Salah Shaalaan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mainFont.className} ${mainFont.variable} antialiased`}>
        <ReduxProvider>
          <Header />
          <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-96 bg-white 2xl:block hidden">
              <Sidebar />
            </div>
            <div className="flex-1 p-4 md:p-8">
              {children}
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}