import React from "react";
import { Helmet } from "react-helmet";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Link,
} from "@nextui-org/react";

import { PiGraph, PiDatabase, PiBriefcase } from "react-icons/pi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import TableComponent from "../../components/playground/TableComponent";
import PathwayCard from "../../components/playground/PathwayCard";
import CalenderComponent from "../../components/playground/Calender";
import Loader from "../../components/playground/Loader";
import { CustomButton, CustomButton1 } from "../Explore/partials/CustomButtons";

/**
 * A dashboard component for the playground page, containing a table of challenges,
 * a list of data structures and algorithms, and a user profile card.
 *
 * @return {JSX.Element} The rendered component.
 */
function PlaygroundDashboard() {
  let tabs = [
    {
      id: "all",
      title: (
        <div className="flex items-center space-x-2">
          <PiBriefcase className="text-secondary" />
          <span>All </span>
        </div>
      ),
      content: <TableComponent />,
    },
    {
      id: "data_structures",
      title: (
        <div className="flex items-center space-x-2">
          <PiDatabase className="text-warning" />
          <span>Data Structures </span>
        </div>
      ),
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: "algorithms",
      title: (
        <div className="flex items-center space-x-2">
          <PiGraph className="text-primary" />
          <span>Algorithms </span>
        </div>
      ),
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DS.AlgoDeck Playground Dashboard",
    "applicationCategory": "EducationalApplication",
    "educationalUse": ["Interactive Learning", "Practice"],
    "description": "Interactive dashboard for practicing data structures and algorithms with challenges, learning pathways, and progress tracking",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Helmet>
        <title>Algorithm Practice Playground | DS.AlgoDeck</title>
        <meta name="description" content="Practice data structures and algorithms in an interactive playground. Track your progress, complete challenges, and master computer science concepts." />
        <meta name="keywords" content="algorithm practice, coding challenges, data structures exercises, learning pathway, computer science practice" />
        <meta property="og:title" content="Interactive Algorithm Practice Playground - DS.AlgoDeck" />
        <meta property="og:description" content="Practice data structures and algorithms with interactive challenges and track your learning progress." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://github.com/soloeinsteinmit/ds-algo-deck-v010/raw/main/public/preview.png" />
        <meta property="og:url" content="https://github.com/soloeinsteinmit/ds-algo-deck-v010" />
        <link rel="canonical" href="https://github.com/soloeinsteinmit/ds-algo-deck-v010" />
        <meta name="author" content="soloeinsteinmit" />
        <meta name="github:creator" content="@soloeinsteinmit" />
        <meta name="linkedin:creator" content="@soloeinsteinmit" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div role="main" aria-label="Practice Playground Dashboard" className="flex w-full max-w-[1500px] min-h-screen mx-auto flex-col gap-5  overflow-hidden">
        <div className="flex gap-5 overflow-hidden  overflow-y-hidden pointer-events-none">
          <div className="flex flex-col w-[70%] gap-5">
            <div className="flex gap-10 items-center justify-center">
              <PathwayCard />
              <PathwayCard />
              <PathwayCard />
            </div>
            <div className="flex flex-col  ">
              <Tabs
                aria-label="Dynamic tabs"
                items={tabs}
                size="lg"
                variant="light"
              >
                {(item) => (
                  <Tab key={item.id} title={item.title}>
                    <Card>
                      <CardBody>{item.content}</CardBody>
                    </Card>
                  </Tab>
                )}
              </Tabs>
            </div>
          </div>
          <div className="w-[30%] shadow-medium rounded-medium p-5 h-fit">
            <div className="flex flex-col gap-3">
              <div className="flex gap-5">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                  className="w-32 h-32 text-large"
                  radius="md"
                />
                <div className="flex flex-col justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-xl">Username</span>
                    <span className="text-sm text-default-400">@username</span>
                    <div className="flex gap-3 mt-2">
                      <Link
                        isExternal
                        href="https://github.com/yourusername"
                        className="text-default-500 hover:text-default-700"
                        aria-label="GitHub Profile"
                      >
                        <FaGithub size={20} />
                      </Link>
                      <Link
                        isExternal
                        href="https://linkedin.com/in/yourusername"
                        className="text-default-500 hover:text-default-700"
                        aria-label="LinkedIn Profile"
                      >
                        <FaLinkedin size={20} />
                      </Link>
                    </div>
                  </div>
                  <span className="text-2xl text-warning font-semibold">
                    🔥100
                  </span>
                </div>
              </div>
              <Button variant="flat" color="success">
                Edit Profile
              </Button>
            </div>
            <CalenderComponent />
          </div>
        </div>

        <div className="absolute w-full min-h-screen overflow-hidden bg-background/60 backdrop-blur-lg top-0 left-0 z-50 flex flex-col gap-4 items-center justify-center">
          <div className="flex flex-col gap-8 items-center justify-center max-w-[1000px] ">
            <Loader />
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold text-warning">
                Your Algorithm Learning Garden 🌱
              </h2>
              <p className="text-xl">
                We're cultivating a unique space where you can visualize, learn,
                and master Data Structures & Algorithms.
                {/* Coming soon with
                interactive visualizations, personalized learning paths, progress
                tracking, and a community-driven knowledge garden. */}
              </p>
            </div>
            <div className="flex gap-8">
              <CustomButton label="Explore Playground🛝" />
              <CustomButton1 text="Return Home🏠" navigate="/" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaygroundDashboard;
