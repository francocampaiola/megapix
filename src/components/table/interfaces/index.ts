import { MouseEventHandler } from "react";

export interface ToastProps {
    type: string;
    closeToast: MouseEventHandler;
}

export interface ModalProps {
    closeModal: MouseEventHandler;
}

export interface RejectedClientModalProps {
    closeModal: MouseEventHandler;
}
