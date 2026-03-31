"use server";

import { db } from "@/lib/db";
import { post } from "@/lib/db/schemas/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, and } from "drizzle-orm";

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

export async function getLoggedInUserPosts(): Promise<GetMyPostsResult> {
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
    console.error(e);
    return {
      success: false,
      error: "Failed to fetch posts",
    };
  }
}

export async function deletePostById(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const deleted = await db.delete(post).where(eq(post.id, id));

    return {
      success: true,
      deleted,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to delete post",
    };
  }
}

export async function updatePost(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string | null;

    if (!id || !title || !content) {
      return { success: false, error: "Missing required fields" };
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }
    const updated = await db
      .update(post)
      .set({
        title,
        content,
        image: image || null,
        updatedAt: new Date(),
      })
      .where(and(eq(post.id, id), eq(post.userId, session.user.id)));

    return {
      success: true,
      data: updated,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to delete post",
    };
  }
}
export async function getPostById(id: string) {
  try {
    const singlePost = await db.select().from(post).where(eq(post.id, id));

    if (!singlePost || singlePost.length === 0) {
      return null;
    }

    return singlePost[0];
  } catch (e) {
    console.error("Get post by id error: ", e);
    return null;
  }
}
