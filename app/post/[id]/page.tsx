"use server";
import { getPostById } from "@/app/actions/posts-actions";
import { redirect } from "next/navigation";
import Post from "@/components/Post";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postById = await getPostById(id);

  if (!postById) {
    redirect("/");
    // Funkcija notFound() prekida dalje izvršavanje i prikazuje not-found.tsx fajl
  }

  return (
    <div>
      <Post {...postById} />
    </div>
  );
}
