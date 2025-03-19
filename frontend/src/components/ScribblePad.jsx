import React, { useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { Button, Box } from "@mui/material";

const ScribblePad = ({ onSave }) => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef(null);

  // Start Drawing
  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const stage = event.target.getStage();
    const pos = stage.getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  // Drawing in Progress
  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const stage = event.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines(lines.map((l, i) => (i === lines.length - 1 ? lastLine : l)));
  };

  // Stop Drawing
  const handleMouseUp = () => setIsDrawing(false);

  // Convert to Base64 and Send to Backend
  const handleSave = () => {
    const uri = stageRef.current.toDataURL(); // Convert Canvas to Base64
    onSave(uri);
  };

  return (
    <Box textAlign="center" marginTop={3}>
      <Stage
        width={400}
        height={400}
        style={{ border: "2px solid black" }}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke="black" strokeWidth={3} tension={0.5} lineCap="round" lineJoin="round" />
          ))}
        </Layer>
      </Stage>
      <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: "10px" }}>
        Save Drawing
      </Button>
    </Box>
  );
};

export default ScribblePad;