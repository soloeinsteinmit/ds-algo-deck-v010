import React from "react";
import { Helmet } from "react-helmet";
import {
  PiCodeDuotone,
  PiGraphDuotone,
  PiDatabaseDuotone,
  PiBooksDuotone,
  PiChartLineUpDuotone,
  PiBrainDuotone,
} from "react-icons/pi";

import AlgorithmCard from "./partials/AlgorithmCard";
import DataStructureCard from "./partials/DataStructureCard";
import AlgoDeckTerminal from "./partials/AlgoDeckTerminal";
import FeaturesCard from "./partials/FeaturesCard";
import { HeroSection } from "./partials/HeroSection";
import { CustomButton, CustomButton1 } from "./partials/CustomButtons";

function Explore() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "DS.AlgoDeck - Data Structures and Algorithms Learning Platform",
    "description": "Interactive platform for learning data structures and algorithms through visual representations and hands-on practice",
    "educationalLevel": "Beginner to Advanced",
    "learningResourceType": "Interactive Tutorial",
    "keywords": "data structures, algorithms, visualization, learning, computer science, programming"
  };

  return (
    <>
      <Helmet>
        <title>Explore Data Structures & Algorithms | DS.AlgoDeck</title>
        <meta name="description" content="Master data structures and algorithms through interactive visualizations. Learn sorting, searching, and complex algorithms with hands-on practice." />
        <meta name="keywords" content="data structures, algorithms, visualization, learning, computer science, sorting algorithms, searching algorithms" />
        <meta property="og:title" content="Interactive Data Structures & Algorithms Learning | DS.AlgoDeck" />
        <meta property="og:description" content="Master data structures and algorithms through interactive visualizations and hands-on practice." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://github.com/soloeinsteinmit/ds-algo-deck-v010/raw/main/public/preview.png" />
        <meta property="og:url" content="https://github.com/soloeinsteinmit/ds-algo-deck-v010" />
        <link rel="canonical" href="https://github.com/soloeinsteinmit/ds-algo-deck-v010" />
        <meta name="author" content="soloeinsteinmit" />
        <meta name="github:creator" content="@soloeinsteinmit" />
        <meta name="linkedin:creator" content="@soloeinsteinmit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DS.AlgoDeck - Visual Algorithm Learning" />
        <meta name="twitter:description" content="Interactive platform for mastering data structures and algorithms." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="flex flex-col items-center justify-center overflow-hidden w-full" role="main" aria-label="Explore Data Structures and Algorithms">
        {/* <Logo />
        <Button color="warning">Get Started</Button> */}

        <HeroSection />
        <div className="relative w-full h-screen">
          {/* Overlay */}
          <div className="absolute inset-0 bg-default-50/30" /> {/* Content */}
          <div className="relative z-10 w-full flex flex-col gap-10 items-center justify-center h-full">
            <h1 className="text-8xl font-bold flex flex-col text-center cursor-default">
              <span>
                Master💪 <span className="text-warning">Data Structures</span>
              </span>{" "}
              <span>&amp;</span>
              <span>
                <span className="text-warning">Algorithms</span> Visually👁️!
              </span>
            </h1>
            <p className="text-xl cursor-default">
              An interactive tool for learning and visualizing data structures and
              algorithms in real-time.
            </p>
            <div className="flex space-x-10">
              <CustomButton label="Get Started" />
              <CustomButton1 text="Learn More" />
            </div>
            {/* <Button color="warning">Get Started</Button> */}
          </div>
        </div>

        {/* key features */}
        <div className="relative h-fit my-10 w-full flex flex-col gap-10 items-center justify-center">
          <h2 className="text-8xl font-bold mb-10">
            Key <span className="text-warning">Features✨💡</span>{" "}
          </h2>
          <p className="font-bold">
            Status: 🔓 {"->"} Implemented 🔒 {"->"} In Development{" "}
          </p>
          <div className="flex flex-wrap items-start justify-center h-96 transition-all ">
            <FeaturesCard
              icon={<PiDatabaseDuotone />}
              title="Data Structures Visualizer🔓"
              description="Dive into various data structures with interactive and dynamic visualizations, helping you understand how they work under the hood."
            />

            <FeaturesCard
              icon={<PiGraphDuotone />}
              title="Algorithm Visualizer🔒"
              description="Watch algorithms in action with step-by-step animations, making complex concepts easy to grasp and master."
            />
            <FeaturesCard
              icon={<PiCodeDuotone />}
              title="Interactive Code Editor🔒"
              description="Write and test your code with real-time syntax highlighting, auto-completion, and error detection to enhance your coding experience."
            />
          </div>
          <div className="flex gap-5 flex-wrap items-start justify-center h-96 transition-all ">
            <FeaturesCard
              icon={<PiBooksDuotone />}
              title="Educational Resources🔒"
              description="Access a library of tutorials, articles, and guides to deepen your understanding of data structures and algorithms."
            />
            <FeaturesCard
              icon={<PiChartLineUpDuotone />}
              title="Progress Tracking🔒"
              description="Track your learning journey and monitor your progress through interactive quizzes and challenges."
            />
            <FeaturesCard
              icon={<PiBrainDuotone />}
              title="AI Code Generation🔒"
              description="Leverage AI to generate code snippets, templates, and solutions, making it easier to implement and understand algorithms."
            />
            {/* <FeaturesCard
              icon={<PiUsersFourDuotone />}
              title="Community Support🔒"
              description="Connect with a community of learners and experts, ask questions, and share your knowledge."
            /> */}
          </div>
          <CustomButton label="Explore more on the Playground" />
        </div>

        {/* playground */}
        <div className="relative w-full flex flex-col gap-10 items-center justify-center mb-32">
          <h2 className="text-8xl font-bold mb-10">
            <span className="text-warning">Playground🛝</span>{" "}
          </h2>
          <AlgorithmCard />
          <DataStructureCard />
        </div>

        <div className="relative w-full flex flex-col gap-10 items-center justify-center mb-32">
          <h2 className="text-8xl font-bold mb-10">
            DS.AlgoDeck<span className="text-warning"> Terminal💻 </span>{" "}
          </h2>
          <AlgoDeckTerminal />
        </div>
      </div>
    </>
  );
}

export default Explore;
