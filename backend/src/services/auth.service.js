import bcrypt from "bcrypt";
import prisma from "../config/db.js";

export const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordCorrect) {
    return null;
  }

  return user;
};

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};