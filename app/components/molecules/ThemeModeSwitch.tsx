import { Badge, Switch } from "@apexui/react";
import type { ThemeMode } from "../../data/demo";

export function ThemeModeSwitch({
  mode,
  onModeChange,
}: {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}) {
  return (
    <div className="app-theme-switch">
      <Switch
        checked={mode === "dark"}
        description="Graphite token mode"
        label="Dark mode"
        onChange={(event) => onModeChange(event.currentTarget.checked ? "dark" : "light")}
      />
      <Badge tone="info">graphite-{mode}</Badge>
    </div>
  );
}
