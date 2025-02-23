import React from "react";

const NoteCard = ({ notes = [], name = "Bubble Sort Algorithm" }) => {
  return (
    <div className="flex flex-col w-full my-8 py-6 pl-12 pr-4 isolate [unicode-bidi:isolate] bg-content1 rounded-xl relative before:content-[''] before:absolute before:w-1 before:h-4/5 before:bg-[#373c3d] before:z-[10] before:left-6">
      <div className="flex flex-col gap-2">
        <p className="text-xl underline decoration-dotted text-warning font-semibold">
          5 Facts about {name}✨
        </p>
        {notes.map((note, index) => (
          <p
            key={index}
            className="white-space-pre-wrap [&:not(:first-child)]:mt-3 text-default-700"
          >
            <span className="font-semibold">Note {index + 1}:</span> {note}
          </p>
        ))}
      </div>
    </div>
  );
};

export default NoteCard;
