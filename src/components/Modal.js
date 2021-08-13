import React, {useRef, useEffect, useCallback} from 'react'
import {useSpring, animated } from 'react-spring'
import styled from 'styled-components';
import {MdClose} from 'react-icons/md'
const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

`;
const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0,0,0,0.2);
    background: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`;
const ModalImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: #000;
`;
const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    line-height: 1.8;
    color: #141414;
    p{
        margin-bottom: 1rem;
    }

    button{
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
`;
const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;


const Modal = ({showModal, setShowModal}) => {
    const modalRef = useRef();
    const animation = useSpring({
        config: {
            duration: 500
        },
        opacity: showModal? 1: 0,
        transform: showModal? `translateY(0%)` : `translateY(-100%)`
    })
    const closeModal = e=>{        
        if(modalRef.current === e.target){
            console.log(modalRef.current);
            setShowModal(false);
        }
    }
    const keyPress = useCallback(e=>{
        if(e.key === 'Escape' && showModal){
            setShowModal(false);
        }
    }, [setShowModal, showModal])

    useEffect(()=>{
        document.addEventListener('keydown', keyPress);
        return ()=> document.removeEventListener('keydown', keyPress)
    });

    return (
        <>{
            showModal ? 
            <Background ref={modalRef} onClick={closeModal}>
                <animated.div style={animation}>
                    <ModalWrapper showModal={showModal}>
                        <ModalImg src={require('./modal.jpg').default} alt="Modal miror" />
                        <ModalContent >
                            <h1>Are you ready?</h1>
                            <p>Get exclusive access to our nex lauch</p>
                            <button>Join now</button>
                        </ModalContent>
                        <CloseModalButton 
                            aria-label="Close modal"
                            onClick={()=>{setShowModal(prev=>!prev)}}
                        >
                        </CloseModalButton>
                    </ModalWrapper>
                </animated.div>
            </Background>
            : null
        }
          
        </>
    )
}

export default Modal
