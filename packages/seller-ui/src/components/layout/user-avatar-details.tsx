import { UserIcon } from "lucide-react";

export function UserAvatarDetails({
  avatar,
  email,
}: {
  avatar?: string;
  email: string;
}) {
  return (
    <>
      {avatar ? (
        <img
          src={avatar}
          alt={email}
          className="size-8 rounded-lg object-cover"
        />
      ) : (
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-primary-foreground font-semibold">
          <UserIcon className="size-4" />
        </div>
      )}
      <div className="grid flex-1 text-left text-sm leading-tight ml-2">
        <span className="truncate font-semibold">{email}</span>
      </div>
    </>
  );
}
