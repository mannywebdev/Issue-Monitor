"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./editor.css";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("root", { message: "An unexpected error occurred." });
    }
  };
  return (
    <form
      className="max-w-lg mx-auto p-6 shadow-md rounded-lg mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold mb-4">Create New Issue</h1>
      {errors.root && (
        <Callout.Root className="mb-4" size="1" variant="surface">
          <Callout.Text>{errors.root.message}</Callout.Text>
        </Callout.Root>
      )}
      <div className="mb-4">
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
      </div>
      <div className="mb-4">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
      </div>
      <Button disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
};

export default NewIssuePage;
