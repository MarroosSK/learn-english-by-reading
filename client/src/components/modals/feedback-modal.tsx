import { useUser } from "@clerk/clerk-react";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { getUser, makeTestimonial } from "../../api/api-calls";
import { TestimonialI } from "../../types/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";

const FeedbackModal = ({
  refetchTestimonials,
}: {
  refetchTestimonials: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TestimonialI[], Error>>;
}) => {
  const { isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => getUser(user?.id as string),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (ref.current) {
      const formData = new FormData(ref.current);
      const data = {
        userId: user?.id,
        username: userData?.username,
        body: formData.get("body"),
      };
      //console.log(data);

      try {
        await makeTestimonial(data);
        await refetchTestimonials();
        toast("Testimonial has been created.");

        ref.current.reset();
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p
          data-id="feedback-trigger"
          className="mx-auto text-gray-700 transition hover:opacity-75 underline"
        >
          here
        </p>
      </DialogTrigger>
      <DialogContent data-id="feedback-modal-content">
        <h2 className="font-bold text-xl text-stone-500">Testimonial</h2>
        {isSignedIn ? (
          <div className="p-0 flex max-w-[700px] items-center justify-between gap-x-3">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <form ref={ref} onSubmit={handleSubmit} className="w-full">
                <Input
                  type="text"
                  name="username"
                  value={userData?.username}
                  disabled
                  data-id="feedback-username-input"
                />
                <Textarea
                  placeholder="What are your thoughts?"
                  className="w-full mt-1 mb-2 resize-none"
                  name="body"
                  required
                  data-id="feedback-body-textarea"
                />
                <Button type="submit" data-id="feedback-submit-button">
                  Submit
                </Button>
              </form>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Please sign in first.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
