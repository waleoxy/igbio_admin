import { db } from "./db";

const getQUestionById = async (id) => {
  const res = await db.question.findUnique({
    where: {
      id,
    },
  });
  return res;
};

export default getQUestionById;
