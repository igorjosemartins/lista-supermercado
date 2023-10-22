import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SuccessNotification() {
  return (
    <div>
      <ToastContainer autoClose={2000}/>
    </div>
  )
}

export function notifySuccess(message) {
  toast.success(message);
}

export default SuccessNotification;