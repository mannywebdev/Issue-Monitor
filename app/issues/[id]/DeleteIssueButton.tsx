"use client";
import axios from "axios";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIssue = () => {
    try {
      setIsDeleting(true);
      axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" variant="soft" disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="500px">
          <AlertDialog.Title>Confirm Issue Delete</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action is permanent
            and cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="500px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            variant="soft"
            color="gray"
            mt="2"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
