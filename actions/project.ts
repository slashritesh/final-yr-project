"use server";

import { projectFormSchema } from "@/components/CreateProjectForm";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { date, z } from "zod";

export const getMyProjects = async () => {
  try {
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

    const projects = await prisma.project.findMany({
      where: {
        authorId: dbuser.id,
      },
      select: {
        id: true,
        thumbnail: true,
        title: true,
        description: true,
        tags: true,
        author: {
          select: {
            firstname: true,
            lastname: true, // assuming your User model has a `name` field
          },
        },
        comments: true,
        likes: true, // assuming you store likes in the Project model
        views: true, // assuming you store views in the Project model
      },
    });

    const finalRsponse = projects.map((project) => ({
      id: project.id,
      thumbnailUrl: project.thumbnail,
      title: project.title,
      authorName: project.author.firstname + " " + project.author.lastname,
      description: project.description,
      likes: project.likes ?? 0,
      comments: project.comments.length,
      views: project.views ?? 0,
      tags: project.tags,
    }));

    return {
      data: finalRsponse,
      message: "user unthorised!",
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      message: "something wend wrong!",
    }; // safe fallback
  }
};
//   values: z.infer<typeof projectFormSchema>
// ) => {
//   try {

//     const result = projectFormSchema.safeParse(values);
//     console.log(result);

//     // const { getUser } = getKindeServerSession();
//     // const user = await getUser();

//     // if (!user) {
//     //   return {
//     //     status: "error",
//     //     message: "user is not authorized!",
//     //   };
//     // }

//     // if (!result.success) {
//     //   return {
//     //     status: "error",
//     //     message: result.error.message,
//     //   };
//     // }

//     // const dbuser = await prisma.user.findUnique({
//     //   where: {
//     //     kindeId: user.id,
//     //   },
//     // });

//     // if (!dbuser) {
//     //   return {
//     //     status: "error",
//     //     message: "user is not authorized!",
//     //   };
//     // }

//     // const { category, tags, description, imageurl, techStack, title } =
//     //   result.data;

//     // const project = await prisma.project.create({
//     //   data: {
//     //     category,
//     //     title,
//     //     description,
//     //     thumbnail: imageurl,
//     //     tags: tags.split(","),
//     //     techStack: techStack.split(","),
//     //     authorId: dbuser.id,
//     //   },
//     // });

//     // return {
//     //   status: "sucess",
//     //   message: "Project create sucessfully",
//     // };
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createProject = async (
  values: z.infer<typeof projectFormSchema>
) => {
  try {
    // validate incoming data
    const result = values;

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return {
        status: "error",
        message: "User is not authorized!",
      };
    }

    const dbuser = await prisma.user.findUnique({
      where: {
        kindeId: user.id,
      },
    });

    if (!dbuser) {
      return {
        status: "error",
        message: "User is not authorized!",
      };
    }

    const { category, tags, description, imageurl, techStack, title } = result;

    const project = await prisma.project.create({
      data: {
        category,
        title,
        description,
        thumbnail: imageurl,
        tags: tags.split(","),
        techStack: techStack.split(","),
        authorId: dbuser.id,
      },
    });

    return {
      status: "success",
      message: "Project created successfully",
      project,
    };
  } catch (error) {
    console.error("[CREATE_PROJECT_ERROR]:", error);
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
};

export const getAllProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        thumbnail: true,
        title: true,
        description: true,
        tags: true,
        total_likes : true,
        author: {
          select: {
            firstname: true,
            lastname: true, // assuming your User model has a `name` field
          },
        },
        comments: true,
        likes: true, // assuming you store likes in the Project model
        views: true, // assuming you store views in the Project model
      },
    });

    const finalRsponse = projects.map((project) => ({
      id: project.id,
      thumbnailUrl: project.thumbnail,
      title: project.title,
      authorName: project.author.firstname + " " + project.author.lastname,
      description: project.description,
      total_likes: project.total_likes ?? 0,
      comments: project.comments.length,
      views: project.views ?? 0,
      tags: project.tags,
    }));

    return {
      data: finalRsponse,
      message: "Sucess !",
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      message: "something wend wrong!",
    }; // safe fallback
  }
};

export const getSingleProject = async (projectId: string) => {
  try {
    if (!projectId) {
      return null;
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
      select: {
        id: true,
        thumbnail: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        description: true,
        tags: true,
        author: {
          select: {
            id: true,
            lastname: true,
            firstname: true,
            profileimg: true,
          },
        },
        views: true,
        total_likes: true,
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};
