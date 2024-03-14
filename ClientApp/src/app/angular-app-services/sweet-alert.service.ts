import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SweetAlertService {

    async showDeleteConfirmationDialog(): Promise<boolean> {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'sweet-alert-confirm-button',
                cancelButton: 'sweet-alert-cancel-button'
            }
        });
        return result.isConfirmed;
    }

    showSuccess(text: string): void {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            iconColor: "#FFF",
            color: "#FFF",
            background: '#0bb783',
            customClass: {
                title: 'sweetalert-toast-title',
            }
        });
        Toast.fire({
            icon: "success",
            title: text
        });
    }

    showError(text: string): void {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: false,
            iconColor: "#FFF",
            color: "#FFF",
            background: '#ff4743',
            customClass: {
                title: 'sweetalert-toast-title',
            }
        });
        Toast.fire({
            icon: "error",
            title: text
        });
    }

    showWarning(text: string): void {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: false,
            iconColor: "#FFF",
            color: "#FFF",
            background: '#DF7615',
            customClass: {
                title: 'sweetalert-toast-title',
            }
        });
        Toast.fire({
            icon: "warning",
            title: text
        });
    }

    showInfo(text: string): void {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: false,
            iconColor: "#FFF",
            color: "#FFF",
            background: '#808080',
            customClass: {
                title: 'sweetalert-toast-title',
            }
        });
        Toast.fire({
            icon: "info",
            title: text
        });
    }
}