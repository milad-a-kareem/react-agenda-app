import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import { ReactComponent as LoadingIcon } from "../assets/rolling.svg";
import { importAgendas } from "../redux/agenda-slice";

function ImportAgendas({ onCancel }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.agenda.loadings.import);
  const serverError = useSelector((state) => state.agenda.errors.import);
  const [isError, setIsError] = useState(false);

  const [file, setFile] = useState(null);

  const onImportHandler = async () => {
    if (!file) {
      setIsError(true);
    } else {
      const formData = new FormData();
      formData.append("file", file);
      await dispatch(importAgendas(formData));
      if (!serverError) {
        onCancel();
      }
    }
  };
  const inputClass = "p-2 border border-black rounded-lg mb-4 shrink-0  ";
  return (
    <div className="overflow-hidden fixed top-1/2 left-1/2 bg-white rounded-xl p-4 -translate-x-1/2 -translate-y-1/2 min-w-[400px] max-w-2xl flex flex-col max-h-[90%] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2">Import Agendas From CSV file</h1>
      {/* <p className="text-sm mb-4">All Fields are required.</p> */}
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        className={inputClass}
        type="file"
        name="file"
        id="file"
        placeholder="Agenda Title"
        accept=".csv"
      />

      {isError && (
        <div className="bg-red-300 p-2 text-sm mb-4 rounded-lg">
          Please, Select a CSV File.
        </div>
      )}
      {serverError && (
        <div className="bg-red-300 p-2 text-sm mb-4 rounded-lg">
          There is an error in the server. Please, Try Again Later.
        </div>
      )}
      <div className="flex items-center justify-center gap-1">
        <PrimaryButton onClick={onImportHandler}>
          {isLoading && (
            <div className="animate-spin w-6 h-6">
              <LoadingIcon className="w-full h-full stroke-white" />
            </div>
          )}
          {isLoading && <div>Importing...</div>}
          {!isLoading && <div>Import</div>}
        </PrimaryButton>
        <PrimaryButton onClick={onCancel}>Cancel</PrimaryButton>
      </div>
    </div>
  );
}

export default ImportAgendas;
