import type { AppContextType } from "../../context/AppContext";
import styles from "./Modal.module.css";
import closeIcon from "../../assets/icons/close.png";

interface ModalProps {
    children: React.ReactNode;
    setActiveModal: AppContextType["setIsSignUpActive"];
}

function Modal({ children, setActiveModal }: ModalProps) {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                {children}
                <button
                    className={styles.closeBtn}
                    onClick={() => setActiveModal(false)}
                    type="button"
                >
                    <img className="icon" src={closeIcon} alt="close icon" />
                </button>
            </div>
        </div>
    );
}

export default Modal;
