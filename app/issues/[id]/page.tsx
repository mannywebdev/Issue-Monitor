import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IssueStatusBadge } from "@/app/components";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="3" align="center">
          <IssueStatusBadge size="2" status={issue.status} />
          <Text size="2">{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose max-w-full mt-5">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      {session && (
        <Box>
          <Flex gap="3" direction="column" justify="end">
            <AssigneeSelect issue={issue} />
            <Link href={`/issues/${issue.id}/edit`} legacyBehavior>
              <Button variant="soft">
                <Pencil2Icon />
                Edit Issues
              </Button>
            </Link>
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export const dynamic = "force-dynamic";

export default IssueDetailPage;
