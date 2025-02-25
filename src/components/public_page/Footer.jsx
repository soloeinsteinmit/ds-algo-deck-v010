import React from "react";
import Logo from "../Logo";
import { GithubButton, Socials } from "./Socials";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="h-fit flex justify-center items-center bg-content1/95 relative z-[99]">
      <div className=" w-full h-content py-20 px-20 ">
        <div className="flex gap-32 items-start justify-center">
          <div className="flex flex-col w-1/3 gap-4">
            <Logo className={"text-3xl"} />
            <span className="text-base">
              Learn and explore data structures and algorithms through
              interactive visualization.
            </span>
            <GithubButton />
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-bold text-2xl">Quick Links</p>
            <div className="flex flex-col gap-5 text-base">
              <NavLink
                to={"/"}
                className={"transition-colors hover:text-warning"}
              >
                Explore🔎
              </NavLink>
              <NavLink
                to="dashboard"
                className={"transition-colors hover:text-warning"}
              >
                Dashboard🖥️
              </NavLink>
              <NavLink
                to={"playground"}
                className={"transition-colors hover:text-warning"}
              >
                Playground🛠🛝
              </NavLink>
              {/* <NavLink to={"profile"}>Profile Mode🧑‍💻</NavLink> */}
            </div>
          </div>
          <div className=" w-[200px] flex flex-col justify-center items-start">
            <p className="font-bold text-2xl">Social Links</p>

            <Socials />
          </div>
        </div>
        <p className="text-center mt-16 text-default-400">
          © 2024 DS.AlgoDeck. Made with ❤️‍🔥 by{" "}
          <a
            href="https://github.com/soloeinsteinmit"
            target="_blank"
            className="transition-all hover:text-warning"
          >
            Solomon Eshun
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Footer;
