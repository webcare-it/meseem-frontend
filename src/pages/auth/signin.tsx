import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { SignInForm } from "./component/form";
import { Logo } from "@/components/layout/header/logo";
import { AuthDescription } from "./component/description";

export const SignInPage = () => {
  return (
    <>
      <SeoWrapper title="Sign in" />
      <div
        style={{
          backgroundImage: "url('/signin.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex min-h-svh flex-col items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-6">
          <div className={cn("flex flex-col gap-4 md:gap-6")}>
            <Card className="p-4">
              <CardHeader className="flex gap-2 flex-col items-center justify-center">
                <Link to="/">
                  <Logo type="DESKTOP" />
                </Link>
                <div className="text-center">
                  <CardTitle className="text-xl">Welcome back</CardTitle>
                  <CardDescription>Sign in to your account</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-4 md:px-6">
                <SignInForm />
              </CardContent>
            </Card>
            <AuthDescription />
          </div>
        </div>
      </div>
    </>
  );
};
