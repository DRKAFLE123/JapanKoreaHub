import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('AdminPassword123!', 10);

  // 1. Seed Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@languageguru.com' },
    update: { role: 'ADMIN' },
    create: {
      email: 'admin@languageguru.com',
      name: 'Dr. Kafle (Admin)',
      password: hashedPassword,
      role: 'ADMIN',
      streakDays: 30,
      points: 1500,
    },
  });

  // 2. Seed Manager User
  const manager = await prisma.user.upsert({
    where: { email: 'manager@languageguru.com' },
    update: { role: 'MANAGER' },
    create: {
      email: 'manager@languageguru.com',
      name: 'Academic Manager',
      password: hashedPassword,
      role: 'MANAGER',
      streakDays: 14,
      points: 800,
    },
  });

  // 3. Seed Instructor User
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@languageguru.com' },
    update: { role: 'INSTRUCTOR' },
    create: {
      email: 'instructor@languageguru.com',
      name: 'Koji Yamamoto (Instructor)',
      password: hashedPassword,
      role: 'INSTRUCTOR',
      streakDays: 45,
      points: 2100,
    },
  });

  console.log('Database Seeding Completed Successfully:');
  console.log(`- Admin User: ${admin.email} (Role: ${admin.role})`);
  console.log(`- Manager User: ${manager.email} (Role: ${manager.role})`);
  console.log(`- Instructor User: ${instructor.email} (Role: ${instructor.role})`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
