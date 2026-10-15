import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import { ActionSlot, Panel } from "./StatusMessage.styles";

type StatusMessageProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function StatusMessage({
  title,
  description,
  action,
}: StatusMessageProps) {
  return (
    <Panel role="status">
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary">{description}</Typography>
      )}
      {action && <ActionSlot>{action}</ActionSlot>}
    </Panel>
  );
}
