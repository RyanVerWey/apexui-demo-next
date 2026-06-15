"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Autocomplete,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Chart,
  Checkbox,
  Chip,
  DataGrid,
  DataTable,
  DatePicker,
  Divider,
  EmptyState,
  FileUpload,
  Icon,
  ImageList,
  List,
  NumberField,
  Pagination,
  Paper,
  Progress,
  RadioGroup,
  Rating,
  SearchForm,
  Select,
  Slider,
  Stack,
  Stepper,
  Tabs,
  Textarea,
  TextInput,
  Timeline,
  ToggleGroup,
  Toolbar,
  TransferList,
  Typography,
  WorkflowBoard,
} from "@apexui/react";
import { crewRows, dispatchHealth, fieldMetrics, packageRows, pipelineColumns, pipelineRecords, revenueMix, timelineEvents, workStages } from "../../data/northstar";
import { IconLabel } from "../atoms/IconLabel";

const workOrderColumns = [
  { key: "id", header: "Order" },
  { key: "site", header: "Site" },
  { key: "priority", header: "Priority" },
  { key: "window", header: "Window" },
  { key: "status", header: "Status" },
];

const workOrderRows = [
  { id: "WO-1842", site: "Summit Cold Storage", priority: <Badge tone="danger">Critical</Badge>, window: "08:00-10:00", status: <Chip selected>Assigned</Chip> },
  { id: "WO-1843", site: "Ridgeline Grocers", priority: <Badge tone="warning">High</Badge>, window: "10:00-12:00", status: <Chip>Parts hold</Chip> },
  { id: "WO-1844", site: "Haven Health Clinics", priority: <Badge tone="info">Routine</Badge>, window: "13:00-15:00", status: <Chip selected>Ready</Chip> },
];

type CrewRow = (typeof crewRows)[number];

const crewColumns: Array<{ key: keyof CrewRow; header: string }> = [
  { key: "crew", header: "Crew" },
  { key: "lead", header: "Lead" },
  { key: "region", header: "Region" },
  { key: "jobs", header: "Jobs" },
  { key: "score", header: "Quality" },
];

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const day = index - 1;
  return {
    id: `day-${index}`,
    label: index < 2 || index > 31 ? "" : String(day),
    muted: index < 2 || index > 31,
    selected: day === 18,
    badge: day === 18 ? "SLA" : day === 23 ? "Crew" : undefined,
  };
});

export function MarketingHomePage() {
  return (
    <>
      <Paper>
        <section className="app-hero">
          <Stack gap="md">
            <Badge tone="info">Regional field operations</Badge>
            <Typography as="h1" variant="display">
              Northstar keeps service teams moving from intake to proof.
            </Typography>
            <Typography variant="body">
              Dispatchers, account managers, and technicians share one premium workspace for routing, SLA recovery, customer proof, and closeout.
            </Typography>
            <div className="app-actions">
              <Link className="apex-button apex-button-primary apex-button-md" href="/dashboard">
                <IconLabel icon="chartBar">Open metrics</IconLabel>
              </Link>
              <Link className="apex-button apex-button-secondary apex-button-md" href="/work-orders">
                <IconLabel icon="clipboardList">Create work order</IconLabel>
              </Link>
            </div>
          </Stack>
          <div className="app-visual-panel" aria-label="Northstar field service operations preview">
            <div className="app-map-line app-map-line-a" />
            <div className="app-map-line app-map-line-b" />
            <span className="app-map-pin app-map-pin-a">A</span>
            <span className="app-map-pin app-map-pin-b">B</span>
            <span className="app-map-pin app-map-pin-c">C</span>
            <div className="app-visual-stat">
              <strong>96%</strong>
              <span>SLA coverage</span>
            </div>
          </div>
        </section>
      </Paper>

      <div className="app-metric-grid">
        {fieldMetrics.map((metric) => (
          <Card key={metric.label} eyebrow="Live signal" title={metric.label}>
            <Progress label={`${metric.value}%`} value={metric.value} />
          </Card>
        ))}
      </div>

      <div className="app-grid-two app-grid-two-main">
        <Stack gap="md">
          <Card eyebrow="Product offer" title="Operations command center">
            <List
              items={[
                { id: "dispatch", label: "Dispatch orchestration", description: "Route jobs by region, skill, SLA, and parts readiness.", meta: "Core" },
                { id: "proof", label: "Customer proof", description: "Capture photos, signatures, and closeout notes before invoice.", meta: "Field" },
                { id: "pipeline", label: "Account growth", description: "Track renewals, expansion work, and risk signals.", meta: "Revenue" },
              ]}
            />
          </Card>
          <Alert tone="success" title="Customer proof">
            Haven Health cut missed maintenance windows by 38% after moving field evidence and account follow-up into one workflow.
          </Alert>
        </Stack>
        <Chart label="Revenue mix by service line" data={revenueMix} />
      </div>

      <Accordion
        items={[
          { id: "story", title: "Business story", content: "Northstar Field Services supports regional facilities teams that need fast dispatch, premium reporting, and reliable closeout proof." },
          { id: "cta", title: "Primary CTA", content: "The demo routes model a working sales site and authenticated app using native Next.js App Router folders." },
        ]}
      />
    </>
  );
}

export function MetricsDashboardPage() {
  const [page, setPage] = useState(1);

  return (
    <>
      <Toolbar
        label="Metrics dashboard actions"
        actions={
          <ButtonGroup label="Dashboard actions">
            <Button size="sm" variant="secondary">
              <IconLabel icon="filter">Filter</IconLabel>
            </Button>
            <Button size="sm">
              <IconLabel icon="download">Export</IconLabel>
            </Button>
          </ButtonGroup>
        }
      />
      <div className="app-metric-grid">
        {fieldMetrics.map((metric) => (
          <Card key={metric.label} eyebrow="North region" title={metric.label}>
            <Progress label={`${metric.value}%`} value={metric.value} />
          </Card>
        ))}
      </div>
      <div className="app-grid-two">
        <Chart label="Dispatch health by workflow" data={dispatchHealth} />
        <WorkflowBoard columns={workStages} />
      </div>
      <div className="app-grid-two app-grid-two-main">
        <Stack gap="md">
          <DataGrid caption="Active work orders" columns={workOrderColumns} rows={workOrderRows} />
          <Pagination count={3} label="Work order pages" page={page} onPageChange={setPage} />
        </Stack>
        <Card eyebrow="Status widgets" title="Today at a glance">
          <Stack gap="md">
            <Stepper steps={[{ id: "intake", label: "Intake" }, { id: "route", label: "Route" }, { id: "field", label: "Field" }, { id: "proof", label: "Proof" }]} activeIndex={2} />
            <Timeline events={timelineEvents} />
          </Stack>
        </Card>
      </div>
    </>
  );
}

export function WorkOrderPage() {
  const [priority, setPriority] = useState("high");
  const [summary, setSummary] = useState("");
  const summaryError = summary.length > 0 && summary.length < 12 ? "Add at least 12 characters so dispatch has context." : undefined;

  return (
    <>
      <Paper>
        <Stack gap="md">
          <Badge tone="warning">New intake</Badge>
          <Typography as="h1" variant="title">
            Create work order
          </Typography>
          <Typography variant="body">Real form controls model dispatch intake, validation, evidence upload, dates, selections, and help copy.</Typography>
        </Stack>
      </Paper>
      <div className="app-grid-two app-grid-two-main">
        <Card eyebrow="Dispatch form" title="Service request">
          <form className="app-form">
            <TextInput label="Customer site" defaultValue="Summit Cold Storage - Dock 4" hint="Use account and site label from customer records." />
            <TextInput label="Job summary" value={summary} onChange={(event) => setSummary(event.currentTarget.value)} error={summaryError} placeholder="Describe issue and business impact" />
            <Select
              label="Service line"
              options={[
                { label: "HVAC and refrigeration", value: "hvac" },
                { label: "Electrical", value: "electrical" },
                { label: "Facilities maintenance", value: "facilities" },
              ]}
              hint="Routes to skill and parts rules."
            />
            <RadioGroup
              label="Priority"
              name="priority"
              onValueChange={setPriority}
              options={[
                { label: "Critical", value: "critical", description: "SLA under 2 hours" },
                { label: "High", value: "high", description: "Same-day dispatch" },
                { label: "Routine", value: "routine", description: "Schedule next route" },
              ]}
              value={priority}
            />
            <div className="app-form-row">
              <DatePicker label="Requested date" defaultValue="2026-06-18" />
              <NumberField label="Estimated hours" defaultValue={4} min={1} max={12} />
            </div>
            <Autocomplete label="Preferred crew" options={["Crew A - North", "Crew B - West", "Crew C - Central", "Crew D - South"]} />
            <Textarea label="Technician instructions" defaultValue="Bring compressor relay kit, inspect drain line, capture before/after photos." />
            <FileUpload
              actionLabel="Attach files"
              description="Photos, warranty documents, floor plans, or signed authorization."
              files={[{ name: "compressor-alarm.png", meta: "site upload" }]}
              label="Evidence upload"
              multiple
            />
            <Checkbox label="Customer approved after-hours access" description="Dispatch may schedule crew outside standard receiving hours." defaultChecked />
            <Button type="button">
              <IconLabel icon="send">Queue dispatch</IconLabel>
            </Button>
          </form>
        </Card>
        <Stack gap="md">
          <Alert tone={summaryError ? "warning" : "success"} title="Validation smoke">
            Summary field shows inline error copy until dispatch context is long enough.
          </Alert>
          <Calendar days={calendarDays} label="Dispatch calendar" monthLabel="June 2026" weekdays={weekdays} />
        </Stack>
      </div>
    </>
  );
}

export function CustomerRecordsPage() {
  const rows = pipelineRecords.map((record) => ({
    ...record,
    stage: record.stage === "At risk" ? <Badge tone="warning">{record.stage}</Badge> : <Badge tone="success">{record.stage}</Badge>,
  }));

  return (
    <>
      <Toolbar
        label="Customer records"
        actions={
          <SearchForm label="Search customer records" placeholder="Account, owner, region" onSubmit={() => undefined} />
        }
      />
      <div className="app-grid-two app-grid-two-main">
        <DataGrid caption="Pipeline records" columns={pipelineColumns} rows={rows} />
        <Card eyebrow="Account detail" title="Haven Health Clinics">
          <Stack gap="md">
            <div className="app-avatar-row">
              <Avatar initials="PS" size="lg" />
              <div>
                <Typography as="strong" variant="subtitle">Priya Shah</Typography>
                <Typography variant="caption">Strategic account owner</Typography>
              </div>
            </div>
            <List
              items={[
                { id: "sla", label: "SLA", description: "24 clinics covered by premium response.", meta: "96%" },
                { id: "renewal", label: "Renewal", description: "Expansion proposal due this month.", meta: "$214k" },
                { id: "risk", label: "Risk", description: "Two sites missing asset inventory.", meta: "Watch" },
              ]}
            />
            <Rating label="Account health" value={4} />
          </Stack>
        </Card>
      </div>
      <div className="app-grid-two">
        <DataTable caption="Crew coverage" columns={crewColumns} rows={crewRows} />
        <TransferList
          sourceTitle="Prospects"
          targetTitle="Active customers"
          sourceItems={[
            { id: "municipal", label: "Municipal transit depot" },
            { id: "hotel", label: "Harbor hotel group" },
          ]}
          targetItems={[
            { id: "haven", label: "Haven Health Clinics", selected: true },
            { id: "ridgeline", label: "Ridgeline Grocers", selected: true },
          ]}
        />
      </div>
    </>
  );
}

export function SettingsAccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [locale, setLocale] = useState("en-us");
  const [density, setDensity] = useState("balanced");

  return (
    <>
      <Tabs
        activeId={activeTab}
        items={[
          { id: "profile", label: "Profile" },
          { id: "preferences", label: "Preferences" },
          { id: "security", label: "Security" },
        ]}
        label="Settings sections"
        onChange={setActiveTab}
      />
      {activeTab === "profile" && (
        <div className="app-grid-two app-grid-two-main">
          <Card eyebrow="Account" title="Dispatcher profile">
            <Stack gap="md">
              <TextInput label="Name" defaultValue="Mara Chen" />
              <TextInput label="Email" defaultValue="mara@northstar.example" type="email" />
              <Select
                label="Locale"
                value={locale}
                onChange={(event) => setLocale(event.currentTarget.value)}
                options={[
                  { label: "English (United States)", value: "en-us" },
                  { label: "English (Canada)", value: "en-ca" },
                  { label: "Spanish (United States)", value: "es-us" },
                ]}
              />
            </Stack>
          </Card>
          <Card eyebrow="Theme" title="Display controls">
            <Stack gap="md">
              <Alert tone="info" title="Graphite mode">
                Global light/dark switch lives in the app bar and updates the active ApexUI token theme.
              </Alert>
              <ToggleGroup
                label="Density"
                value={density}
                onValueChange={setDensity}
                options={[
                  { label: "Compact", value: "compact" },
                  { label: "Balanced", value: "balanced" },
                  { label: "Spacious", value: "spacious" },
                ]}
              />
              <Slider label="Notification volume" min={0} max={100} defaultValue={62} />
            </Stack>
          </Card>
        </div>
      )}
      {activeTab === "preferences" && (
        <div className="app-grid-two">
          <Card eyebrow="Workflow" title="Dispatch preferences">
            <Stack gap="md">
              <Checkbox label="Auto-assign crews when SLA is under two hours" defaultChecked />
              <Checkbox label="Require customer signature before invoice" defaultChecked />
              <Checkbox label="Send renewal alerts to account owners" />
            </Stack>
          </Card>
          <Card eyebrow="Channels" title="Notifications">
            <RadioGroup
              label="Primary notification channel"
              name="channel"
              value="email"
              options={[
                { label: "Email", value: "email", description: "Best for closeout packets" },
                { label: "SMS", value: "sms", description: "Best for urgent dispatch" },
                { label: "In-app", value: "app", description: "Best for dashboard users" },
              ]}
            />
          </Card>
        </div>
      )}
      {activeTab === "security" && (
        <div className="app-grid-two app-grid-two-main">
          <Card eyebrow="Access" title="Account security">
            <Stack gap="md">
              <TextInput label="Role" defaultValue="Regional operations lead" />
              <Checkbox label="Require MFA for invoice exports" defaultChecked />
              <Checkbox label="Lock account after five failed sign-in attempts" defaultChecked />
            </Stack>
          </Card>
          <EmptyState
            title="Audit log clean"
            description="No suspicious sign-in or package integration events in the last 30 days."
            action={<Button variant="secondary">Review log</Button>}
          />
        </div>
      )}
    </>
  );
}

export function PackageProofPage() {
  return (
    <>
      <Paper>
        <Stack gap="md">
          <Badge tone="info">Package proof</Badge>
          <Typography as="h1" variant="title">
            ApexUI packages installed in a real Next.js app.
          </Typography>
          <Typography variant="body">
            This route documents framework-specific integration: App Router folders, static export config, ApexUI React imports, and graphite token CSS.
          </Typography>
        </Stack>
      </Paper>
      <div className="app-grid-two app-grid-two-main">
        <DataGrid
          caption="Installed package evidence"
          columns={[
            { key: "package", header: "Package" },
            { key: "role", header: "Role" },
            { key: "evidence", header: "Evidence" },
          ]}
          rows={packageRows}
        />
        <Card eyebrow="Framework" title="Next.js App Router">
          <List
            items={[
              { id: "routes", label: "Native route folders", description: "Home, dashboard, work orders, customers, settings, and about.", meta: "app/" },
              { id: "static", label: "Static export", description: "next.config.mjs keeps GitHub Pages base path.", meta: "output" },
              { id: "theme", label: "Token theme", description: "Graphite dark default, shell-level light/dark toggle.", meta: "tokens" },
            ]}
          />
        </Card>
      </div>
      <div className="app-grid-two">
        <ImageList
          columns="two"
          items={[
            {
              alt: "Northstar dashboard proof",
              caption: "Dashboard route",
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' rx='12' fill='%2320252d'/%3E%3Crect x='24' y='24' width='104' height='18' rx='4' fill='%23f4f7fb'/%3E%3Crect x='24' y='62' width='272' height='18' rx='4' fill='%23343b46'/%3E%3Crect x='24' y='100' width='208' height='18' rx='4' fill='%239ca3af'/%3E%3Crect x='24' y='138' width='244' height='18' rx='4' fill='%23d1d5db'/%3E%3C/svg%3E",
            },
            {
              alt: "Northstar work order proof",
              caption: "Work order route",
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' rx='12' fill='%23f7f7f8'/%3E%3Crect x='28' y='28' width='264' height='22' rx='5' fill='%231f2937'/%3E%3Crect x='28' y='70' width='120' height='58' rx='8' fill='%23d1d5db'/%3E%3Crect x='172' y='70' width='120' height='58' rx='8' fill='%239ca3af'/%3E%3Crect x='28' y='146' width='180' height='12' rx='4' fill='%231f2937'/%3E%3C/svg%3E",
            },
          ]}
        />
        <Card eyebrow="Acceptance" title="Demo surface">
          <Stack gap="md">
            <Alert tone="success" title="No preview wall">
              Components appear in business workflows: metrics, forms, records, preferences, and package proof.
            </Alert>
            <Divider />
            <Typography variant="caption">Build verification remains local. No push or deploy from this worker.</Typography>
          </Stack>
        </Card>
      </div>
    </>
  );
}
