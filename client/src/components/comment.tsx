interface CommentI {
  _count: {
    likes: number;
  };
  body: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

const Comment = ({ comment }: { comment: CommentI }) => {
  const date = new Date(comment.createdAt);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <div className="p-4 mb-4 bg-white border rounded-lg shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between">
      <p className="max-w-4xl text-base text-stone-500">{comment.body}</p>
      <div className="flex flex-col gap-y-2">
        <p className="mt-4 md:mt-0 text-sm md:text-base font-bold text-stone-500">
          {comment.user.username}
        </p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Comment;
