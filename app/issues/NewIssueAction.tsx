import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const NewIssueAction = () => {
  return (
    <div className="mb-5">
      <Button variant="soft">
        <PlusCircledIcon />
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default NewIssueAction;
