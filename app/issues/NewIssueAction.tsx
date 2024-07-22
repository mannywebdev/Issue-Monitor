import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const NewIssueAction = () => {
  return (
    <div className="mb-5">
      <Link href="/issues/new">
        <Button variant="soft">
          <PlusCircledIcon /> New Issue
        </Button>
      </Link>
    </div>
  );
};

export default NewIssueAction;
