type PostProps = {
  title: string;
  content: string;
  userName: string;
  image?: string | null;
  createdAt?: string;
};

export default function Post({
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
      <p className="text-gray-700 text-sm">{content}</p>

      {/* Image (only if exists) */}
      {image && (
        <div className="mt-3">
          <img
            src={image}
            alt="Post image"
            className="w-full rounded-xl object-cover max-h-[400px]"
          />
        </div>
      )}
    </div>
  );
}
