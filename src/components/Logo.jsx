import React from "react";
import PropTypes from "prop-types";
import { BsDatabase } from "react-icons/bs";
import { CgGitFork } from "react-icons/cg";

function Logo({ className, ...props }) {
  return (
    <h1
      className={`text-2xl font-bold flex justify-start items-center ${className}`}
    >
      DS.Alg
      <BsDatabase />
      Dec
      <CgGitFork className="p-0 m-0 text-3xl -ml-2" />
    </h1>
  );
}

// Define prop types
// Logo.propTypes = {
//   /** Additional CSS classes for custom styling */
//   className: PropTypes.string,
// };

// // Set default props
// Logo.defaultProps = {
//   className: "",
// };

export default Logo;
