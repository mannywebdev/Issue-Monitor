import { Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "./components";
import { Status } from "@prisma/client";

const IssuesSummary = ({
  open,
  inProgress,
  closed,
}: {
  open: number;
  inProgress: number;
  closed: number;
}) => {
  const statusDetails: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="3">
      {statusDetails.map((statusDetail) => (
        <Card key={statusDetail.value}>
          <Flex direction="column" gap="2">
            <Link href={`/issues?status=${statusDetail.status}`}>
              {statusDetail.label}
            </Link>
            <Text size="5" className="font-medium">
              {statusDetail.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
