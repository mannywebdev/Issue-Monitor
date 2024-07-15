"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./editor.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Issue</h1>
      <div className="mb-4">
        <TextField.Root placeholder="Title"></TextField.Root>
      </div>
      <div className="mb-4">
        <SimpleMDE placeholder="Description" />
      </div>
      <Button>Submit</Button>
    </div>
  );
};

export default NewIssuePage;
