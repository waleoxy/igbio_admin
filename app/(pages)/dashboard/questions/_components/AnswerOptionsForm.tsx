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
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  text: z.string().min(1),
});

interface AnswerOptionFormProps {
  questionId: string;
  title: string;
}

const AnswerOptionForm: React.FC<AnswerOptionFormProps> = ({
  questionId,
  title,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await axios.post(`/api/questions/${questionId}/answerOptions`, values);
      toast.success("Question updated successfully");
      // toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong.");
    }
  }
  return (
    <div className="mt-10 p-6 bg-gray-300/20 space-y-2">
      <div className="flex space-x-2 items-center">
        <span className="font-semibold text-sm">Question Id</span>
        <h4 className="border bg-slate-100 p-1  ">{questionId}</h4>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-3">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel className="flex flex-col space-y-2">
                    <span>{title}</span>
                    <FormControl>
                      <Input placeholder={title} {...field} />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex-shrink mt-3">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default AnswerOptionForm;
