"use client";

import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { chatHrefConstructor } from "@/lib/utils";
import Image from "next/image";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-2">
      {friends.map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
          return unseenMessage.senderId === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <a
              className="text-gray-700 hover:text-indigo-600 group text-sm font-semibold group flex gap-x-2 items-center"
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
            >
              <Image
                className="rounded-full"
                src={friend.image}
                alt="Friend Profile Picture"
                width={40}
                height={40}
              />

              <span className="text-sm">{friend.name}</span>

              {unseenMessagesCount > 0 ? (
                <div className="rounded-full w-6 h-6 text-xs flex justify-center items-center text-white bg-indigo-600">
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
