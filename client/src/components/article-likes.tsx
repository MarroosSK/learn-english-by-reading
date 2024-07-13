import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp } from "lucide-react";
import { fetchLikes, switchLike } from "../api/api-calls";
import { cn } from "../lib/utils";

interface LikeI {
  id: number;
  createdAt: string;
  userId: string;
  articleId: string;
  commentId: string | null;
}

interface ArticleLikesI {
  articleId: string;
  initialLikes: LikeI[];
}

const ArticleLikes = ({ articleId, initialLikes }: ArticleLikesI) => {
  const { isSignedIn, user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: likes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["likes", articleId],
    queryFn: () => fetchLikes(articleId),
    initialData: initialLikes,
  });

  const isLiked = likes?.some((like: LikeI) => like.userId === user?.id);

  const likeMutation = useMutation({
    mutationFn: () => switchLike(articleId, user?.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", articleId] });
    },
  });

  const likeAction = async () => {
    try {
      await likeMutation.mutateAsync();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      {isSignedIn ? (
        <>
          <button
            onClick={likeAction}
            className={cn("transition-transform transform hover:scale-125", {
              "text-blue-500": isLiked,
            })}
          >
            <ThumbsUp
              className={cn("transition-colors", {
                "text-blue-500": isLiked,
              })}
            />
          </button>
          {isLoading ? <p>Loading...</p> : <p>{likes.length}</p>}
          {error && <p>{error.message}</p>}
        </>
      ) : (
        <>
          <ThumbsUp />
          <p>{likes.length}</p>
        </>
      )}
    </div>
  );
};

export default ArticleLikes;
