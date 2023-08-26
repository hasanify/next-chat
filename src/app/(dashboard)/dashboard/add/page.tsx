import { FC } from "react";
import AddFriendButton from "@/components/AddFriendButton";

const page: FC = async () => {
  return (
    <main className="pt-4 md:pt-0">
      <h1 className="font-medium text-3xl mb-8 md:-mt-8 text-gray-100">
        Add Friend
      </h1>
      <AddFriendButton></AddFriendButton>
    </main>
  );
};

export default page;
