"use client";

import { FC, useState, useEffect } from "react";
import { Check, UserPlus, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandler = ({
      senderId,
      senderEmail,
    }: IncomingFriendRequest) => {
      setFriendRequests((prev) => [...prev, { senderId, senderEmail }]);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">
          {"You don't have any pending friend requests."}
        </p>
      ) : (
        friendRequests.map((request) => (
          <div
            key={request.senderId}
            className="flex gap-2 flex-col pb-2 border-gray-600/50 border-b-[1px]"
          >
            <div className="flex flex-row gap-2">
              <p className="font-medium text-lg">{request.senderEmail}</p>
            </div>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => acceptFriend(request.senderId)}
                aria-label="Accept Request"
                className="w-max p-2 justify-center items-center text-gray-950 bg-success hover:bg-success/80 flex transition hover:shadow-md"
              >
                Accept <Check className="font-semibold " />
              </button>
              <button
                onClick={() => denyFriend(request.senderId)}
                aria-label="Deny Request"
                className="w-max p-2 justify-center items-center text-gray-200 bg-accent hover:bg-accent/80 flex transition hover:shadow-md"
              >
                Deny <X className="font-semibold text-white w-3/4 h-3/4" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
