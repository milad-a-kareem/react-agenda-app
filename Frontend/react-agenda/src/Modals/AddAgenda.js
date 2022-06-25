import React, { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { ReactComponent as LoadingIcon } from "../assets/rolling.svg";
import { useDispatch, useSelector } from "react-redux";
import { addAgenda } from "../redux/agenda-slice";

function AddAgenda({ onCancel }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.agenda.loadings.addOne);
  const serverError = useSelector((state) => state.agenda.errors.addOne);
  const [isError, setIsError] = useState(false);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const onAdd = async () => {
    if (!title || !description || !status || !dateTime) {
      setIsError(true);
    } else {
      await dispatch(addAgenda({ title, description, status, dateTime }));
      if (!serverError) {
        onCancel();
      }
    }
  };
  const inputClass = "p-2 border border-black rounded-lg mb-4 shrink-0  ";
  return (
    <div className="overflow-hidden fixed top-1/2 left-1/2 bg-white rounded-xl p-4 -translate-x-1/2 -translate-y-1/2 min-w-[300px] max-w-2xl flex flex-col max-h-[90%] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2">Add New Agenda</h1>
      <p className="text-sm mb-4">All Fields are required.</p>
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className={inputClass}
        type="text"
        name="title"
        id="title"
        placeholder="Agenda Title"
      />

      <textarea
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className={inputClass}
        type="text"
        name="description"
        id="description"
        placeholder="Agenda Description"
      />
      <input
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        className={inputClass}
        type="text"
        name="status"
        id="status"
        placeholder="Agenda Status"
      />
      <input
        onChange={(e) => {
          setDateTime(e.target.value);
        }}
        className={inputClass}
        type="datetime-local"
        name="dateTime"
        id="dateTime"
        placeholder="Agenda Date and Time"
      />
      {isError && (
        <div className="bg-red-300 p-2  mb-4 rounded-lg">
          Please fill all form fields.
        </div>
      )}
      {serverError && (
        <div className="bg-red-300 p-2  mb-4 rounded-lg">
          There is an error in the server. Please, Try Again Later.
        </div>
      )}
      <div className="flex items-center justify-center gap-1">
        <PrimaryButton onClick={onAdd}>
          {isLoading && (
            <div className="animate-spin w-6 h-6">
              <LoadingIcon className="w-full h-full stroke-white" />
            </div>
          )}
          {!isLoading && <div>Add Agenda</div>}
        </PrimaryButton>
        <PrimaryButton onClick={onCancel}>Cancel</PrimaryButton>
      </div>
    </div>
  );
}

export default AddAgenda;
