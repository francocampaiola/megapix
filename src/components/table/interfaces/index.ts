import { MouseEventHandler } from "react";

export interface ToastProps {
    type: string;
    closeToast: MouseEventHandler;
}

export interface DocumentModalProps {
    dniImgFrente: string,
    dniImgDorso: string,
    closeModal: MouseEventHandler;
}

export interface RejectedClientModalProps {
    closeModal: MouseEventHandler;
}
