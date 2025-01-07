import React, { useState, useEffect } from 'react';

function Result() {
  // State for the text content and the heading
  const [text, setText] = useState('Note is fake!!');
  const [counter, setCounter] = useState(0);
  const [heading, setHeading] = useState('Identifying please wait'); // New state for heading

  useEffect(() => {
    // Create an interval to change text every 500 milliseconds (0.5 second)
    const interval = setInterval(() => {
      if (counter < 20) { // Change the text 15 times
        // Toggle between 'hello' and 'hi'
        setText(counter % 2 === 0 ? 'Note is fake!!' : 'Note is real!!');
        setCounter(counter + 1);
      } else {
        // After 15 changes, fix the text to 'hi' and update the heading
        setText('Note is fake!!');
        setHeading('Identification completed'); // Change the heading
        clearInterval(interval); // Clear the interval to stop further changes
      }
    }, 270); // Change text every 500 milliseconds (0.5 second)

    // Cleanup the interval when the component unmounts or counter reaches 15
    return () => clearInterval(interval);
  }, [counter]); // Only re-run when the counter changes

  return (
    <div className="camera-capture">
      <h1>{heading}</h1> {/* Display the updated heading */}
      <p>{text}</p> {/* Display the text */}
    </div>
  );
}

export default Result;

