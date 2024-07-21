"use client";
import z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { Issue } from "@prisma/client";
import ErrorMessage from "@/app/components/ErrorMessage";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./editor.css";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("root", { message: "An unexpected error occurred." });
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 shadow-md rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold mb-4">
        {issue ? "Edit Issue" : "Create New Issue"}
      </h1>
      {errors.root && (
        <Callout.Root className="mb-4" size="1" variant="surface">
          <Callout.Text>{errors.root.message}</Callout.Text>
        </Callout.Root>
      )}
      <div className="mb-4">
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </div>
      <div className="mb-4">
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE className="prose" placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      </div>
      <Button disabled={isSubmitting} variant="soft">
        {issue ? "Update Issue" : "Submit Issue"}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default IssueForm;
