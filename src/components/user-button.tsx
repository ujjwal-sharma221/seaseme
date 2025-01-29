import { headers } from "next/headers";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutDialog } from "./sign-out-dialog";
import auth from "@/lib/auth";

export async function UserButton() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return null;

  const email = session.user.email;
  const username = session.user.name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full py-0 ps-0">@{username}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[14rem]">
        <DropdownMenuLabel className="flex flex-col">
          <span>Signed in as</span>
          <span className="text-xs font-normal text-foreground">{email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <SignOutDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
