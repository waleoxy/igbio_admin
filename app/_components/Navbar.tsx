import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccountNav from "./UserAccountNav";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const isUser = true;

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-300 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="h-14 flex items-center justify-between border-b border-zinc-200">
          {isUser ? (
            <Link href="/dashboard">
              <span className="flex font-semibold z-40">IGBiology Admin</span>
            </Link>
          ) : (
            <Link href="/">
              <span className="flex font-semibold z-40 cursor-default">
                IGBiology Admin
              </span>
            </Link>
          )}

          {/* todo mobilw */}

          {!isUser ? (
            <>
              <LoginLink
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}>
                Sign in
              </LoginLink>
            </>
          ) : (
            <>
              <UserAccountNav
                name={!isUser ? "Your Account" : null}
                email=""
                imageUrl=""
              />
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
export default Navbar;
