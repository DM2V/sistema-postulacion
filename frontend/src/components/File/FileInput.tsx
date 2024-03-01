// components/FileInput.tsx
import React, { useState, ChangeEvent } from 'react';
import { FileInputProps } from '@/types/components/types.t';
import { Document, Page } from 'react-pdf';
import Modal from 'react-modal';


const FileInput: React.FC<FileInputProps> = ({ onFileChange, onViewClick, onDeleteClick }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileChange(file);

      // Optionally, you can extract the number of pages using react-pdf
      // For simplicity, we'll set it to null in this example
      setNumPages(null);
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Choose File
      </label>

      {selectedFile && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">{selectedFile.name}</span>
          {numPages && <span className="text-gray-600">Pages: {numPages}</span>}

          <button
            onClick={() => {
              onViewClick();
              openModal();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            View
          </button>
          <button
            onClick={() => {
              setSelectedFile(null);
              onDeleteClick();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="PDF Preview"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <Document file={selectedFile} onLoadSuccess={handleDocumentLoadSuccess}>
          {Array.from(new Array(numPages || 0), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
        <button onClick={closeModal} className="modal-close">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default FileInput;
