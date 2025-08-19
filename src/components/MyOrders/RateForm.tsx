import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { useOrderStore } from "@/store/useOrderStore";

export function RateForm({ orderId }: { orderId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null); // 👈 ref for closing

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      rating,
      feedback,
      orderId,
    };
    try {
      await axiosInstance.post("/api/v8/rating", data);
      toast.success("Rating submitted successfully!");
      setRating(0);
      setFeedback("");
      useOrderStore.getState().getMyOrders();

      // 👇 close dialog programmatically
      closeRef.current?.click();
    } catch (error) {
      toast.error("Failed to submit rating. Please try again.");
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Rate This Product</DialogTitle>
        <DialogDescription>
          Please provide your rating and feedback to help us improve our
          services.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Star Rating */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              className={`cursor-pointer ${
                (hover || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        {/* Feedback Input */}
        <div className="grid gap-2">
          <Label htmlFor="feedback">Your Feedback</Label>
          <Input
            id="feedback"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button ref={closeRef} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600"
          >
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
