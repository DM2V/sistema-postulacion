import GreenButton from "@/components/Buttons/GreenButton";
import FileInput from "@/components/File/FileInput";
import CheckBox from "@/components/Form/CheckBox";
import { CVGENERATOR, PERSONALINFORMATION, POSTULATIONFINISH } from "@/routes/paths";
import { PostulacionDocument } from "@/types/cv";
import { pb } from "@/utils/pocketbase";
import { validateNotEmpty } from "@/utils/validations";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";

const PostulantionDocumentPage: FC = () => {
  const router = useRouter();
  const [postulationDocument, setPostulationDocument] =
    useState<PostulacionDocument | null>(null);

  const [fileMap, setFileMap] = useState({
    resume: null,
    idCopy: null,
    votingCert: null,
    degreeCert: null,
    mecanizadoIess: null,
    noImpedimentCert: null,
    noAdminResponsibilityCert: null,
  });

  async function createPostulationDocument(formData: FormData) {
    const postulationData = {
      ...fileMap,
    };
    try {
      const { cv } = await pb
        .collection("users")
        .getOne("msof6xv1zl55pof", { fields: "cv" });
      if (!cv) {
        console.error("Error retrieving CV data.");
        return;
      }

      const extraPointDataCreated = await pb
        .collection("PostulacionDocument")
        .create(postulationData);
      const dataCV = { extraPoints: extraPointDataCreated.id }; // Corrected key
      await pb.collection("CV").update(cv, dataCV);

      router.push(CVGENERATOR);
    } catch (error) {
      console.error("Error creating personal data:", error);
    }
  }

  const handleFileInputChange = (name: string, selectedFile: File | null) => {
    setFileMap({ ...fileMap, [name]: selectedFile });
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createPostulationDocument(formData);
  }

  return (

    <div className="container mx-auto py-8">
      <div className="w-full">
        <div className="flex flex-row items-center justify-between">
          <h3 className="font-bold text-ter-color mb-3">Subir Información</h3>
        </div>
        <p className="text-red-500  pb-6">
          *Todos los documentos deben ser subidos en formato PDF.
        </p>

        <form onSubmit={handleSubmit} className="flex justify-center items-end flex-col">
          <div className="flex">
            <Link href={PERSONALINFORMATION}>
              <GreenButton content="Crear Hoja de Vida ESPE" />
            </Link>
            <p className="text-white">
              Crear Hoja de Vida ESPE
            </p>
          </div>
          <div className="w-full">
            <FileInput
              name={"resume"}
              title="*Hoja de Vida ESPE"
              onChange={handleFileInputChange}
              accept=".pdf"
              description="Formato ESPE requerido"
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
              validationFunction={validateNotEmpty}
            />
            <FileInput
              name={"mecanizadoIess"}
              title="*Mecanizado IESS"
              onChange={handleFileInputChange}
              accept=".pdf"
              description="Historial Laboral(reporte tiempo de servicio por empleador IESS)"
              validationFunction={validateNotEmpty}
            />
            <FileInput
              name={"votingCert"}
              title="*Certificado de no tener impedimento para ejercer cargo público"
              onChange={handleFileInputChange}
              accept=".pdf"
              description="Emitido en línea por el Ministerio de Trabajo"
              validationFunction={validateNotEmpty}
            />
            <FileInput
              name={"votingCert"}
              title="*Certificado de no tener responsabilidades administrativas"
              onChange={handleFileInputChange}
              accept=".pdf"
              description="Emitido en línea por la Contraloría General del Estado"
              validationFunction={validateNotEmpty}
            />
          </div>
          <p>
            **Rellene todos los campos obligatorios para enviar su
            postulación.
          </p>
          <div className="flex items-center justify-center py-4 my-4">
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
        </form>
          <div className="mt-8 flex justify-center">
            <Link href={POSTULATIONFINISH}>
            <GreenButton content="Guardar" />
            </Link>
          </div>
      </div>
    </div>

  );
};

export default PostulantionDocumentPage;
