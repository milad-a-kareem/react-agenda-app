import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { IoAdd, IoCloudDownload, IoCloudUpload } from "react-icons/io5";
import ReactDOM from "react-dom";
import env from "../env";
import Backdrop from "../Modals/Backdrop";
import AddAgenda from "../Modals/AddAgenda";
import ImportAgendas from "../Modals/ImportAgendas";

function Header() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(0);
  const onToggle = () => {
    setSelectedModal(0);
    setIsAddModalOpen((previousState) => !previousState);
  };
  const onToggleImport = () => {
    setSelectedModal(1);
    setIsImportModalOpen((previousState) => !previousState);
  };
  const backdrop = ReactDOM.createPortal(
    <Backdrop onClick={selectedModal === 0 ? onToggle : onToggleImport} />,
    document.getElementById("backdrop")
  );
  const addModal = ReactDOM.createPortal(
    <AddAgenda onCancel={onToggle} />,
    document.getElementById("modal")
  );
  const importModal = ReactDOM.createPortal(
    <ImportAgendas onCancel={onToggleImport} />,
    document.getElementById("modal")
  );
  return (
    <div className="w-full bg-blue-900 h-20 flex justify-between items-center px-4 sm:px-14 text-white sticky top-0">
      <h1 className="font-bold text-2xl">AGENDAS</h1>
      <div className="flex gap-2">
        <PrimaryButton onClick={onToggleImport}>
          <IoCloudUpload className="text-xl md:text-lg" />
          <div className="hidden md:flex">Import</div>
        </PrimaryButton>
        <a href={`${env.url}/agendas/export`} target="_blank" rel="noreferrer">
          <PrimaryButton>
            <IoCloudDownload className="text-xl md:text-lg" />
            <div className="hidden md:flex">Export</div>
          </PrimaryButton>
        </a>

        <div className="fixed bottom-4 right-4 md:static">
          <PrimaryButton onClick={onToggle}>
            <IoAdd className="text-xl md:text-lg" />
            <div className="hidden md:flex">Add New</div>
          </PrimaryButton>
        </div>
      </div>
      {isAddModalOpen && backdrop}
      {isAddModalOpen && addModal}
      {isImportModalOpen && backdrop}
      {isImportModalOpen && importModal}
    </div>
  );
}

export default Header;
