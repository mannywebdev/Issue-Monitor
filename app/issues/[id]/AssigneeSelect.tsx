"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/users");
        setUsers(data.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId ?? "unassigned"}
        onValueChange={async (userId) => {
          try {
            const assignedToUserId = userId === "unassigned" ? null : userId;
            await axios.patch("/api/issues/" + issue.id, {
              assignedToUserId,
            });
          } catch (error) {
            toast.error("Changes couldn't be saved.");
          }
        }}
      >
        <Select.Trigger radius="full" placeholder="Assign..." variant="soft" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions...</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users.map((user) => (
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
