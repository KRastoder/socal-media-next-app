"use server";
import { deletePostById, getLoggedInUserPosts } from "../actions/posts-actions";
import Post from "@/components/Post";
import Link from "next/link";

export default async function MyPostsPage() {
  const result = await getLoggedInUserPosts();

  if (!result.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-md rounded-2xl p-6 border border-red-100">
          <p className="text-red-500 font-medium">{result.error}</p>
        </div>
      </div>
    );
  }

  const posts = result.posts;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Posts
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and view all your published posts
          </p>
        </div>

        {/* Empty state */}
        {posts.length === 0 ? (
          <div className="bg-white border border-dashed rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-500">You haven’t posted anything yet.</p>
            <Link
              href="/create"
              className="inline-block mt-4 text-blue-600 font-medium hover:underline"
            >
              Create your first post →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl transition hover:-translate-y-1 hover:shadow-lg bg-white"
              >
                {/* Clickable post */}
                <Link href={`/post/${post.id}`} className="block p-4">
                  <Post
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    userName={post.userName}
                    image={post.image}
                    createdAt={post.createdAt}
                  />
                </Link>

                {/* Actions */}
                <div className="px-4 pb-4 flex justify-end">
                  <form action={deletePostById}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="text-red-500 text-sm hover:text-red-700 hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
