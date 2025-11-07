import { Profile } from "@public/icons";

interface UserRequestProps {
  text: string;
}
export function UserRequest({ text }: UserRequestProps) {
  return (
    <div className="lg:px-24 sm:px-8 px-4 w-full">
      <div className="flex items-center gap-3 justify-end">
        <div className="rounded-md bg-[#fffcf0] px-4 py-3 text-base text-(--color-text) shadow-sm">
          {text}
        </div>
        <Profile />
      </div>
    </div>
  );
}
