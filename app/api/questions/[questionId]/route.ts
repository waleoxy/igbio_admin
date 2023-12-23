import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
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

  const _question = await db.question.update({
    where: {
      id: params.questionId,
    },
    data: {
      imageUrl: values.imageUrl,
      categoryId: values.categoryId,
      questionText: values.questionText,
    },
  });

  return NextResponse.json(_question);
}
