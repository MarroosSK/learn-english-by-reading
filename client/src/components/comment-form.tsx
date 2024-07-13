import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { makeComment } from "../api/api-calls";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ArticleI } from "../types/types";
import { toast } from "sonner";

interface CommentFormI {
  article: ArticleI;
  refetchArticle: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Error>>;
}

const CommentForm = ({ article, refetchArticle }: CommentFormI) => {
  const { isSignedIn, user } = useUser();
  const [commentBody, setCommentBody] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = await makeComment(
      article.id,
      user?.id as string,
      commentBody
    );
    if (newComment) {
      setCommentBody("");
      toast("Comment added!");
      refetchArticle();
    }
  };

  return (
    <>
      {isSignedIn ? (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-y-4"
          data-id="comment-form"
        >
          <input
            type="text"
            name="userId"
            value={article.user.id}
            className="hidden"
            readOnly
          />
          <input
            type="text"
            name="articleId"
            value={article.id}
            className="hidden"
            readOnly
          />
          <textarea
            name="body"
            placeholder="What is on your mind..."
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            required
            className="text-sm p-4 border rounded-lg w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-id="comment-textarea"
          />
          <Button
            type="submit"
            className=" self-end"
            data-id="comment-submit-button"
          >
            Send
          </Button>
        </form>
      ) : (
        <p
          className="text-base text-stone-500"
          data-id="comment-signin-message"
        >
          Please sign in to comment.
        </p>
      )}
    </>
  );
};

export default CommentForm;
