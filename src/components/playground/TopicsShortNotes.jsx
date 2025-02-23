import { Link } from "@nextui-org/react";
import ComplexityGraph from "../../utils/complexityGraph";
import { useNavigate } from "react-router-dom";

export const TopicsShortNotes = ({ noteData }) => {
  const navigate = useNavigate();
  // Handle case when noteData is null or undefined
  if (!noteData) return null;

  return (
    <div className="p-4 max-w-sm">
      <h4 className="text-lg font-medium mb-2">{noteData.title}</h4>
      <p className="text-sm text-default-600 mb-3">{noteData.description}</p>

      {/* Complexity */}
      <ComplexityGraph complexity={noteData.complexity} />

      {/* Key Points */}
      {noteData.keyPoints && noteData.keyPoints.length > 0 && (
        <div className="mb-3">
          <h5 className="font-medium mb-1">Key Points:</h5>
          <ul className="list-disc list-inside text-sm">
            {noteData.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Characteristics */}
      {noteData.characteristics && noteData.characteristics.length > 0 && (
        <div className="mb-3">
          <h5 className="font-medium mb-1">Characteristics:</h5>
          <ul className="list-disc list-inside text-sm">
            {noteData.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Read more */}
      <Link
        // href={navigate(noteData.readMoreLink)}
        href={noteData.readMoreLink}
        isExternal
        color="primary"
        size="sm"
        underline="hover"
        className="cursor-pointer"
      >
        Read more on {noteData.title}
      </Link>
    </div>
  );
};
