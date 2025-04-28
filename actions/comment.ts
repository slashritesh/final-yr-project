"use server";

import { prisma } from "@/lib/db"; // Adjust path if needed
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache"; // Optional: if you want to refresh the project page after comment
import { z } from "zod";

// 1. Validate the form input
const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty."),
  projectId: z.string(),
});

export async function createComment(data: z.infer<typeof commentSchema>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      data: [],
      message: "user unthorised!",
    };
  }

  const dbuser = await prisma.user.findUnique({
    where: {
      kindeId: user.id,
    },
  });

  if (!dbuser) {
    return {
      data: [],
      message: "user unthorised!",
    };
  }
  const validatedData = commentSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error(validatedData.error.errors[0].message);
  }

  const { content, projectId } = validatedData.data;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        projectId,
        authorId: dbuser.id,
      },
    });

    console.log(comment);

    // Optional: if you want to instantly revalidate the project page after comment
    revalidatePath(`/project/${projectId}`);

    return comment;
  } catch (error) {
    console.error("[CREATE_COMMENT_ERROR]", error);
    throw new Error("Failed to create comment.");
  }
}

export async function getCommentsOnProject(id: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        projectId: id,
      },
      include: {
        author: {
          select: {
            lastname: true,
            firstname: true,
            profileimg: true,
          },
        },
      },
    });
    

    revalidatePath(`/${id}`);

    return comments.map((item) => {
      return {
        id: item.id,
        content: item.content,
        projectId: item.projectId,
        authorId: item.authorId,
        createdAt: item.createdAt,
        commentby: {
          firstname: item.author.firstname,
          lastname: item.author.lastname,
          profileimg: item.author.profileimg,
        },
      };
    });
  } catch (error) {
    console.log(error);
  }
}
