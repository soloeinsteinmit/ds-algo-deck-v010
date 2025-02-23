// src/utils/complexityGraph.jsx

export const ComplexityGraph = ({
  complexity,
  textColor = "currentColor",
  curveColor = "#06b6d4",
}) => {
  // Graph dimensions
  const width = 150;
  const height = 100;
  const padding = 20;

  // Generate points based on complexity
  const getPoints = () => {
    const points = [];
    const numPoints = 10;

    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * (width - 2 * padding) + padding;
      let y = height - padding;

      switch (complexity) {
        case "O(n³)":
          y =
            height -
            padding -
            ((i * i * i) / Math.pow(numPoints - 1, 3)) * (height - 2 * padding);
          break;
        case "O(n²)":
          y =
            height -
            padding -
            ((i * i) / ((numPoints - 1) * (numPoints - 1))) *
              (height - 2 * padding);
          break;
        case "O(n log n)":
          y =
            height -
            padding -
            ((i * Math.log(i + 1)) / ((numPoints - 1) * Math.log(numPoints))) *
              (height - 2 * padding);
          break;
        case "O(n)":
          y = height - padding - (i / (numPoints - 1)) * (height - 2 * padding);
          break;
        case "O(log n)":
          y =
            height -
            padding -
            (Math.log(i + 1) / Math.log(numPoints)) * (height - 2 * padding);
          break;
        case "O(1)":
          y = height - padding - 0.1 * (height - 2 * padding);
          break;
        default:
          y = height - padding - (i / (numPoints - 1)) * (height - 2 * padding);
      }
      points.push({ x, y });
    }
    return points;
  };

  const points = getPoints();
  const pathD = `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`;

  return (
    <div className="mt-4 mb-6">
      <h5 className="font-medium mb-2">Time Complexity Graph: {complexity}</h5>
      <div className="bg-content2/50 rounded-lg p-2">
        <svg
          width={width}
          height={height}
          className="overflow-visible"
          style={{ color: textColor }}
        >
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={padding}
            y2={padding}
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d={pathD}
            fill="none"
            stroke={curveColor}
            strokeWidth="2"
            className="transition-all duration-300"
          />
          <text
            x={width / 2}
            y={height - 5}
            textAnchor="middle"
            className="text-[10px]"
            fill="currentColor"
          >
            n (input size)
          </text>
          <text
            x={10}
            y={height / 2}
            transform={`rotate(-90, 10, ${height / 2})`}
            textAnchor="middle"
            className="text-[10px]"
            fill="currentColor"
          >
            time
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ComplexityGraph; // Add default export
