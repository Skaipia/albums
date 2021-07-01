import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react'

const ModalWindow = ({isOpen, onClose, src, onNext, onPrev}) => {
    const [currentPhoto = src, setCurrentPhoto] = useState('');

    useEffect(() => {
        if (!currentPhoto) {
            setCurrentPhoto(src)
        }
    }, [currentPhoto])

    if (!isOpen) {
        return null
    }
    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <a className="close-modal" onClick={onClose}> </a>
                    <img src={currentPhoto} alt="popup img"/>
                    <div className="button-block">
                        <button className="prev" onClick={onPrev}>Prev</button>
                        <button className="next" onClick={onNext}>Next</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ModalWindow