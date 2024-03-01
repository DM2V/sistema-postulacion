import React, { useEffect, useState } from "react";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import FileInput from "@/components/Form/FileLabel";
import { validateNotEmpty } from "@/utils/validations";
import { Language } from "@/types/cv";

type CreateFormLanguageProps = {
  selectedElement?: Language;
};

function CreateFormLanguage({ selectedElement }: CreateFormLanguageProps) {
  const [file, setFile] = useState<File | undefined>();
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
  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full px-3">
        <InputLabel
          name="language"
          title="Idioma"
          placeholder={selectedElement?.language ?? ""}
          defaultValue={selectedElement?.language ?? ""}
        />

        <InputLabel
          name="europeanFrameworkLevel"
          title="Nivel según el Marco Común Europeo de Referencia para las lenguas"
          placeholder={selectedElement?.europeanFrameworkLevel ?? ""}
          defaultValue={selectedElement?.europeanFrameworkLevel ?? ""}
        />
        <DateInput
          name="certificationDate"
          title="Fecha de certificación"
          defaultValue={selectedElement?.certificationDate!.slice(0, 10) ?? ""}
        />
        <FileInput
          name={"certificate"}
          title="Digitalización del título obtenido"
          onChange={(name, selectedFile) => {
            setFile(selectedFile);
          }}
          accept=".pdf"
          placeholder="Subir Bases del Concurso"
          validationFunction={validateNotEmpty}
        />
      </div>
    </>
  );
}

export default CreateFormLanguage;
