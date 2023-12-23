import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  const values = await request.json();

  const question = await db.question.findUnique({
    where: {
      id: params.questionId,
    },
  });

  if (!question?.id) return new NextResponse("Not found", { status: 404 });

  const answers = await db.answer.create({
    data: {
      answerExplained: values.answerExplained,
      correctAnswer: values.correctAnswer,
      questionId: params.questionId,
    },
  });

  return NextResponse.json(answers);
}

export async function GET() {
  return NextResponse.json("Helloo");
}
