"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const suggestUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        firstname: true,
        lastname: true,
        profileimg: true,
        kindeId: true,
        id: true,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (id: string) => {
  try {
    const dbuser = await prisma.user.findFirst({
      where: { id : id },
      include: {
        posts: true,
      },
    });

    console.log(dbuser);
    

    return dbuser;
  } catch (error) {
    console.log(error);
  }
};


