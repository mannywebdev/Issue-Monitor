"use client";
import z from "zod";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { Issue } from "@prisma/client";
import ErrorMessage from "@/app/components/ErrorMessage";
import "easymde/dist/easymde.min.css";
import "./editor.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("root", { message: "An unexpected error occurred." });
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 shadow-md rounded-lg"
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
      <Button disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
};

export default IssueForm;
