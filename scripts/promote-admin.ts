import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();

  if (!email) {
    console.error('Uso: npm run admin:promote -- "correo@ejemplo.com"');
    process.exitCode = 1;
    return;
  }

  const usuario = await prisma.user.findUnique({ where: { email } });

  if (!usuario) {
    console.error(`No existe ningún usuario con el correo ${email}.`);
    console.error("Regístrate primero en /registro y vuelve a correr este script.");
    process.exitCode = 1;
    return;
  }

  if (usuario.rol === "ADMIN") {
    console.log(`${usuario.nombre} (${email}) ya era ADMIN. Nada que hacer.`);
    return;
  }

  await prisma.user.update({ where: { email }, data: { rol: "ADMIN" } });
  console.log(`${usuario.nombre} (${email}) pasó de ${usuario.rol} a ADMIN.`);
  console.log("Cierra sesión y vuelve a entrar para que el rol quede en tu sesión.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
