"use client";

import { Transition, Dialog } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment, useEffect, useState } from "react";
import { Icons } from "./Icons";
import SignOutButton from "./SignOutButton";
import Button from "@/components/ui/Button";
import FriendRequestSidebarOptions from "./FriendRequestsSidebarOption";
import SidebarChatList from "./SidebarChatList";
import { Session } from "next-auth";
import { SidebarOption } from "@/types/typings";
import { usePathname } from "next/navigation";

import { Source_Code_Pro } from "next/font/google";
const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

interface MobileChatLayoutProps {
  friends: User[];
  session: Session;
  sidebarOptions: SidebarOption[];
  unseenRequestCount: number;
}

const MobileChatLayout: FC<MobileChatLayoutProps> = ({
  friends,
  session,
  sidebarOptions,
  unseenRequestCount,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="fixed bg-gray-100 border-b top-0 inset-x-0 py-2 px-4">
      <div className="w-full flex justify-between items-center">
        <Link href="/dashboard">
          <div className="flex mb-1 justify-center items-center font-bold gap-2">
            <h1
              className={`text-2xl pt-2 text-gray-950 tracking-wide ${source_code_pro.className}`}
            >
              NextChat
            </h1>
            <Icons.MessagesSquareIcon className="text-accent mt-2 h-7 w-7" />
          </div>
        </Link>
        <Button onClick={() => setOpen(true)} className="gap-4">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden transition-all">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen">
                    <div className="flex h-full flex-col overflow-hidden w-screen bg-gray-950/70 backdrop-blur-xl py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-semibold leading-6 text-gray-200">
                            <Link href="/dashboard">
                              <div className="flex justify-center items-center font-semibold gap-2">
                                <h1
                                  className={`text-2xl text-gray-100 tracking-wide ${source_code_pro.className}`}
                                >
                                  NextChat
                                </h1>
                                <Icons.MessagesSquareIcon className="text-accent mt-2 h-7 w-7" />
                              </div>
                            </Link>
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-900 hover:text-gray-500 focus:outline-none"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Content */}

                        {friends.length > 0 ? (
                          <div className="text-sm mb-2 font-semibold leading-6 text-gray-200">
                            Your chats
                          </div>
                        ) : null}

                        <nav className="flex flex-1 flex-col">
                          <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                          >
                            <li>
                              <SidebarChatList
                                friends={friends}
                                sessionId={session.user.id}
                              />
                            </li>

                            <li>
                              <div className="text-xs font-semibold leading-6 text-gray-400">
                                Overview
                              </div>
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
                                  <FriendRequestSidebarOptions
                                    initialUnseenRequestCount={
                                      unseenRequestCount
                                    }
                                    sessionId={session.user.id}
                                  />
                                </li>
                              </ul>
                            </li>

                            <li className="-ml-6 mt-auto flex items-center">
                              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6">
                                <div className="relative h-8 w-8">
                                  <Image
                                    fill
                                    referrerPolicy="no-referrer"
                                    className="rounded-full"
                                    src={session.user.image || ""}
                                    alt="Your profile picture"
                                  />
                                </div>

                                <span className="sr-only">Your profile</span>
                                <div className="flex flex-col text-gray-100">
                                  <span aria-hidden="true">
                                    {session.user.name}
                                  </span>
                                  <span
                                    className="text-xs text-gray-300/80"
                                    aria-hidden="true"
                                  >
                                    {session.user.email}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="w-full -mt-5">
                              <SignOutButton className="h-full aspect-square" />
                            </li>
                          </ul>
                        </nav>

                        {/* content end */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MobileChatLayout;
