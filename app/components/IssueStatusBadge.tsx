import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

interface Props {
  status: Status;
  size?: "1" | "2" | "3";
}

const IssueStatusBadge = ({ status, size = "1" }: Props) => {
  return (
    <Badge color={statusMap[status].color} size={size}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
