import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  const values = await request.json();

  const answer = await db.answer.findUnique({
    where: {
      questionId: params.questionId,
    },
  });

  if (!answer?.id) return new NextResponse("Not found", { status: 404 });

  const answerOptions = await db.answerOption.create({
    data: {
      text: values.text,
      answerId: answer.id,
    },
  });

  return NextResponse.json(answerOptions);
}

export async function GET() {
  return NextResponse.json("Helloo");
}
