import { LucideProps, UserPlus, MessagesSquareIcon } from "lucide-react";
import AppLogo from "../../public/logo.svg";
import Image from "next/image";

export const Icons = {
  Logo: (props: LucideProps) => (
    <div>
      <Image width={70} src={AppLogo} alt="Logo" />
    </div>
  ),
  UserPlus,
  MessagesSquareIcon,
};

export type Icon = keyof typeof Icons;
