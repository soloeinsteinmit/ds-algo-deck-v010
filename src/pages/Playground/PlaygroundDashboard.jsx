import React from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
} from "@nextui-org/react";

import { PiGraph, PiDatabase, PiBriefcase } from "react-icons/pi";
import TableComponent from "../../components/playground/TableComponent";
import PathwayCard from "../../components/playground/PathwayCard";
import CalenderComponent from "../../components/playground/Calender";

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
  return (
    <div className="flex w-full max-w-[1500px] mx-auto my-6 flex-col gap-5">
      <div className="flex gap-5">
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
        <div className="w-[30%] shadow-medium rounded-medium p-5">
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
                  <span className="text-sm text-default-400"> @username </span>
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
    </div>
  );
}

export default PlaygroundDashboard;
