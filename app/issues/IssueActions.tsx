import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import IssueSelectFilter from "./IssueSelectFilter";

const IssueActions = () => {
  return (
    <Flex className="mb-5" justify="between">
      <IssueSelectFilter />
      <Link href="/issues/new">
        <Button variant="soft">
          <PlusCircledIcon /> New Issue
        </Button>
      </Link>
    </Flex>
  );
};

export default IssueActions;
