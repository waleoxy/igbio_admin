import { buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "./_components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 m-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">IGBiology Admin</p>
        </div>
        <h1 className="max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl">
          Welcome to IGBiology Admin
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Click the link below to login and create more questions by categories.
        </p>
        \
        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/dashboard">
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>
    </>
  );
}
