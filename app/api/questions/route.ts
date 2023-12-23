import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const question = await db.question.findMany({
    include: {
      answer: {
        include: {
          answerOption: true,
        },
      },
    },
  });

  return NextResponse.json(question);
}

export async function POST(request: NextRequest) {
  const user = {
    id: "hvbsjdo9399",
    name: "Olawale",
  };

  const question = await db.question.create({
    data: {
      userId: user.id,
    },
  });

  return new NextResponse("success", { status: 201 });
}
