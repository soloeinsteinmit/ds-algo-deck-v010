/**
 * @fileoverview Hark! Behold the grand stage upon which our Playground Dashboard doth perform!
 * Here lies the noble layout that doth frame our coding sanctuary.
 */

import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

/**
 * @typedef {Object} LinkProps
 * @property {string} label - The fair text that graces each link
 * @property {string} href - The sacred path to which the link doth lead
 * @property {string} [color] - The hue that adorns the link, if specified
 */

/**
 * @typedef {Object} AvatarProps
 * @property {string} name - The noble title of the user
 * @property {string} src - The mystical source of their portrait
 * @property {string} email - Their electronic missive address
 * @property {string} size - The dimensions of their likeness
 */

/**
 * @component PlaygroundDashboardLayout
 * @description Lo! This grand stage sets forth the structure of our playground realm.
 * Like a theater most divine, it presents a navigation bar above,
 * and below, a sacred space where content doth flourish.
 *
 * @returns {JSX.Element} The rendered layout, a tapestry of components most fair
 */
function PlaygroundDashboardLayout() {
  // Behold! The paths that guide our visitors through this realm
  const links = [
    {
      label: "Return to Realm🏠",
      href: "/",
      color: "warning",
    },
    {
      label: "Playground 🛠🛝",
      href: "/playground",
      color: "foreground",
    },
    {
      label: "Practice Mode🧑‍💻",
      href: "/practice-mode",
      color: "foreground",
    },
    {
      label: "Resources📚",
      href: "/resources",
      color: "foreground",
    },
  ];

  // The noble user's credentials and likeness
  const avatarDetails = {
    name: "Jason Hughes",
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey@example.com",
    size: "md",
  };

  // The sacred menu items that appear upon summoning
  const dropdownItems = [
    { key: "settings", label: "My Settings" },
    { key: "team_settings", label: "Team Settings" },
    { key: "analytics", label: "Analytics" },
    { key: "system", label: "System" },
    { key: "configurations", label: "Configurations" },
    { key: "help_and_feedback", label: "Help & Feedback" },
    { key: "logout", label: "Logout" },
  ];

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-foreground-50">
      {/* The noble navigation bar, standing proud atop our realm */}
      <div className="flex-none border-b-2 border-divider">
        <NavbarComponent
          shouldHideOnScroll={false}
          links={links}
          avatarDetails={avatarDetails}
          dropdownItems={dropdownItems}
        />
      </div>

      {/* The grand stage where content doth perform */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default PlaygroundDashboardLayout;
