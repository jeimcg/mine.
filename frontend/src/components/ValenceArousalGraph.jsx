import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios"; // For sending data to MongoDB

const ValenceArousalGraph = () => {
  const svgRef = useRef();
  const [userSelection, setUserSelection] = useState(null);

  const width = 400, height = 400, radius = 150;
  const emotions = [
    { name: "Excited", valence: 0.8, arousal: 0.9 },
    { name: "Happy", valence: 0.9, arousal: 0.6 },
    { name: "Content", valence: 0.6, arousal: 0.3 },
    { name: "Relaxed", valence: 0.2, arousal: 0.1 },
    { name: "Calm", valence: 0.1, arousal: 0.2 },
    { name: "Sad", valence: -0.7, arousal: -0.6 },
    { name: "Bored", valence: -0.5, arousal: -0.8 },
    { name: "Angry", valence: -0.8, arousal: 0.8 },
    { name: "Fearful", valence: -0.9, arousal: 0.9 },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous renders
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Draw circle boundary
    g.append("circle")
      .attr("r", radius)
      .attr("stroke", "black")
      .attr("fill", "none");

    // Draw axes
    g.append("line")
      .attr("x1", -radius).attr("x2", radius)
      .attr("y1", 0).attr("y2", 0)
      .attr("stroke", "black");

    g.append("line")
      .attr("y1", -radius).attr("y2", radius)
      .attr("x1", 0).attr("x2", 0)
      .attr("stroke", "black");

    // Add click event listener
    svg.on("click", function (event) {
      const [x, y] = d3.pointer(event, this);
      const valence = (x - width / 2) / radius;
      const arousal = -(y - height / 2) / radius;

      // Find closest emotion
      let closestEmotion = emotions.reduce((prev, curr) => {
        let prevDist = Math.hypot(prev.valence - valence, prev.arousal - arousal);
        let currDist = Math.hypot(curr.valence - valence, curr.arousal - arousal);
        return currDist < prevDist ? curr : prev;
      });

      if (Math.sqrt(valence ** 2 + arousal ** 2) <= 1) {
        setUserSelection({ x, y, valence, arousal, emotion: closestEmotion.name });
      }
    });

  }, []);

  useEffect(() => {
    if (userSelection) {
      const svg = d3.select(svgRef.current);
      svg.selectAll(".user-point").remove();

      // Draw user selection point
      svg.append("circle")
        .attr("class", "user-point")
        .attr("cx", userSelection.x)
        .attr("cy", userSelection.y)
        .attr("r", 6)
        .attr("fill", "red");

      // Label user selection
      svg.append("text")
        .attr("class", "user-point")
        .attr("x", userSelection.x + 10)
        .attr("y", userSelection.y - 10)
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text(`${userSelection.emotion} (${userSelection.arousal.toFixed(2)})`);
    }
  }, [userSelection]);

  // Save to MongoDB
  const saveToDatabase = async () => {
    if (!userSelection) return;
    try {
      await axios.post("http://localhost:5000/api/journal", {
        title: "Emotion Selection",
        body: `User clicked on ${userSelection.emotion}`,
        arousalQuotient: userSelection.arousal
      });
      alert("Saved to database!");
    } catch (error) {
      console.error("Error saving to DB:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} className="cursor-pointer" />
      {userSelection && (
        <div className="mt-2 text-sm">
          <p>Selected Emotion: {userSelection.emotion}</p>
          <p>Arousal Quotient: {userSelection.arousal.toFixed(2)}</p>
          <button 
            onClick={saveToDatabase} 
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default ValenceArousalGraph;
