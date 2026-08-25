const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const EMAIL = "geosbau@proton.me";
const PASSWORD = "G3osb4u7805";

async function main() {
  const existing = await prisma.adminUser.findUnique({ where: { email: EMAIL } });
  if (existing) {
    console.log("admin seed skipped (exists)");
    return;
  }
  const passwordHash = await bcrypt.hash(PASSWORD, 12);
  await prisma.adminUser.create({
    data: { email: EMAIL, passwordHash },
  });
  console.log("admin seed ok");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
