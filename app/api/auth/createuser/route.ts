import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function GET() {
  // Get user data from Kinde session
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // If user is not authenticated or missing ID, handle the error
  if (!user || !user.id) {
    return new Response("User not authenticated or missing ID", {
      status: 400,
    });
  }

  // Check if user already exists in the database
  const dbuser = await prisma.user.findUnique({
    where: {
      kindeId: user.id, // Assuming `id` is the Kinde user ID
    },
  });

  

  if (!dbuser) {
    // If user does not exist, insert Kinde user info into the DB
    await prisma.user.create({
      data: {
        kindeId: user.id, // Kinde User ID
        email: user.email!,
        firstname: user.given_name ?? "",
        lastname: user.family_name ?? "",
        profileimg: user.picture ?? "",
        isProfileComplete: false,
      },
    });
  }

  // Redirect the user to the specified local URL
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`);
}
