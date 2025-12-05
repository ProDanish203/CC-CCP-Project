import React from "react";
import { ProfileButton } from "./ProfileButton";

export const Header = () => {
  return (
    <header className="flex items-center gap-x-4 justify-between w-screen sm:px-8 px-2 py-2">
      <div></div>
      <div>
        <ProfileButton />
      </div>
    </header>
  );
};
