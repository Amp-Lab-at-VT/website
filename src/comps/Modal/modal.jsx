import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FaRedo } from 'react-icons/fa';



const Modal = ({  showModal, 
                  setShowModal, 
                  name, 
                  setHome, 
                  setCalibrate, 
                  setShowPopup, 
                  setMessage}) => {

  // Close Modal Handler
  const closeModal = () => {
    setShowModal(false);
  };

  // Home Wheel Handler
  const handleHome = (motor_number) => {
    // Make an API call to home the wheel
    // If successful, setHome(true)
    // If unsuccessful, setHome(false) and set message
    // Access point is /home/<wheel_number> on port 5000

    // Write me some code that handles a 404 error

    

    try {
    console.log("Home clicked! Attempting to home motor " + motor_number);

    fetch ('/api/home/' + motor_number)
    .then(response => response.json())
    .then(data => {
      console.log("Home response: " + data);
      if (data.status === "None") {
        setHome(false);
        console.log(data)
        setMessage(data.reason);
        setShowPopup(true);
      }
      else {
        setHome(true);
      }
    })

    }
    catch (error) {
      console.log("Request to home failed! Error: " + error);
      setMessage("Unable to contact backend. Wheel homing failed");
      setShowPopup(true);
    }
  };

  // Calibrate Wheel Handler
  const handleCalibrate = (motor_number) => {
    try {
    setCalibrate(true);
    console.log("Calibrate clicked for motor " + motor_number);
    setMessage("Unable to configure motor " + motor_number);
    setShowPopup(true);
    }
    catch (error) {
      console.log("Request to calibrate failed! Error: " + error);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-md w-96 p-4">
            <h2 className="text-xl font-semibold mb-2 text-black">Configure Wheel {name}</h2>

            <div className = "flex items-center bg-gray-100 mb-1 mt-1 p-1 justify-between">
              <div><p className = "text-center text-black p-2">Motor 0 </p></div>
                <div className = "flex items-center">
                <FaHome onClick = {() => handleHome(0)}       className="text-4xl m-2 fill-slate-950 hover:fill-slate-400" />
                <FaRedo onClick = {() => handleCalibrate(0)}  className="text-2xl m-2 fill-slate-950 hover:fill-slate-400"></FaRedo>
                </div>
            </div>

            <div className = "flex items-center bg-gray-100 mb-1 mt-1 p-1 justify-between">
              <div><p className = "text-center text-black p-2">Motor 1 </p></div>
                <div className = "flex items-center">
                <FaHome onClick = {() => handleHome(1)}       className="text-4xl m-2 fill-slate-950 hover:fill-slate-400" />
                <FaRedo onClick = {() => handleCalibrate(1)}  className="text-2xl m-2 fill-slate-950 hover:fill-slate-400"></FaRedo>
                </div>
            </div>

            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2"
              onClick={closeModal}
            >
              Exit
            </button>
            
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
