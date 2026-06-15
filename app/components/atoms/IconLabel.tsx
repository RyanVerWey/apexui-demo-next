import { Icon, type IconName } from "@apexui/react";
import type { ReactNode } from "react";

export function IconLabel({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <span className="app-icon-label">
      <Icon name={icon} size="sm" decorative />
      <span>{children}</span>
    </span>
  );
}
