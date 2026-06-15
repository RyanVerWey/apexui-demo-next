"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AppBar, Badge, BottomNavigation, Breadcrumbs, Button, Icon, Snackbar, Tooltip } from "@apexui/react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { appRoutes } from "../../data/northstar";
import { ThemeModeSwitch, type ThemeMode } from "../molecules/ThemeModeSwitch";

export function NorthstarShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const activeRoute = useMemo(() => {
    return appRoutes.find((route) => route.href === pathname) ?? appRoutes.find((route) => pathname.startsWith(`${route.href}/`)) ?? appRoutes[0];
  }, [pathname]);
  const theme = `graphite-${mode}`;

  return (
    <div className="app-shell" data-apex-theme={theme}>
      <AppBar
        title="Northstar Field Services"
        navigation={
          <Breadcrumbs
            items={[
              { label: "Northstar", href: "/" },
              { label: activeRoute.label, current: true },
            ]}
          />
        }
        actions={
          <div className="app-top-actions">
            <Tooltip content="Graphite token mode">
              <ThemeModeSwitch mode={mode} onModeChange={setMode} />
            </Tooltip>
            <Button size="sm" variant="secondary" onClick={() => setSnackbarOpen(true)}>
              <Icon name="bell" size="sm" decorative />
              Sync
            </Button>
          </div>
        }
      />

      <div className="app-main">
        <div className="app-layout">
          <aside className="app-sidebar-area">
            <nav aria-label="Northstar pages" className="apex-sidebar app-route-nav">
              <div className="apex-sidebar-header">
                <h3 className="apex-sidebar-title">Workspace</h3>
              </div>
              <div className="apex-sidebar-nav">
                {appRoutes.map((route) => (
                  <Link
                    aria-current={route.id === activeRoute.id ? "page" : undefined}
                    className={`apex-sidebar-item${route.id === activeRoute.id ? " apex-sidebar-item-active" : ""}`}
                    href={route.href}
                    key={route.id}
                    prefetch={false}
                  >
                    <span className="apex-sidebar-icon" aria-hidden="true">
                      <Icon name={route.icon} size="sm" decorative />
                    </span>
                    <span className="apex-sidebar-label">{route.label}</span>
                  </Link>
                ))}
              </div>
              <div className="apex-sidebar-footer">
                <Badge tone="info">{theme}</Badge>
              </div>
            </nav>
            <BottomNavigation
              activeId={activeRoute.id}
              items={appRoutes.slice(0, 5).map((route) => ({
                id: route.id,
                label: route.shortLabel,
                icon: <Icon name={route.icon} size="sm" decorative />,
              }))}
              label="Primary routes"
              onChange={(id) => {
                const nextRoute = appRoutes.find((route) => route.id === id);
                if (nextRoute) {
                  router.push(nextRoute.href);
                }
              }}
            />
          </aside>

          <main className="app-page">{children}</main>
        </div>
      </div>

      <Snackbar
        action={
          <Button size="sm" variant="secondary" onClick={() => setSnackbarOpen(false)}>
            Dismiss
          </Button>
        }
        open={snackbarOpen}
        tone="success"
      >
        Northstar demo running on ApexUI React with {theme} tokens.
      </Snackbar>
    </div>
  );
}
