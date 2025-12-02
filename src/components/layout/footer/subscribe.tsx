import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscribeMutation } from "@/api/mutations/useNewsletter";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { isValidEmail } from "@/helper";

export const SubscribeFooter = () => {
  const { mutate, isPending } = useNewsletterSubscribeMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email");
      return;
    }
    mutate(formData);
    e.currentTarget.reset();
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Newsletter
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Get a free 20% discount on all products on your first order!
          </p>
          <div className="max-w-md mx-auto">
            <form
              onSubmit={handleSubmit}
              className="border-2 border-primary rounded-lg overflow-hidden flex">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                <Input
                  type="email"
                  name="email"
                  placeholder={"Your Email Address"}
                  className="w-full h-10 md:h-12 pl-10 pr-0 border-border focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="font-medium transition-colors border-0 rounded-none h-10 md:h-12 px-6">
                <Send className="w-4 h-4" />
                {isPending ? (
                  <>
                    <Spinner />
                    {"Processing..."}
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
