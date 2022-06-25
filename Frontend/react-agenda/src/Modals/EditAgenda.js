import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import { updateAgenda } from "../redux/agenda-slice";
import { ReactComponent as LoadingIcon } from "../assets/rolling.svg";

function EditAgenda({ onCancel, agenda }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.agenda.loadings.updateOne);
  const serverError = useSelector((state) => state.agenda.errors.updateOne);
  const [isError, setIsError] = useState(false);

  const [title, setTitle] = useState(agenda.title);
  const [description, setDescription] = useState(agenda.description);
  const [status, setStatus] = useState(agenda.status);
  const [dateTime, setDateTime] = useState(agenda.dateTime);

  const onAdd = async () => {
    if (!title || !description || !status || !dateTime) {
      setIsError(true);
    } else {
      await dispatch(
        updateAgenda({ _id: agenda._id, title, description, status, dateTime })
      );
      if (!serverError) {
        onCancel();
      }
    }
  };
  const inputClass = "p-2 border border-black rounded-lg mb-4 shrink-0  ";
  return (
    <div className="overflow-hidden fixed top-1/2 left-1/2 bg-white rounded-xl p-4 -translate-x-1/2 -translate-y-1/2 min-w-[300px] max-w-2xl flex flex-col max-h-[90%] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2">Edit Agenda</h1>
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
        value={title}
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
        value={description}
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
        value={status}
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
        value={new Date(dateTime).toISOString().split(".")[0]}
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
          {!isLoading && <div>Update Agenda</div>}
        </PrimaryButton>
        <PrimaryButton onClick={onCancel}>Cancel</PrimaryButton>
      </div>
    </div>
  );
}

export default EditAgenda;
