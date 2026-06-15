import { Badge, Chip } from "@apexui/react";
import type { ReactNode } from "react";

export type RouteRow = Record<string, ReactNode>;
export type ComponentRow = Record<string, ReactNode>;
export type ThemeMode = "light" | "dark";

export const navigationItems = [
  { id: "overview", label: "Overview" },
  { id: "routes", label: "Routes" },
  { id: "workflow", label: "Workflow" },
  { id: "settings", label: "Settings" },
];

export const menuItems = [
  { id: "overview", label: "Overview" },
  { id: "routes", label: "Routes" },
  { id: "release", label: "Release" },
  { id: "tokens", label: "Tokens" },
];

export const healthMetrics = [
  { label: "Build health", value: 96 },
  { label: "Type safety", value: 91 },
  { label: "Token coverage", value: 100 },
  { label: "A11y checks", value: 88 },
];

export const routeColumns = [
  { key: "route", header: "Route" },
  { key: "owner", header: "Owner" },
  { key: "runtime", header: "Runtime" },
  { key: "state", header: "State" },
  { key: "risk", header: "Risk" },
];

export const routeRows: RouteRow[] = [
  {
    route: "/",
    owner: "Product systems",
    runtime: "Static",
    state: <Badge tone="success">Ready</Badge>,
    risk: <Chip selected>Low</Chip>,
  },
  {
    route: "/routes",
    owner: "Platform",
    runtime: "Static",
    state: <Badge tone="info">Observed</Badge>,
    risk: <Chip>Medium</Chip>,
  },
  {
    route: "/settings",
    owner: "Design system",
    runtime: "Client",
    state: <Badge tone="warning">Review</Badge>,
    risk: <Chip>Medium</Chip>,
  },
  {
    route: "/workflow",
    owner: "Release",
    runtime: "Hybrid",
    state: <Badge tone="success">Ready</Badge>,
    risk: <Chip selected>Low</Chip>,
  },
];

export const componentColumns = [
  { key: "layer", header: "Atomic layer" },
  { key: "components", header: "ApexUI components" },
  { key: "purpose", header: "Purpose" },
];

export const componentRows: ComponentRow[] = [
  {
    layer: "Atoms",
    components: "Button, Switch, Select, Slider, Rating, Avatar, Icon",
    purpose: "Inputs, state signals, primitive actions",
  },
  {
    layer: "Molecules",
    components: "Card, Alert, Tabs, Accordion, Popover, Snackbar",
    purpose: "Grouped controls and feedback",
  },
  {
    layer: "Organisms",
    components: "Sidebar, Toolbar, DataGrid, Calendar, WorkflowBoard",
    purpose: "Product workflows and page structure",
  },
];

export const workflowColumns = [
  {
    id: "intake",
    title: "Intake",
    items: [
      { id: "spec", title: "Map App Router states", meta: "Design" },
      { id: "copy", title: "Trim release copy", meta: "Content" },
    ],
  },
  {
    id: "build",
    title: "Build",
    items: [
      { id: "tokens", title: "Wire graphite tokens", meta: "Done" },
      { id: "forms", title: "Compose form controls", meta: "Active" },
    ],
  },
  {
    id: "ship",
    title: "Ship",
    items: [
      { id: "static", title: "Verify static export", meta: "Ready" },
      { id: "readme", title: "Document package gaps", meta: "Next" },
    ],
  },
];

export const transferSourceItems = [
  { id: "storybook", label: "Storybook parity" },
  { id: "visual", label: "Visual regression" },
  { id: "bundle", label: "Bundle budget", selected: true },
  { id: "a11y", label: "Keyboard pass", selected: true },
];

export const transferTargetItems = [
  { id: "tokens", label: "Graphite tokens", selected: true },
  { id: "next", label: "Next app router", selected: true },
];

export const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const day = index - 1;
  const selected = day === 20;
  const muted = index < 2 || index > 31;
  return {
    id: `day-${index}`,
    label: muted ? "" : String(day),
    muted,
    selected,
    badge: selected ? "Ship" : index === 17 ? "QA" : undefined,
  };
});

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const timelineEvents = [
  { id: "install", label: "Dependencies installed", description: "Next and ApexUI packages resolved.", meta: "09:00" },
  { id: "compose", label: "Atomic app composed", description: "Atoms through organisms drive full dashboard flow.", meta: "09:18" },
  { id: "build", label: "Static export verified", description: "Next build writes static output.", meta: "09:31" },
];

export const treeItems = [
  {
    id: "app",
    label: "app",
    children: [
      { id: "page", label: "page.tsx" },
      {
        id: "components",
        label: "components",
        children: [
          { id: "atoms", label: "atoms" },
          { id: "molecules", label: "molecules" },
          { id: "organisms", label: "organisms" },
        ],
      },
      { id: "data", label: "data" },
    ],
  },
];

export const screenshots = [
  {
    alt: "Route matrix preview",
    caption: "Static routes",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' rx='12' fill='%23eef3f8'/%3E%3Crect x='24' y='28' width='120' height='18' rx='4' fill='%2318212f'/%3E%3Crect x='24' y='64' width='272' height='14' rx='4' fill='%23d7e0ea'/%3E%3Crect x='24' y='92' width='224' height='14' rx='4' fill='%23d7e0ea'/%3E%3Crect x='24' y='120' width='256' height='14' rx='4' fill='%230f766e'/%3E%3C/svg%3E",
  },
  {
    alt: "Workflow board preview",
    caption: "Release work",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' rx='12' fill='%23f6f8fb'/%3E%3Crect x='24' y='28' width='72' height='124' rx='8' fill='%23ffffff'/%3E%3Crect x='124' y='28' width='72' height='124' rx='8' fill='%23ffffff'/%3E%3Crect x='224' y='28' width='72' height='124' rx='8' fill='%23ffffff'/%3E%3Crect x='36' y='48' width='48' height='12' rx='3' fill='%2318212f'/%3E%3Crect x='136' y='48' width='48' height='12' rx='3' fill='%230f766e'/%3E%3Crect x='236' y='48' width='48' height='12' rx='3' fill='%235f6f83'/%3E%3C/svg%3E",
  },
];
