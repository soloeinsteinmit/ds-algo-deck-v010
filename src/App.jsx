import { RouterProvider } from "react-router-dom";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { router } from "./routes/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Kbd } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const { appTheme } = useSelector((state) => state.playgroundLayout);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1576);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme={appTheme}>
      <div className="relative">
        <RouterProvider router={router} />
        <AnimatePresence>
          {isSmallScreen && (
            <motion.div
              className="fixed inset-0 z-50 backdrop-blur-lg bg-background/60 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="max-w-2xl text-center bg-content1/60 p-8 rounded-2xl shadow-2xl"
                initial={{ scale: 0.8, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 20, opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  delay: 0.2,
                }}
              >
                <div className="relative mb-6">
                  <motion.svg
                    className="w-32 h-32 mx-auto text-warning"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{
                      rotateY: [0, 10, 0, -10, 0],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    <motion.rect
                      x="2"
                      y="4"
                      width="20"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: [0, 1, 1, 1, 0],
                        opacity: [0.5, 1, 1, 1, 0.5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                    <motion.path
                      d="M8 19h8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1,
                      }}
                    />
                    <motion.path
                      d="M7 9h10M7 12h6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="1 2"
                      animate={{
                        strokeDashoffset: [0, -20],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  </motion.svg>
                </div>
                <motion.h2
                  className="text-2xl font-bold text-warning mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Display Resolution Notice
                </motion.h2>
                <motion.p
                  className="text-base mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  For the best data structures & algorithm visualization
                  experience, a screen width of 1576 pixels is recommended. This
                  ensures you can fully interact with all visualization
                  features. Please consider these options:
                </motion.p>
                <motion.ul
                  className="space-y-4 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      ),
                      text: (
                        <span>
                          Adjust browser zoom{" "}
                          <span className="text-xs bg-content2 shadow-medium p-1 rounded-small">
                            Ctrl + -
                          </span>{" "}
                          / <Kbd keys={["command", "crtl"]}> + -</Kbd>
                        </span>
                      ),
                    },
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      ),
                      text: <span>Switch to a higher resolution display</span>,
                    },
                    {
                      icon: (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                        />
                      ),
                      text: <span>Maximize your browser window</span>,
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-content2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: 0.8 + index * 0.2,
                        type: "spring",
                        stiffness: 300,
                      }}
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(var(--content2), 0.5)",
                      }}
                    >
                      <motion.svg
                        className="w-5 h-5 text-warning"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        whileHover={{
                          scale: 1.2,
                          rotate: 5,
                          color: "var(--warning-500)",
                        }}
                      >
                        {item.icon}
                      </motion.svg>
                      {item.text}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </NextThemesProvider>
  );
}

export default App;
