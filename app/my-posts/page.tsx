import { deletePostById, getMyPosts } from "../actions/posts-actions";
import Post from "@/components/Post";

export default async function MyPostsPage() {
  const result = await getMyPosts();

  if (!result.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{result.error}</p>
      </div>
    );
  }

  const posts = result.posts;

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">You have no posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id}>
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                userName={post.userName}
                image={post.image}
                createdAt={post.createdAt.toISOString()}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
