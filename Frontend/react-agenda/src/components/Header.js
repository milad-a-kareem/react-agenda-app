import React from "react";
import PrimaryButton from "./PrimaryButton";
import {
  IoAdd,
  IoTrash,
  IoCloudDownload,
  IoCloudUpload,
} from "react-icons/io5";
function Header() {
  return (
    <div className="w-full bg-blue-900 h-20 flex justify-between items-center px-4 sm:px-14 text-white sticky top-0">
      <h1 className="font-bold text-2xl">AGENDAS</h1>
      <div className="flex gap-2">
        <PrimaryButton>
          <IoCloudUpload className="text-xl md:text-lg" />
          <div className="hidden md:flex">Import</div>
        </PrimaryButton>
        <PrimaryButton>
          <IoCloudDownload className="text-xl md:text-lg" />
          <div className="hidden md:flex">Export</div>
        </PrimaryButton>
        <PrimaryButton>
          <IoTrash className="text-xl md:text-lg" />
          <div className="hidden md:flex">Delete All</div>
        </PrimaryButton>
        <div className="fixed bottom-4 right-4 md:static">
          <PrimaryButton>
            <IoAdd className="text-xl md:text-lg" />
            <div className="hidden md:flex">Add New</div>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
