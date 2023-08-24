import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { Icon } from "../../../components/Icons";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6">
        <Link
          href={"/dashboard"}
          className="flex mx-auto px-3 gap-x-4 h-16 shrink-0 items-center"
        >
          <Icons.MessagesSquareIcon className="w-8 h-8 text-indigo-600" />
          <span className="text-2xl font-semibold">Dashboard</span>
        </Link>

        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your Chats
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>Chats</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {sidebarOptions.map((option) => {
                    const Icon = Icons[option.Icon];
                    return (
                      <li key={option.id}>
                        <Link
                          href={option.href}
                          className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <span className="text-gray-400 border-gray-200 transition-all group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ">
                            <Icon className="h-4 w-4" />
                          </span>

                          <span className="truncate">{option.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm leading-6 text-gray-900">
                <div className="relative h-8 w-8">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    alt="Profile Picture"
                    src={session.user.image || ""}
                  />
                </div>

                <span className="sr-only">Your Profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;