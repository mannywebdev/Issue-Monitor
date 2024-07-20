import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { IssueStatusBadge } from "@/app/components";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <Box className="max-w-xl">
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3" align="center">
        <IssueStatusBadge size="2" status={issue.status} />
        <Text size="2">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;
