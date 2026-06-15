import "@apexui/tokens/css";
import "@apexui/react/styles.css";
import "./globals.css";
export const metadata = { title: "ApexUI Next Demo", description: "ApexUI static Next.js demo" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" data-apex-theme="graphite-dark"><body>{children}</body></html>; }
