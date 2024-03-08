import React, { useState, ChangeEvent, useRef } from "react";
import { InputPropsFile } from "../../types/components/types.t";
// import { PDFPreviewModal } from './PDFPreviewModal';
import PDFPreviewModal from "./PDFPreviewModal";

const FileInput: React.FC<InputPropsFile> = ({
  name,
  title,
  placeholder,
  helpMessage,
  errorMessage,
  disabled = false,
  accept,
  showErrorIcon = true,
  onChange,
}) => {
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [filePages, setFilePages] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setError(false);
      if (onChange) {
        onChange(name, file);
      }

      // Example: Set the number of pages of the uploaded document
      // Replace this with your actual logic to get the number of pages
      setFilePages(10); // Set the actual number of pages here
      setPdfUrl('url_to_your_pdf.pdf');

    } else {
      setFileName("");
      setError(true);
      setFilePages(0);
    }
  };

  const handleDelete = () => {
    setFileName("");
    setError(false);
    setFilePages(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value
    }
    // Add any additional logic you need when the user deletes the file
  };

  const inputBorderColor =
    error && showErrorIcon
      ? "border border-red-500"
      : "border border-tp-body-color";

  const helpText = error ? (
    <div className="text-red-500">{errorMessage}</div>
  ) : (
    <div className="text-blue-500">{helpMessage}</div>
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative mb-3">
      <label
        htmlFor={name}
        className="mb-1 block font-semibold text-tp-body-color"
      >
        {title}
      </label>
      <input
        ref={fileInputRef}
        id={name}
        name={name}
        type="file"
        className={`w-full rounded-lg p-2 outline-none ${inputBorderColor}`}
        placeholder={placeholder}
        onChange={handleFileChange}
        disabled={disabled}
        accept={accept}
      />
      {helpText}
      {fileName && (
        <div className="mt-2 flex items-center">
          <span className="mr-2">{`File: ${fileName}`}</span>
          <span className="mr-2">{`Pages: ${filePages}`}</span>
          <button
            onClick={handleDelete}
            className="cursor-pointer text-red-500"
          >
            Delete
          </button>
          <button
            onClick={openModal}
            className="ml-2 cursor-pointer text-blue-500"
          >
            Preview
          </button>
        </div>
      )}
      {modalOpen && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-4">
            {/* Your preview content goes here */}
            <PDFPreviewModal
              isOpen={modalOpen}
              onClose={closeModal}
              pdfUrl={"url_to_your_pdf.pdf"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;
