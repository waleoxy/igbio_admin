import { db } from "./db";

export const getQuestions = async () => {
  return await db.question.findMany();
};
