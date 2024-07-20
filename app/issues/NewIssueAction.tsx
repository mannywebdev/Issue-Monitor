import Link from "next/link";
import { Button } from "@radix-ui/themes";

const NewIssueAction = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default NewIssueAction;
