"use server";

import { db } from "@/lib/db";
import { post } from "@/lib/db/schemas/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc } from "drizzle-orm";

type PostType = {
  id: string;
  title: string;
  content: string;
  image: string | null;
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
};

type GetMyPostsResult =
  | { success: true; posts: PostType[] }
  | { success: false; error: string };

export async function getMyPosts(): Promise<GetMyPostsResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const posts = await db
      .select()
      .from(post)
      .where(eq(post.userId, session.user.id))
      .orderBy(desc(post.createdAt));

    return {
      success: true,
      posts,
    };
  } catch (e) {
    return {
      success: false,
      error: "Failed to fetch posts",
    };
  }
}
