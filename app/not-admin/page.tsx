import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldXIcon } from "lucide-react";
import Link from "next/link";

const NotAdminpage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
            <ShieldXIcon className="size-16 text-destructive" />
          </div>

          <CardTitle className="text-2xl">Access Restricted</CardTitle>
          <CardDescription className="max-w-xs mx-auto">
            Hey! You are not an Admin, which means you can't create any courses
            or stuff like that...
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link
            href="/"
            className={buttonVariants({
              className: "w-full",
            })}
          >
            <ArrowLeft className="size-4 mr-1" />
            Back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAdminpage;
