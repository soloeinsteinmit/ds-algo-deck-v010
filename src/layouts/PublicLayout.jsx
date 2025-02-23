import NavbarComponent from "../components/Navbar";
import Footer from "../components/public_page/Footer";
import { Outlet } from "react-router-dom";

/**
 * @component PublicLayout
 * @description A grand layout that doth wrap our application's content,
 * providing navigation, footer, and space for the main content to flourish.
 * 
 * @returns {JSX.Element} The rendered layout component
 */
function PublicLayout() {
  const links = [
    { label: "Explore🔎", href: "/", color: "warning" },
    { label: "Resources📚", href: "/resources", color: "foreground" },
    { label: "Playground 🛠🛝", href: "/playground", color: "foreground" },
    { label: "Practice Mode🧑‍💻", href: "/practice-mode", color: "foreground" },
  ];

  const avatarDetails = {
    name: "Jason Hughes",
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey@example.com",
  };

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
    <div className="min-h-screen flex flex-col">
      <NavbarComponent
        shouldHideOnScroll={true}
        links={links}
        avatarDetails={avatarDetails}
        dropdownItems={dropdownItems}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
