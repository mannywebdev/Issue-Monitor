import { AlertDialog, Button, Flex, Inset, Table } from "@radix-ui/themes";

const DeleteIssueButton = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="soft">
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="500px">
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
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
            <Button color="red">Delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
