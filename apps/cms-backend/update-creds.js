const { PrismaClient } = require('./generated/prisma');
const bcrypt = require('./node_modules/bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  const hash = await bcrypt.hash('JLRacing@26', 12);
  const r = await prisma.cmsAdmin.updateMany({
    where: {},
    data: { email: 'jlracing16@gmail.com', passwordHash: hash, name: 'JL Racing CMS Admin' }
  });
  if (r.count === 0) {
    await prisma.cmsAdmin.create({ data: { email: 'jlracing16@gmail.com', passwordHash: hash, name: 'JL Racing CMS Admin', isActive: true } });
    console.log('CMS admin created');
  } else {
    console.log('CMS admins updated:', r.count);
  }
  await prisma.$disconnect();
}
main().catch(e => { console.error(e.message); process.exit(1); });
