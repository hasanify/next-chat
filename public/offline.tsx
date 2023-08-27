import { FC } from "react";

interface offlineProps {}

const offline: FC<offlineProps> = ({}) => {
  return (
    <section className="flex justify-center items-center">
      <h1 className="text-3xl font-semibold">Offline</h1>
    </section>
  );
};

export default offline;
