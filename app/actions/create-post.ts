"use server";

import { db } from "@/lib/db";
import { post } from "@/lib/db/schemas/schema";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

//TODO ADD IMAGE UPLOAD AND MOVE TO post-actions.ts file
export async function createPost(data: {
  title: string;
  content: string;
  image?: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    const user = session.user;

    await db.insert(post).values({
      id: nanoid(),
      userId: user.id,
      userName: user.name,
      title: data.title,
      content: data.content,
      image: data.image ?? null,
    });
    return { success: true };
  } catch (e) {
    console.error("CREATE_POST_ERROR:", e);
    return { error: "failed to create post" };
  }
}
