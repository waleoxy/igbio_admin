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
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageForm from "./ImageForm";
import AnswerOptionForm from "./AnswerOptionsForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon } from "lucide-react";
import { Answer, Question } from "@prisma/client";
import getAnswerById from "@/lib/getAnswerById";

const formSchema = z.object({
  correctAnswer: z.string().min(1),
  answerExplained: z.string().min(2),
});

interface AnswerFormProps {
  questionId: string;
  answer: Answer;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ questionId, answer }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correctAnswer: "",
      answerExplained: "",
    },
  });

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      await axios.post(`/api/questions/${questionId}/answers`, values);
      toast.success("Question updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong.");
    }
  }
  return (
    <div className="mt-10 p-6 bg-gray-300/20 w-full">
      <div className="flex mt-2 space-x-2 items-center mb-3">
        <span className="font-semibold">Answer for Question:</span>
        <h4 className="border bg-slate-100  "> {questionId}</h4>

        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit text
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span>Correct answer</span>
            <p className="text-sm mt-2">{answer?.correctAnswer}</p>
          </div>
          <div className="flex flex-col">
            <span>Answer explained</span>
            <p className="text-sm mt-2">{answer?.answerExplained}</p>
          </div>
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="correctAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-col space-y-2">
                      <span>Correct Answer</span>
                      <FormControl>
                        <Input placeholder="Correct answer" {...field} />
                      </FormControl>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answerExplained"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-col space-y-2">
                      <span>Answer Explained</span>
                      <FormControl>
                        <Textarea placeholder="Answer explained" {...field} />
                      </FormControl>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </div>
  );
};
export default AnswerForm;
