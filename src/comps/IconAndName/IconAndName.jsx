import styles from './iconAndName.module.css';
import Modal from '@/comps/Modal/modal.jsx';

import { useState } from 'react';

const Box = ({icon, title, buttonTitle, color}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <div>
    <div className = {styles.pop_in} style={{ height: "100%", border: '1px solid #ccc', borderRadius: '4px', padding: '20px', backgroundColor: color , width : "15vw", minWidth: "200px", margin : "20px"}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '80px', color: '#61dafb', marginBottom: '5px' }}>
          {icon}
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{title}</h3>
        <button className = {styles.btn} onClick={openModal}>{buttonTitle}</button>
      </div>
    </div>
    {showModal ? <Modal showModal = {showModal} setShowModal={setShowModal} /> : null}
    </div>
  );
};

export default Box;