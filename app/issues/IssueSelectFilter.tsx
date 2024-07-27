"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueSelectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <>
      <Select.Root
        defaultValue={searchParams.get("status") || "all"}
        onValueChange={(status) => {
          const query = status === "all" ? "" : `?status=${status}`;
          router.push("/issues" + query);
        }}
      >
        <Select.Trigger placeholder="Filter by status..." variant="soft" />
        <Select.Content>
          <Select.Group>
            {statuses?.map((status) => (
              <Select.Item key={status.value} value={status.value || "all"}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueSelectFilter;
