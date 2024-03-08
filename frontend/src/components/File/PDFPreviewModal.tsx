import React, { useState, ChangeEvent, useRef } from 'react';
import PDFViewer from 'pdf-viewer-reactjs'; // Install pdf-viewer-reactjs package

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({ isOpen, onClose, pdfUrl }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  // Close the modal
  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-50 relative">
            <button className="absolute top-0 right-0 p-2" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="w-full h-full">
              {/* Your PDF preview content goes here */}
              <iframe src={pdfUrl} className="w-full h-full"></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PDFPreviewModal;