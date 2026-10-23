import Badge, { type BadgeTone } from "@/components/ui/Badge";
import type { ProjectStatus } from "@/types";

const STATUS_TONES: Record<ProjectStatus, BadgeTone> = {
  active: "success",
  paused: "warning",
  done: "neutral",
};

/** Used by both the dashboard and project pages, so it lives in components/shared. */
const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  return (
    <Badge tone={STATUS_TONES[status]} className="shrink-0 capitalize">
      {status}
    </Badge>
  );
};

export default StatusBadge;
