import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import VisualizerLoader from "../../utils/VisualizerLoader";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
} from "@nextui-org/react";
import { memo, useEffect, useState } from "react";
import { PiInfo } from "react-icons/pi";
import { TopicsShortNotes } from "../../components/playground/TopicsShortNotes";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  toggleEditor,
  toggleList,
} from "../../features/playground/playgroundLayoutSlice";
import { FaCode } from "react-icons/fa6";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";

function VisualizingPanel() {
  const { currentView } = useSelector((state) => state.visualizer);
  const { title, visualizer, controls, shortNotes } = VisualizerLoader({
    type: currentView,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${title || 'Algorithm Visualizer'} - DS.AlgoDeck`,
    "applicationCategory": "EducationalApplication",
    "educationalUse": "Interactive Learning",
    "learningResourceType": "Visualization",
    "description": `Interactive visualization panel for ${title || 'algorithms'} with step-by-step execution and controls`
  };

  const dispatch = useDispatch();
  const { isEditorOpen, isListOpen } = useSelector(
    (state) => state.playgroundLayout
  );

  return (
    <>
      <Helmet>
        <title>{`${title || 'Algorithm'} Visualization | DS.AlgoDeck`}</title>
        <meta name="description" content={`Interactive visualization of ${title || 'algorithms'}. Watch step-by-step execution, control animation speed, and understand the algorithm's behavior.`} />
        <meta name="keywords" content={`${title}, algorithm visualization, interactive learning, computer science, data structures`} />
        <meta property="og:title" content={`${title || 'Algorithm'} Visualization - DS.AlgoDeck`} />
        <meta property="og:description" content={`Interactive visualization panel for ${title || 'algorithms'} with step-by-step execution and controls`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://github.com/soloeinsteinmit/ds-algo-deck-v010/raw/main/public/preview.png" />
        <meta property="og:url" content="https://github.com/soloeinsteinmit/ds-algo-deck-v010" />
        <link rel="canonical" href="https://github.com/soloeinsteinmit/ds-algo-deck-v010" />
        <meta name="author" content="soloeinsteinmit" />
        <meta name="github:creator" content="@soloeinsteinmit" />
        <meta name="linkedin:creator" content="@soloeinsteinmit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title || 'Algorithm'} Visualization - DS.AlgoDeck`} />
        <meta name="twitter:description" content={`Watch and learn ${title || 'algorithms'} through interactive visualization`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="flex flex-col h-full" role="complementary" aria-label="Algorithm Visualization Panel">
        <Card
          className="w-full h-full flex flex-col bg-background/60 backdrop-blur-lg"
          radius="none"
        >
          {/* Header */}
          <CardHeader className="flex-none px-6 py-3 border-b border-divider bg-content2/50">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* The Sidebar Toggle, like a curtain's rope */}

                <Button
                  onClick={() => dispatch(toggleList())}
                  className=""
                  size="sm"
                  isIconOnly
                  variant="light"
                >
                  {isListOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
                </Button>

                <h3 className="text-lg font-medium text-default-800">{title}</h3>
                <Popover>
                  <PopoverTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <PiInfo className="text-xl" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    {shortNotes && <TopicsShortNotes noteData={shortNotes} />}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex">
                {/* The Editor Toggle, like a magician's wand */}
                <Tooltip
                  color="warning"
                  variant={`${isEditorOpen ? "solid" : "flat"}`}
                  content="Open Code Editor"
                  showArrow
                  placement="top"
                >
                  <Button
                    onClick={() => dispatch(toggleEditor())}
                    className="mr-5"
                    size="sm"
                    color="warning"
                    isIconOnly
                    variant={`${isEditorOpen ? "solid" : "flat"}`}
                  >
                    <FaCode className="text-base" />
                  </Button>
                </Tooltip>
                <ThemeSwitcher size="md" color="warning" />
              </div>
            </div>
          </CardHeader>

          {/* Main Visualization Area */}
          <CardBody className="flex-1 flex items-center justify-center p-6">
            <div className="w-full h-full flex items-center justify-center relative">
              {visualizer}
            </div>
          </CardBody>

          {/* Controls Area */}
          <CardFooter className="flex-none border-t border-divider bg-content1/50">
            <div className="w-full h-fit max-h-64 overflow-y-auto p-4">
              {controls}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

/**
 * LoadingState component displays a centered loading animation.
 *
 * This component is used by {@link VisualizingPanel} to display a loading state
 * while the visualizer and controls are loading.
 *
 * @returns A JSX element representing the loading state.
 */
const LoadingState = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

/**
 * NothingState component displays a centered message when no visualizer is selected.
 *
 * This component is used by {@link VisualizingPanel} to display a message when
 * the user has not selected a visualizer.
 *
 * @returns A JSX element representing the nothing state.
 */
export const NothingState = () => (
  <div className="w-full h-full flex items-center justify-center">
    <h4 className="text-xl font-medium">No Topic Selected</h4>
  </div>
);

/**
 * ErrorState component displays an error message in a centered layout.
 *
 * This component is used to inform the user of an error that occurred
 * while loading a visualizer. It displays a fixed title and a custom
 * error message passed through the `message` prop.
 *
 * Props:
 * - message (string): The error message to be displayed.
 *
 * The component uses Tailwind CSS classes for styling to ensure a
 * consistent and centered layout with red-colored text for error indication.
 */
const ErrorState = ({ message }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-danger text-center">
      <h4 className="text-lg font-medium">Error Loading Visualizer</h4>
      <p className="text-sm text-default-600">{message}</p>
    </div>
  </div>
);

const MemoizedVisualizingPanel = memo(VisualizingPanel);

export default MemoizedVisualizingPanel;
