"use client";

import { FC, useState } from "react";
import Button from "@/components/ui/Button";

import { Montserrat } from "next/font/google";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Icons } from "@/components/Icons";
import { Source_Code_Pro } from "next/font/google";
import { Heart } from "lucide-react";
import Graphic from "../../../../public/maingraphic.svg";

const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

interface pageProps {}

const LoginPage: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="overflow-hidden">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <div className=" flex mb-4 justify-center items-center font-semibold gap-2">
              <h1
                className={`text-3xl tracking-wide sm:text-5xl ${source_code_pro.className}`}
              >
                NextChat
              </h1>
              <Icons.MessagesSquareIcon className="text-accent h-10 w-10 sm:h-14 sm:w-14" />
            </div>
            <p className="mb-8 leading-relaxed">
              Fast, Lightweight and Secure!
            </p>
            <Button
              isLoading={isLoading}
              type="button"
              className="max-w-[250px] mx-auto w-full"
              onClick={loginWithGoogle}
              size={"lg"}
            >
              {isLoading ? null : (
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              )}
              Login with Google
            </Button>
            <Image
              className="mx-auto mt-6"
              width={300}
              height={300}
              src={Graphic}
              alt="Graphic"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

const Footer = () => {
  return (
    <footer className="fixed w-screen flex-col gap-2 text-gray-950 flex bg-gray-100 justify-center items-center py-4 bottom-0 left-0">
      <div className="flex flex-row gap-x-2">
        Made with
        <Heart className="text-accent fill-accent" />
      </div>
      <a className="font-bold" href="https://github.com/hasanify">
        github.com/hasanify
      </a>
    </footer>
  );
};

export default LoginPage;
