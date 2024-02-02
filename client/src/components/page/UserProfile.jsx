import React from "react";
import LogoGrande from "../../assets/logo The Home Hobby.svg";

export const UserProfile = () => {
  return (
    <section>
      <aside class="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div class="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 class="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

          <a
            href="#"
            class="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
          >
            Pubic Profile
          </a>
          <a
            href="#"
            class="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
          >
            Account Settings
          </a>
          <a
            href="#"
            class="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
          >
            Notifications
          </a>
          <a
            href="#"
            class="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  "
          >
            PRO Account
          </a>
        </div>
      </aside>
    </section>
  );
};
