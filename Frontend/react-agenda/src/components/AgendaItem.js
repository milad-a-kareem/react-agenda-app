import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { IoCreate, IoTrash } from "react-icons/io5";
import { ReactComponent as LoadingIcon } from "../assets/rolling.svg";
import Backdrop from "../Modals/Backdrop";
import EditAgenda from "../Modals/EditAgenda";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { removeAgenda } from "../redux/agenda-slice";

function AgendaItem({ _id, title, description, status, dateTime }) {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const onToggle = () => {
    setIsEditModalOpen((previousState) => !previousState);
  };
  const backdrop = ReactDOM.createPortal(
    <Backdrop onClick={onToggle} />,
    document.getElementById("backdrop")
  );
  const editModal = ReactDOM.createPortal(
    <EditAgenda
      onCancel={onToggle}
      agenda={{ _id, title, description, status, dateTime }}
    />,
    document.getElementById("modal")
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const onDelete = async () => {
    setIsDeleting(true);
    await dispatch(removeAgenda(_id));
    setIsDeleting(false);
  };
  return (
    <div className="flex flex-col gap-2 mb-5 transition-all duration-500">
      <p className="text-sm">
        {new Date(dateTime).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      <div className="p-4 bg-gray-300 rounded-xl flex justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="flex text-lg font-bold">{title}</h1>
          <p className="font-semibold">{status}</p>
          <p>{description}</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <PrimaryButton onClick={onToggle}>
            <IoCreate className="text-xl md:text-lg" />
            <div className="hidden md:flex">Edit</div>
          </PrimaryButton>
          <PrimaryButton onClick={onDelete}>
            {!isDeleting && <IoTrash className="text-xl md:text-lg" />}
            {!isDeleting && <div className="hidden md:flex">Delete</div>}
            {isDeleting && (
              <div className="animate-spin w-6 h-6">
                <LoadingIcon className="w-full h-full stroke-white" />
              </div>
            )}
          </PrimaryButton>
        </div>
      </div>
      {isEditModalOpen && backdrop}
      {isEditModalOpen && editModal}
    </div>
  );
}

export default AgendaItem;
