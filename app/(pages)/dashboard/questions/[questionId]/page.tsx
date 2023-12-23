import MaxWidthWrapper from "@/app/_components/MaxWidthWrapper";
import AnswerForm from "../_components/AnswerForm";
import AnswerOptionForm from "../_components/AnswerOptionsForm";
import { Button } from "@/components/ui/button";
import QuestionForm from "../_components/QuestionForm";
import ImageForm from "../_components/ImageForm";
import getQUestionById from "@/lib/getQUestionById";
import { redirect } from "next/navigation";
import { getCategories } from "@/lib/getCategories";
import { getQuestions } from "@/lib/getQuestions";
import getAnswerById from "@/lib/getAnswerById";

const QuestionDetailPage = async ({ params }) => {
  const { questionId } = params;

  if (!questionId) {
    return redirect("/dasboard/questions");
  }

  const question = await getQUestionById(questionId);

  const categories = await getCategories();

  const answer = await getAnswerById(questionId);

  if (!question) {
    return redirect("/dasboard/questions");
  }

  if (!answer) {
  }
  return (
    <>
      <MaxWidthWrapper>
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {" "}
          <QuestionForm
            questionId={questionId}
            question={question}
            options={categories.map(
              (category: { name: string; id: string }) => ({
                label: category.name,
                value: category.id,
              })
            )}
          />
          <ImageForm initialData={question} questionId={questionId} />
        </div>
        {/* question section */}
        {/* answer section */}
        <AnswerForm questionId={questionId} answer={answer} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnswerOptionForm
            questionId={questionId}
            courseId={""}
            title="Answer OptionA"
          />
          <AnswerOptionForm
            questionId={questionId}
            courseId={""}
            title="Answer OptionB"
          />
          <AnswerOptionForm
            questionId={questionId}
            courseId={""}
            title="Answer OptionC"
          />
          <AnswerOptionForm
            questionId={questionId}
            courseId={""}
            title="Answer OptionD"
          />
        </div>
        <Button type="button" className="w-full mt-6 mb-10">
          Publish
        </Button>
      </MaxWidthWrapper>
    </>
  );
};
export default QuestionDetailPage;
