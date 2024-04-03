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

export interface RejectedUserModalProps {
    closeModal: MouseEventHandler;
    rejectUser: (id: number, motivo_rechazo: string) => Promise<void>;
}

