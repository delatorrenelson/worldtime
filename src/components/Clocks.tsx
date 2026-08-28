import { useState } from "react";
import Clock from "./Clock";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reorderTimeZones } from "../features/timeZone/timeZoneSlice";

function Clocks() {
  const dispatch = useAppDispatch();
  const selectedTimeZones = useAppSelector((state) => state.timeZone.selectedTimeZones);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (_e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      dispatch(reorderTimeZones({ sourceIndex: draggedIndex, destinationIndex: targetIndex }));
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="flex flex-wrap justify-center gap-12 py-6">
      {selectedTimeZones.map((clock, index) => (
        <Clock
          key={`${clock.timezone}-${index}`}
          clock={clock}
          index={index}
          isDragging={draggedIndex === index}
          isDragOver={dragOverIndex === index && draggedIndex !== index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}

export default Clocks;