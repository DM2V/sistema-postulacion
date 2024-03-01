import FileInput from "@/components/File/FileInput";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import React from "react";
import { Language } from "@/types/cv";

type CreateFormLanguageProps = {
  selectedElement?: Language ;
};


function CreateFormLanguage({ selectedElement }: CreateFormLanguageProps) {
  const handleFileChange = (file: File) => {
    // Handle file change, e.g., upload or save the file
    console.log(`Selected file: ${file.name}`);
  };

  const handleViewClick = () => {
    // Implement the logic to view the selected file
    console.log("View button clicked");
  };

  const handleDeleteClick = () => {
    // Implement the logic to delete the selected file
    console.log("Delete button clicked");
  };
  console.log(selectedElement);

  return (
    <>
      <div className="w-1/2 px-3">
        <InputLabel
          name="language"
          title="Idioma"
          placeholder={selectedElement?.language ?? ""}
          defaultValue={selectedElement?.language ?? ""}
        />
      </div>
      <div className="w-1/2 px-3">
        <InputLabel
          name="europeanFrameworkLevel"
          title="Nivel según el Marco Común Europeo de Referencia para las lenguas"
          placeholder={selectedElement?.europeanFrameworkLevel ?? ""}
          defaultValue={selectedElement?.europeanFrameworkLevel ?? ""}
        />
      </div>
      <div className="w-full px-3">
        <DateInput
          name="certificationDate"
          title="Fecha de certificación"
          defaultValue={selectedElement?.certificationDate!.slice(0,10) ?? ""}
        />
        {/* <FileInput
          onFileChange={handleFileChange}
          onViewClick={handleViewClick}
          onDeleteClick={handleDeleteClick}
        /> */}
      </div>
    </>
  );
}

export default CreateFormLanguage;
