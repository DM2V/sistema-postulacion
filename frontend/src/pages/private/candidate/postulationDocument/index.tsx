import React, { useState, ChangeEvent } from 'react';
import { InputPropsFile } from '../../types/components/types.t';

import { Eye, DeleteIcon } from '@/assets/icons'; // Importar los íconos

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
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null); // Estado para almacenar el archivo cargado

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) {
            setFileName(newFile.name);
            setError(false);
            setFile(newFile); // Actualizar el archivo cargado en el estado
            if (onChange) {
                onChange(name, newFile);
            }
        } else {
            setFileName('');
            setError(true);
            setFile(null); // Limpiar el archivo cargado en el estado
        }
    };

    const inputBorderColor = error && showErrorIcon
        ? 'border border-red-500'
        : 'border border-tp-body-color';

    const helpText = error ? (
        <div className="text-red-500">{errorMessage}</div>
    ) : (
        <div className="text-blue-500">{helpMessage}</div>
    );

    const handlePreview = () => {
        // Implementar la lógica para abrir un modal y previsualizar el documento
        // Puedes usar el estado `file` para acceder al archivo cargado
        // Abre el modal con la previsualización del archivo
    };

    const handleDelete = () => {
        setFileName('');
        setError(false);
        setFile(null); // Limpiar el archivo cargado en el estado
        // Implementar la lógica para eliminar el archivo
    };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createPostulationDocument(formData);
  }

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1>PostulantionDocumentPage</h1>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div>
              <FileInput
                name={"resume"}
                title="*Hoja de Vida ESPE"
                onChange={handleFileInputChange}
                accept=".pdf"
                 helpMessage="FORMATO ESPE requerido"
                 defaultValue="FORMATO ESPE requerido"
                validationFunction={validateNotEmpty}
              />
              <FileInput
                name={"idCopy"}
                title="*Cédula de Identidad"
                onChange={handleFileInputChange}
                accept=".pdf"
                placeholder=""
                validationFunction={validateNotEmpty}
              />
              <FileInput
                name={"votingCert"}
                title="*Certificado de votación"
                onChange={handleFileInputChange}
                accept=".pdf"
                placeholder=""
                validationFunction={validateNotEmpty}
              />
              <FileInput
                name={"degreeCert"}
                title="*Certificado de registro de título(Senescyt)"
                onChange={handleFileInputChange}
                accept=".pdf"
                placeholder=""
                validationFunction={validateNotEmpty}
              />
              <FileInput
                name={"mecanizadoIess"}
                title="*Mecanizado IESS"
                onChange={handleFileInputChange}
                accept=".pdf"
                placeholder="Historial Laboral(reporte tiempo de servicio por empleador IESS)"
                validationFunction={validateNotEmpty}
              />
              <FileInput
                name={"votingCert"}
                title="*Certificado de no tener impedimento para ejercer cargo público"
                onChange={handleFileInputChange}
                accept=".pdf"
                placeholder="Emitido en línea por el Ministerio de Trabajo"
                validationFunction={validateNotEmpty}
              />
              <FileInput
                name={"votingCert"}
                title="*Certificado de no tener responsabilidades administrativas"
                onChange={handleFileInputChange}
                accept=".pdf"
                placeholder="Emitido en línea por la Contraloría General del Estado"
                validationFunction={validateNotEmpty}
              />
            </div>
<div className="flex items-center justify-center py-4">

            <CheckBox
              name="acceptTerms"
              options={[
                "Declaro que todos los datos y documentos proporcionados en este formulario son veraces y completos, y no he omitido información alguna. Acepto plenamente la responsabilidad en caso de comprobar cualquier falsedad o inexactitud en algunas partes de esta postulación y entiendo que estaré sujeto a las normativas de la institución y otras disposiciones legales vigentes.",
              ]}
              selectedOptions={[]} // Corrected key
              allowMultipleSelection={false}
              onChange={(e) => console.log(e)}
              />

              </div>
            <div className="mt-8 flex justify-end">
              <GreenButton content="Guardar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostulantionDocumentPage;
