import { db } from "./db";

const getAnswerById = async (id: string) => {
  const res = await db.answer.findUnique({
    where: {
      questionId: id,
    },
  });
  return res;
};

export default getAnswerById;
