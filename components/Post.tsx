import { deletePostById } from "@/app/actions/posts-actions";
type PostProps = {
  id: string;
  title: string;
  content: string;
  userName: string;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export default function Post({
  id,
  title,
  content,
  userName,
  image,
  createdAt,
}: PostProps) {
  return (
    <div className="border rounded-2xl p-5 shadow-sm bg-white space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm text-gray-700">{userName}</p>
        {createdAt && (
          <span className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold">{title}</h2>

      {/* Content */}
      <div className="flex justify-between items-center">
        <p className="text-gray-700 text-sm">{content}</p>
      </div>

      {/* Image (only if exists) */}
      {image && (
        <div className="mt-3">
          <img
            src={image}
            alt="Post images"
            className="w-full rounded-xl object-cover max-h-[400px]"
          />
        </div>
      )}
    </div>
  );
}
