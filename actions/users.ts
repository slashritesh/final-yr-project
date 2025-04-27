"use server"

import { prisma } from "@/lib/db";


export const suggestUsers = async ()=>{
    try {
        const users = await prisma.user.findMany({
            select : {
                firstname : true,
                lastname : true,
                profileimg : true,
                kindeId : true,
                id : true
            }
        })
        return users
    } catch (error) {
        console.log(error);
    }
}