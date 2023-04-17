import styles from './iconAndName.module.css';
import Modal from '@/comps/Modal/modal.jsx';

import { useState } from 'react';

const Box = ({icon, title, buttonTitle, color, href, children}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  const handleRedirect = () => {
    window.location.href = href;
  };

  return (
    <div>
    <div className = {styles.pop_in} style={{ height: "100%", border: '1px solid #ccc', borderRadius: '4px', padding: '20px', backgroundColor: color , width : "15vw", minWidth: "200px", margin : "20px"}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '80px', color: '#61dafb', marginBottom: '5px' }}>
          {icon}
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{title}</h3>
        {(href != null) ? <button className = {styles.btn} onClick={handleRedirect}>{buttonTitle}</button> :
                          <button className = {styles.btn} onClick={openModal}>{buttonTitle}</button> }

      </div>
    </div>
    {showModal ? <Modal title = {title} showModal = {showModal} setShowModal={setShowModal} children = {children} /> : null}
    </div>
  );
};

Box.defaultProps = {
  href: null,
};


export default Box;