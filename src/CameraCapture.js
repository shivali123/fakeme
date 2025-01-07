import React, { useRef, useState } from "react";
import Result from './result';
import './App.css';

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const captureRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  // Capture the image
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setTimeout(() => {
        if (captureRef.current) {
          captureRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0); 
    //   captureRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stop the camera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  const removeImage = () => {
    setCapturedImage(null);
  };

  return (
    <div>
      <h1>Capture currency note picture</h1>
      {/* Video element to display live camera feed */}
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxWidth: "500px", border: "1px solid black" }}
      ></video>
      <br />
      {/* Canvas to capture the image */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <br />
      {/* Buttons */}
      <button className="camera-btn start-btn" onClick={startCamera}>Start Camera</button>
      <button className="camera-btn capture-btn" onClick={captureImage}>Capture Image</button>
      <button className="camera-btn stop-btn" onClick={stopCamera}>Stop Camera</button>
      <br />
      {/* Display the captured image */}
      {capturedImage && (
        <div className="captured-img" ref={captureRef}>
          <h3>Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            style={{ width: "100%", maxWidth: "500px", border: "1px solid black" }}
          />
          <br />
          {/* <a className="download-btn" href={capturedImage} download="captured-image.png">
            Download Image
          </a> */}
          <Result />
          <button className="download-btn" onClick={removeImage}>Remove Image</button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;