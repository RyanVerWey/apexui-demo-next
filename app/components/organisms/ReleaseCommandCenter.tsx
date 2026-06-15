"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  Alert,
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  BottomNavigation,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Chart,
  Checkbox,
  DataGrid,
  DataTable,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  EmptyState,
  FileUpload,
  FloatingActionButton,
  Icon,
  ImageList,
  List,
  MenuBar,
  NumberField,
  Pagination,
  Paper,
  Popover,
  Progress,
  RadioGroup,
  Rating,
  SearchForm,
  Select,
  Sidebar,
  Slider,
  Snackbar,
  SpeedDial,
  Stack,
  Stepper,
  Tabs,
  Textarea,
  TextInput,
  Timeline,
  ToggleGroup,
  Toolbar,
  Tooltip,
  TransferList,
  TreeView,
  Typography,
  WorkflowBoard,
} from "@apexui/react";
import type { ChangeEventHandler, ReactEventHandler } from "react";
import { IconLabel } from "../atoms/IconLabel";
import { ThemeModeSwitch } from "../molecules/ThemeModeSwitch";
import {
  calendarDays,
  componentColumns,
  componentRows,
  healthMetrics,
  menuItems,
  navigationItems,
  routeColumns,
  routeRows,
  screenshots,
  timelineEvents,
  transferSourceItems,
  transferTargetItems,
  treeItems,
  weekdays,
  workflowColumns,
  type ThemeMode,
} from "../../data/demo";

export function ReleaseCommandCenter() {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [activeNav, setActiveNav] = useState("overview");
  const [activeTab, setActiveTab] = useState("routes");
  const [releaseView, setReleaseView] = useState("static");
  const [density, setDensity] = useState("balanced");
  const [rating, setRating] = useState(4);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [quickActionsOpen, setQuickActionsOpen] = useState(true);

  const theme = `graphite-${mode}`;
  const handleSidebarSelect = ((id: string) => setActiveNav(id)) as ReactEventHandler<HTMLElement> & ((id: string) => void);
  const handleBottomNavChange = ((id: string) => setActiveNav(id)) as ChangeEventHandler<HTMLElement> & ((id: string) => void);
  const releaseChart = useMemo(
    () => [
      { label: "Static", value: releaseView === "static" ? 96 : 84 },
      { label: "Client", value: releaseView === "client" ? 89 : 72 },
      { label: "Token", value: 100 },
      { label: "A11y", value: density === "compact" ? 82 : 90 },
    ],
    [density, releaseView],
  );

  return (
    <main className="app-shell" data-apex-theme={theme}>
      <AppBar
        title="ApexUI Next Release"
        navigation={<Breadcrumbs items={[{ label: "ApexUI", href: "#" }, { label: "Demos", href: "#" }, { label: "Next", current: true }]} />}
        actions={
          <div className="app-top-actions">
            <Tooltip content="Open release brief">
              <Button size="sm" variant="secondary" onClick={() => setDrawerOpen(true)}>
                <IconLabel icon="notebookTabs">Brief</IconLabel>
              </Button>
            </Tooltip>
            <ThemeModeSwitch mode={mode} onModeChange={setMode} />
          </div>
        }
      />

      <div className="app-main">
        <div className="app-layout">
          <aside className="app-sidebar-area">
            <Sidebar
              activeId={activeNav}
              footer={<Badge tone="info">{theme}</Badge>}
              heading="Command"
              items={navigationItems}
              label="Product areas"
              onSelect={handleSidebarSelect}
            />
            <BottomNavigation
              activeId={activeNav}
              items={[
                { id: "overview", label: "Home", icon: <Icon name="home" size="sm" decorative /> },
                { id: "routes", label: "Routes", icon: <Icon name="route" size="sm" decorative /> },
                { id: "settings", label: "Settings", icon: <Icon name="settings" size="sm" decorative /> },
              ]}
              label="Mobile sections"
              onChange={handleBottomNavChange}
            />
          </aside>

          <section className="app-page">
            <MenuBar
              items={menuItems.map((item) => ({
                ...item,
                current: item.id === activeNav || item.id === activeTab,
                onSelect: () => {
                  setActiveNav(item.id);
                  setActiveTab(item.id === "release" ? "workflow" : item.id);
                },
              }))}
              label="Release navigation"
            />

            <Paper>
              <div className="app-hero">
                <Stack gap="md">
                  <Badge tone="info">Next.js app router</Badge>
                  <Typography as="h1" variant="display">
                    Release operations app for ApexUI in Next.
                  </Typography>
                  <Typography variant="body">
                    Token modes, navigation, data, forms, workflow, feedback, and overlays are composed from ApexUI React components.
                  </Typography>
                  <SearchForm label="Search release system" placeholder="Find route, owner, token, task" onSubmit={() => setSnackbarOpen(true)} />
                  <div className="app-actions">
                    <Button onClick={() => setDialogOpen(true)}>
                      <IconLabel icon="rocket">Promote build</IconLabel>
                    </Button>
                    <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
                      <IconLabel icon="clipboardList">Open brief</IconLabel>
                    </Button>
                  </div>
                </Stack>

                <Card eyebrow="Today" title="Static export">
                  <Stack gap="md">
                    <Progress label="Release readiness" value={94} />
                    <Stepper steps={[{ id: "install", label: "Install" }, { id: "compose", label: "Compose" }, { id: "build", label: "Build" }]} activeIndex={2} />
                    <Alert tone="success" title="Graphite token modes">
                      App-level switch controls light and dark mode through `data-apex-theme`.
                    </Alert>
                  </Stack>
                </Card>
              </div>
            </Paper>

            <Toolbar
              label="Release controls"
              actions={
                <ButtonGroup label="Primary actions">
                  <Button size="sm" onClick={() => setSnackbarOpen(true)}>
                    <IconLabel icon="refresh">Refresh</IconLabel>
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setQuickActionsOpen((open) => !open)}>
                    <IconLabel icon="bolt">Actions</IconLabel>
                  </Button>
                </ButtonGroup>
              }
            />

            <div className="app-metric-grid">
              {healthMetrics.map((metric) => (
                <Card key={metric.label} eyebrow="Signal" title={metric.label}>
                  <Progress label={`${metric.value}%`} value={metric.value} />
                </Card>
              ))}
            </div>

            <div className="app-grid-two app-grid-two-main">
              <Chart label="Release health" data={releaseChart} />
              <Card eyebrow="Scope" title="Atomic coverage">
                <Stack gap="md">
                  <ToggleGroup
                    label="Release view"
                    onValueChange={setReleaseView}
                    options={[
                      { label: "Static", value: "static" },
                      { label: "Client", value: "client" },
                      { label: "Tokens", value: "tokens" },
                    ]}
                    value={releaseView}
                  />
                  <Select
                    label="Density"
                    onChange={(event) => setDensity(event.currentTarget.value)}
                    options={[
                      { label: "Balanced", value: "balanced" },
                      { label: "Compact", value: "compact" },
                      { label: "Spacious", value: "spacious" },
                    ]}
                    value={density}
                  />
                  <Slider label="Evidence threshold" min={0} max={100} defaultValue={88} />
                  <Rating label="Launch confidence" value={rating} onValueChange={setRating} />
                </Stack>
              </Card>
            </div>

            <Tabs
              activeId={activeTab}
              items={[
                { id: "routes", label: "Routes" },
                { id: "workflow", label: "Workflow" },
                { id: "settings", label: "Settings" },
                { id: "tokens", label: "Tokens" },
              ]}
              label="Workspace"
              onChange={setActiveTab}
            />

            {activeTab === "routes" && (
              <div className="app-grid-two app-grid-two-main">
                <Stack gap="md">
                  <DataGrid caption="Route matrix" columns={routeColumns} rows={routeRows} />
                  <Pagination count={4} label="Route pages" page={page} onPageChange={setPage} />
                </Stack>
                <Card eyebrow="Inspector" title="Route metadata">
                  <Stack gap="md">
                    <Autocomplete label="Owner" options={["Product systems", "Platform", "Design system", "Release"]} />
                    <TextInput label="Route title" defaultValue="Executive route health" />
                    <Textarea label="Release note" defaultValue="Static path verified with graphite token modes and ApexUI composition." />
                    <DatePicker label="Launch date" defaultValue="2026-06-20" />
                    <NumberField label="Routes verified" defaultValue={18} min={0} />
                    <Checkbox label="Include static export evidence" defaultChecked />
                  </Stack>
                </Card>
              </div>
            )}

            {activeTab === "workflow" && (
              <div className="app-grid-two">
                <WorkflowBoard columns={workflowColumns} />
                <Stack gap="md">
                  <Calendar days={calendarDays} label="Release calendar" monthLabel="June 2026" weekdays={weekdays} />
                  <TransferList sourceItems={transferSourceItems} sourceTitle="Backlog" targetItems={transferTargetItems} targetTitle="Committed" />
                </Stack>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="app-grid-two app-grid-two-main">
                <Card eyebrow="Controls" title="App settings">
                  <Stack gap="md">
                    <RadioGroup
                      label="Rendering target"
                      name="rendering"
                      options={[
                        { label: "Static", value: "static" },
                        { label: "Hybrid", value: "hybrid" },
                        { label: "Client", value: "client" },
                      ]}
                      value="static"
                    />
                    <FileUpload
                      actionLabel="Attach report"
                      description="Build logs, screenshots, or QA notes."
                      files={[{ name: "next-build.txt", meta: "verified" }]}
                      label="Release evidence"
                    />
                    <Checkbox label="Notify package owners" defaultChecked />
                    <Checkbox label="Require visual pass before deploy" defaultChecked />
                  </Stack>
                </Card>
                <Card eyebrow="Structure" title="Atomic file map">
                  <TreeView items={treeItems} label="Demo files" />
                </Card>
              </div>
            )}

            {activeTab === "tokens" && (
              <div className="app-grid-two app-grid-two-main">
                <Stack gap="md">
                  <DataTable caption="Component inventory" columns={componentColumns} rows={componentRows} />
                  <ImageList columns="two" items={screenshots} />
                </Stack>
                <Card eyebrow="People" title="Release crew">
                  <Stack gap="md">
                    <div className="app-avatar-row">
                      <Avatar initials="MV" size="lg" />
                      <Avatar initials="OH" size="lg" />
                      <Avatar initials="ER" size="lg" />
                    </div>
                    <List
                      items={[
                        { id: "tokens", label: "Token owner", description: "Graphite light/dark modes", meta: "Design" },
                        { id: "next", label: "Next owner", description: "App router static export", meta: "Platform" },
                        { id: "qa", label: "QA owner", description: "Build and responsive pass", meta: "Release" },
                      ]}
                    />
                  </Stack>
                </Card>
              </div>
            )}

            <div className="app-grid-two">
              <Accordion
                items={[
                  { id: "hydration", title: "Hydration boundary", content: "Stateful release controls live inside client components." },
                  { id: "theme", title: "Token mode", content: "Graphite light and dark themes are applied at app shell level." },
                  { id: "css", title: "CSS scope", content: "Demo CSS controls layout, spacing, and responsive structure only." },
                ]}
              />
              <Timeline events={timelineEvents} />
            </div>

            <Divider />

            <EmptyState
              action={
                <Button size="sm" variant="secondary" onClick={() => setDialogOpen(true)}>
                  View publish gate
                </Button>
              }
              description="All visible workflows use ApexUI primitives, molecules, and organisms with graphite tokens."
              title="Demo ready for local review"
            />
          </section>
        </div>
      </div>

      <Popover
        content={<Badge tone="success">Static export target</Badge>}
        open
        placement="top"
        trigger={
          <FloatingActionButton aria-label="Release status" size="md" variant="primary" onClick={() => setSnackbarOpen(true)}>
            <Icon name="rocket" size="md" decorative />
          </FloatingActionButton>
        }
      />

      <SpeedDial
        actions={[
          { id: "audit", label: "Audit", icon: <Icon name="clipboardCheck" size="sm" decorative />, onSelect: () => setSnackbarOpen(true) },
          { id: "issue", label: "Issue", icon: <Icon name="ticket" size="sm" decorative />, onSelect: () => setDrawerOpen(true) },
          { id: "ship", label: "Ship", icon: <Icon name="rocket" size="sm" decorative />, onSelect: () => setDialogOpen(true) },
        ]}
        label="Quick actions"
        open={quickActionsOpen}
      />

      <Drawer open={drawerOpen} side="right" title="Release brief" onClose={() => setDrawerOpen(false)}>
        <Stack gap="md">
          <Typography variant="body">Graphite token modes, Next app router, and ApexUI component layers are wired in one product app.</Typography>
          <List
            items={[
              { id: "scope", label: "Scope", description: "Local demo app only", meta: "Bounded" },
              { id: "build", label: "Build", description: "Run `npm run build`", meta: "Required" },
              { id: "risk", label: "Risk", description: "Published package ESM direct Node import lacks extensions", meta: "Upstream" },
            ]}
          />
        </Stack>
      </Drawer>

      <Dialog
        actions={
          <ButtonGroup label="Publish decision">
            <Button size="sm" onClick={() => setDialogOpen(false)}>
              Confirm
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
          </ButtonGroup>
        }
        description="Final gate checks static build, component coverage, and token mode behavior."
        open={dialogOpen}
        title="Promote static demo"
        onClose={() => setDialogOpen(false)}
      >
        <Alert tone="info" title="No deploy from this worker">
          Local build only. No push or publish action.
        </Alert>
      </Dialog>

      <Snackbar
        action={
          <Button size="sm" variant="secondary" onClick={() => setSnackbarOpen(false)}>
            Dismiss
          </Button>
        }
        open={snackbarOpen}
        tone="success"
      >
        Next demo app composed with ApexUI React and graphite tokens.
      </Snackbar>
    </main>
  );
}
