import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { Icon } from "@/components/Icons";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestsSidebarOption from "@/components/FriendRequestsSidebarOption";
import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends-by-id";
import SidebarChatList from "@/components/SidebarChatList";
import MobileChatLayout from "@/components/MobileChatLayout";

import { Source_Code_Pro } from "next/font/google";
const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

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

  const friends = await getFriendsByUserId(session.user.id);

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="w-full flex h-screen">
      <div className="md:hidden">
        <MobileChatLayout
          friends={friends}
          session={session}
          sidebarOptions={sidebarOptions}
          unseenRequestCount={unseenRequestCount}
        />
      </div>
      <div className="md:flex hidden h-full w-full max-w-max grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6">
        <Link
          href={"/dashboard"}
          className="flex mx-auto px-3 gap-x-4 h-16 pt-6 shrink-0 items-center"
        >
          <div className=" flex mb-4 justify-center items-center font-semibold gap-2">
            <h1
              className={`text-3xl tracking-wide ${source_code_pro.className}`}
            >
              NextChat
            </h1>
            <Icons.MessagesSquareIcon className="text-accent h-8 w-8" />
          </div>
        </Link>

        {friends.length > 0 ? (
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your chats
          </div>
        ) : null}

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SidebarChatList friends={friends} sessionId={session.user.id} />
            </li>
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
                          className="text-gray-200 hover:text-indigo-600 hover:bg-gray-200 group flex items-center gap-x-3 rounded-lg py-4 px-2 text-base leading-6 font-semibold"
                        >
                          <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium">
                            <Icon className="h-4 w-4" />
                          </div>

                          {option.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <FriendRequestsSidebarOption
                      sessionId={session.user.id}
                      initialUnseenRequestCount={unseenRequestCount}
                    />
                  </li>
                </ul>
              </div>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center font-semibold gap-x-4 px-6 py-3 text-sm leading-6 text-gray-100">
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
                  <span className="text-xs text-gray-300/80" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
            </li>
            <li className="w-full -mt-5">
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </div>
      <aside className="max-h-screen container py-16 md:py-12 w-full">
        {children}
      </aside>
    </div>
  );
};

export default Layout;
