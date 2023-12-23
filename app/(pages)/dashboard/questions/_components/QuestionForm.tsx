"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import CategoryForm from "./CategoryForm";
import { Question } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon } from "lucide-react";

const formSchema = z.object({
  questionText: z.string().min(1, {
    message: "Question text is required",
  }),
});

interface QuestionFormProps {
  questionId: string;
  options: {
    label: string;
    value: string;
  }[];
  question: Question;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
      questionId,
      options,
      question,
    }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: "",
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/questions/${questionId}`, values);
      toast.success("Question updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-300/20 w-full">
      <div className="flex space-x-2 items-center mb-3">
        <span className="font-semibold text-sm">Q.Id</span>
        <h4 className="border bg-slate-100 p-1 ">{questionId}</h4>

        <Button onClick={toggleEdit} variant="ghost">
          {question.questionText !== null ? (
            isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit text
              </>
            )
          ) : null}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{question.questionText}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-x-3 flex items-center w-full">
            <FormField
              control={form.control}
              name="questionText"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4 w-full">
                  <FormLabel className="flex flex-col space-y-2">
                    <span>Question Text</span>
                    <FormControl>
                      <Textarea placeholder="Question text" {...field} />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </Form>
      )}{" "}
      <CategoryForm
        options={options}
        questionId={questionId}
        initialData={question}
      />
    </div>
  );
};
export default QuestionForm;
