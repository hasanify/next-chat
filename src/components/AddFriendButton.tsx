"use client";

import Button from "@/components/ui/Button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFriendButtonProps {}

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [showSuccess, setshowSuccess] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);

  type FormData = z.infer<typeof addFriendValidator>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    setisLoading(true);
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setshowSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong." });
    } finally {
      setisLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className=" block text-sm font-medium leading-6 text-gray-200"
      >
        Add friend by email
      </label>

      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          type="text"
          className="block w-full rounded-lg border-0 text-gray-900 py-1.5 shadow-sm transition-all ring-2 outline-none border-none focus:outline-none focus:border-none focus:ring-gray-200 focus:shadow-lg sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
        <Button isLoading={isLoading}>{isLoading ? null : "Add"}</Button>
      </div>

      <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>

      {showSuccess ? (
        <p className="mt-1 text-sm text-green-500">Friend request sent!</p>
      ) : null}
    </form>
  );
};

export default AddFriendButton;
