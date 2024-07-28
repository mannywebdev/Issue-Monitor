import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Tooltip } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "asc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" className="p-2">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between" align="center">
                    <Flex direction="column" gap="1" align="start">
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Tooltip content={issue.assignedToUser.name}>
                        <Avatar
                          fallback="?"
                          src={issue.assignedToUser.image!}
                          radius="full"
                          size="2"
                        />
                      </Tooltip>
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
