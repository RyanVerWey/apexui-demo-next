import type { IconName } from "@apexui/react";

export type AppRoute = {
  id: string;
  href: string;
  label: string;
  shortLabel: string;
  icon: IconName;
};

export const appRoutes: AppRoute[] = [
  { id: "home", href: "/", label: "Marketing Home", shortLabel: "Home", icon: "home" },
  { id: "dashboard", href: "/dashboard", label: "Metrics Dashboard", shortLabel: "Metrics", icon: "chartBar" },
  { id: "work-orders", href: "/work-orders", label: "Work Orders", shortLabel: "Orders", icon: "clipboardList" },
  { id: "customers", href: "/customers", label: "Customer Records", shortLabel: "Customers", icon: "customer" },
  { id: "settings", href: "/settings", label: "Settings & Account", shortLabel: "Settings", icon: "settings" },
  { id: "about", href: "/about", label: "Package Proof", shortLabel: "Proof", icon: "package" },
];

export const fieldMetrics = [
  { label: "First-visit resolution", value: 92 },
  { label: "Dispatch utilization", value: 87 },
  { label: "Quote conversion", value: 74 },
  { label: "SLA compliance", value: 96 },
];

export const revenueMix = [
  { label: "HVAC", value: 44 },
  { label: "Electrical", value: 27 },
  { label: "Facilities", value: 18 },
  { label: "Warranty", value: 11 },
];

export const dispatchHealth = [
  { label: "On route", value: 84 },
  { label: "Parts ready", value: 71 },
  { label: "At risk", value: 19 },
  { label: "Closed", value: 93 },
];

export const workStages = [
  {
    id: "triage",
    title: "Triage",
    items: [
      { id: "leak", title: "Warehouse roof leak", meta: "SLA 2h" },
      { id: "cooler", title: "Cooler compressor alarm", meta: "Priority" },
    ],
  },
  {
    id: "dispatch",
    title: "Dispatch",
    items: [
      { id: "panel", title: "Panel inspection", meta: "Crew B" },
      { id: "retrofit", title: "Lighting retrofit", meta: "Crew D" },
    ],
  },
  {
    id: "closeout",
    title: "Closeout",
    items: [
      { id: "invoice", title: "Photo evidence review", meta: "Finance" },
      { id: "qa", title: "Customer signoff", meta: "Ops" },
    ],
  },
];

export const pipelineColumns = [
  { key: "account", header: "Account" },
  { key: "segment", header: "Segment" },
  { key: "stage", header: "Stage" },
  { key: "owner", header: "Owner" },
  { key: "value", header: "Value" },
];

export const pipelineRecords = [
  { account: "Ridgeline Grocers", segment: "Retail", stage: "Expansion", owner: "Mara Chen", value: "$128k" },
  { account: "Cobalt County Schools", segment: "Public sector", stage: "Renewal", owner: "Owen Hart", value: "$92k" },
  { account: "Summit Cold Storage", segment: "Industrial", stage: "At risk", owner: "Eli Ramos", value: "$47k" },
  { account: "Haven Health Clinics", segment: "Healthcare", stage: "Implementation", owner: "Priya Shah", value: "$214k" },
];

export const crewRows = [
  { crew: "Crew A", lead: "Jordan Lee", region: "North", jobs: "8", score: "94%" },
  { crew: "Crew B", lead: "Mina Patel", region: "West", jobs: "11", score: "89%" },
  { crew: "Crew C", lead: "Theo Brooks", region: "Central", jobs: "6", score: "97%" },
  { crew: "Crew D", lead: "Nadia Flores", region: "South", jobs: "9", score: "91%" },
];

export const timelineEvents = [
  { id: "intake", label: "Emergency intake", description: "Priority order routed to dispatch.", meta: "07:45" },
  { id: "crew", label: "Crew assigned", description: "Crew B accepted with stocked parts.", meta: "08:02" },
  { id: "proof", label: "Proof captured", description: "Photos and customer signature uploaded.", meta: "10:35" },
];

export const packageRows = [
  { package: "@apexui/react", role: "React component primitives, molecules, organisms", evidence: "Imported in App Router pages" },
  { package: "@apexui/tokens", role: "Graphite light/dark token source", evidence: "Loaded through @apexui/tokens/css" },
  { package: "next", role: "App Router static export", evidence: "Route folders under app/" },
];
