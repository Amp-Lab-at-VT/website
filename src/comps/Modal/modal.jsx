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


  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-md w-96 p-4">
            <h2 className="text-xl font-semibold mb-2 text-black">More Information</h2>

          
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
