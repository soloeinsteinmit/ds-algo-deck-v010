import { Outlet } from "react-router-dom";

/**
 * The main layout for the application.
 *
 * This component renders the Outlet component provided by
 * react-router-dom, which renders the active route's element.
 *
 * This component does not render anything else.
 *
 * @returns {JSX.Element} The MainLayout component.
 */
function MainOuletLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default MainOuletLayout;
