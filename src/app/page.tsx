import { db } from "@/lib/db";

const Home = async () => {
  await db.set("hello", "hello");
  return <div className="text-xl font-extrabold">page</div>;
};

export default Home;
