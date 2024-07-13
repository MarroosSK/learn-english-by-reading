import { useUser } from "@clerk/clerk-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { sendSupportMsg } from "../../api/api-calls";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const ContactModal = () => {
  const { isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (ref.current) {
      const formData = new FormData(ref.current);
      const data = {
        userId: user?.id,
        title: formData.get("postId"),
        body: formData.get("comment"),
      };

      try {
        await sendSupportMsg(data);
        toast("Message has been sent.");

        ref.current.reset();
        setOpen(false);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p
          data-id="support-trigger"
          className="mx-auto text-gray-700 transition hover:opacity-75 underline"
        >
          support
        </p>
      </DialogTrigger>
      <DialogContent data-id="contact-modal-content">
        <h2 className="font-bold text-xl text-stone-500">Support</h2>
        {isSignedIn ? (
          <div className="p-0 flex max-w-[700px] items-center justify-between gap-x-3 ">
            <form ref={ref} onSubmit={handleSubmit} className="w-full">
              <Input type="text" name="postId" placeholder="Title" />
              <Textarea
                placeholder="What are your thoughts?"
                className="w-full mt-1 mb-2 resize-none"
                name="comment"
                required
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
        ) : (
          <p className="text-gray-500">Please sign in first.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
