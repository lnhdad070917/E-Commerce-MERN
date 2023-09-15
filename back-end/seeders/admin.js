import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.admin.createMany({
    data: [
      { name: "admin 1", username: "admin1", password: "admin" },
      { name: "admin 2", username: "admin2", password: "admin" },
      { name: "admin 3", username: "admin3", password: "admin" },
    ],
  });
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
