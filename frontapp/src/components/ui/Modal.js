import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const Modal = (props) => {
  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape') {
        props.closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
    // eslint-disable-next-line
  }, []);

  const backdropClickHandler = (event) => {
    if (event.target.parentElement.parentElement.id === 'modal-root') {
      props.closeModal();
    }
  };

  if (!props.open) {
    return null;
  } else {
    return createPortal(
      <Backdrop onClick={backdropClickHandler}>{props.children}</Backdrop>,
      document.getElementById('modal-root')
    );
  }
};

export default Modal;
