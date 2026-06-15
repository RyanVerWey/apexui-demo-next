import "@apexui/tokens/css";
import "@apexui/react/styles.css";
import "./globals.css";
import { NorthstarShell } from "./components/organisms/NorthstarShell";

export const metadata = {
  title: "Northstar Field Services",
  description: "ApexUI Next.js demo for a field operations business.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-apex-theme="graphite-dark">
      <body>
        <NorthstarShell>{children}</NorthstarShell>
      </body>
    </html>
  );
}
