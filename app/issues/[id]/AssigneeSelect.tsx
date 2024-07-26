"use client";
import axios from "axios";
import React from "react";
import { Select, Skeleton, Text } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data.data),
    staleTime: 1000 * 30,
    retry: 3,
  });

  const assignIssue = async (userId: string) => {
    try {
      const assignedToUserId = userId === "unassigned" ? null : userId;
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId,
      });
    } catch (error) {
      toast.error("Changes couldn't be saved.");
    }
  };

  if (isLoading)
    return (
      <Skeleton>
        <Text>Lorem ipsum dolor sit amet</Text>
      </Skeleton>
    );

  if (isError) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId ?? "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger radius="full" placeholder="Assign..." variant="soft" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions...</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
