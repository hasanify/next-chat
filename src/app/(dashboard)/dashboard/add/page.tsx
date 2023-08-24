import { FC } from "react";
import AddFriendButton from "@/components/AddFriendButton";

const page: FC = () => {
  return (
    <main className="pt-8">
      <h1 className="font-bold text-4xl mb-8">Add a friend</h1>
      <AddFriendButton></AddFriendButton>
    </main>
  );
};

export default page;
