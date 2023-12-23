const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Cell Biology" },
        { name: "Genetics, Variation and Biotech" },
        { name: "Coordination and Response" },
        { name: "Transport system" },
        { name: "Diseases and Immunity" },
        { name: "Drugs" },
      ],
    });
    console.log("success");
  } catch (error) {
    console.log("Error in seeding the database categories");
  } finally {
    await database.$disconnect();
  }
}

main();
