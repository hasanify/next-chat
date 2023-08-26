import { getFriendsByUserId } from "@/helpers/get-friends-by-id";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Empty from "../../../../public/empty.svg";

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageRaw] = (await fetchRedis(
        "zrange",
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[];
      const lastMessage = JSON.parse(lastMessageRaw) as Message;

      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return (
    <main className="pt-4 md:pt-0">
      <h1 className="font-medium text-3xl mb-8 md:-mt-8 text-gray-100">
        Recent chats
      </h1>
      {friendsWithLastMessage.length === 0 ? (
        <div className="flex relative flex-col gap-y-14 items-center justify-center">
          <Image src={Empty} alt="Nothing to show here" width={400} />
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100 ">
              Inbox empty
            </h2>
            <p className="text-sm text-gray-400">
              Start a new chat and it will appear here!
            </p>
          </div>
        </div>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <div
            key={friend.id}
            className="relative bg-gray-200 border border-zinc-200 p-3 rounded-md my-2"
          >
            <div className="absolute right-4 inset-y-0 flex items-center">
              <ChevronRight className="h-7 w-7 text-zinc-400" />
            </div>

            <Link
              href={`/dashboard/chat/${chatHrefConstructor(
                session.user.id,
                friend.id
              )}`}
              className="relative sm:flex"
            >
              <div className="mb-4 hidden sm:block flex-shrink-0 sm:mb-0 sm:mr-4">
                <div className="relative h-6 w-6">
                  <Image
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    alt={`${friend.name} profile picture`}
                    src={friend.image}
                    fill
                  />
                </div>
              </div>

              <div className="mb-1 flex gap-x-2 items-center sm:hidden flex-shrink-0">
                <div className="relative h-8 w-8">
                  <Image
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    alt={`${friend.name} profile picture`}
                    src={friend.image}
                    fill
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-950">
                  {friend.name}
                </h4>
              </div>

              <p className="mt-1 sm:hidden max-w-md truncate text-gray-700">
                <span className="font-bold">
                  {friend.lastMessage.senderId === session.user.id
                    ? "You: "
                    : ""}
                </span>
                {friend.lastMessage.text}
              </p>

              <div className="hidden sm:block">
                <h4 className="text-lg font-bold text-gray-950">
                  {friend.name}
                </h4>
                <p className="mt-1 max-w-md truncate text-gray-700">
                  <span className="font-bold">
                    {friend.lastMessage.senderId === session.user.id
                      ? "You: "
                      : ""}
                  </span>
                  {friend.lastMessage.text}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </main>
  );
};

export default page;
