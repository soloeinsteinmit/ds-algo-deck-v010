import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

import { ThemeSwitcher } from "./ThemeSwitcher.jsx";
import Logo from "./Logo.jsx";
import { NavLink } from "react-router-dom";

/**
 * A component that renders a navigation bar with a logo, a set of links on the
 * left side, and a theme switcher and a dropdown menu with the user's
 * information on the right side.
 *
 * @param {JSX.Element} [logoComponent=<Logo />] - The logo component to render.
 * @param {Array<Link>} [links=[]] - The links to render on the left side of the
 * navbar.
 * @param {Object} [avatarDetails] - The user's information to render in the
 * dropdown menu. The object should have the following properties:
 *   - `name`: The user's name.
 *   - `src`: The user's avatar URL.
 *   - `email`: The user's email address.
 *   - `size`: The size of the avatar.
 * @param {Array<DropdownItem>} [dropdownItems=[]] - The items to render in the
 * dropdown menu.
 * @param {boolean} [showThemeSwitcher=true] - Whether to show the theme switcher.
 * @param {boolean} [shouldHideOnScroll=false] - Whether to hide the navbar when
 * scrolling down.
 * @param {boolean} [isBlurred=true] - Whether the navbar should have a blurred
 * background.
 * @param {string} [height="100px"] - The height of the navbar.
 * @param {Object} [props] - Additional props to pass to the underlying
 * `Navbar` component.
 *
 * @returns {JSX.Element} The rendered navbar component.
 */
export default function NavbarComponent({
  logoComponent = <Logo />,
  links = [],
  avatarDetails = {
    name: "User",
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "user@example.com",
    size: "sm",
  },
  dropdownItems = [],
  showThemeSwitcher = true,
  shouldHideOnScroll = false,

  isBlurred = true,
  height = "100px",
  ...props
}) {
  return (
    <Navbar
      {...props}
      shouldHideOnScroll={shouldHideOnScroll}
      maxWidth="full"
      height={height}
      classNames={{ base: "bg-transparent, p-0 m-0" }}
      isBlurred={isBlurred}
      position="sticky"
    >
      <NavbarBrand>{logoComponent}</NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-7 " justify="center">
        {links.map((link, index) => (
          <NavbarItem key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-warning" : "hover:text-warning"
              }
              to={link.href}
            >
              {link.label}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {showThemeSwitcher && <ThemeSwitcher size="md" color="warning" />}
        {/* <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="warning"
              name={avatarDetails.name}
              size={avatarDetails.size}
              src={avatarDetails.src}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{avatarDetails.email}</p>
            </DropdownItem>
            {dropdownItems.map((item, index) => (
              <DropdownItem
                key={item.key || index}
                color={item.color || "default"}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown> */}
      </NavbarContent>
    </Navbar>
  );
}
