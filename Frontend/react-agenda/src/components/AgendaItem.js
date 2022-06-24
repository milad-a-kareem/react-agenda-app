import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { IoCreate, IoTrash } from "react-icons/io5";
import { ReactComponent as LoadingIcon } from "../assets/rolling.svg";
import env from "../env";

function AgendaItem({ _id, title, description, status, dateTime }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const onDelete = () => {
    setIsDeleting(true);
    fetch(`${env.url}/agendas/${_id}`, { method: "delete" })
      .then((res) => {
        if (!res.ok) {
          setIsDeleting(false);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setIsDeleting(false);
      })
      .catch((err) => {
        setIsDeleting(false);
      });
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
          <PrimaryButton>
            <IoCreate className="text-xl md:text-lg" />
            <div className="hidden md:flex">Edit</div>
          </PrimaryButton>
          <PrimaryButton onClick={onDelete}>
            {!isDeleting && <IoTrash className="text-xl md:text-lg" />}
            {!isDeleting && <div className="hidden md:flex">Delete</div>}
            {isDeleting && (
              <div className="animate-spin w-6 h-6">
                <LoadingIcon className="w-full h-full fill-white" />
              </div>
            )}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default AgendaItem;
