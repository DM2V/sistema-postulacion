import { pb } from "../pocketbase";
import { CV } from "@/types/cv";

export async function getCVs(setCVs: (e: CV[]) => void, userId: string) {
    try {
        const { cv: cvId } = await pb.collection("users").getOne(userId, { fields: "cv" });
        if (!cvId) {
            console.error("Error retrieving CV ID for the user.");
            return;
        }

        const cvRecord = await pb.collection("CV").getOne(cvId, {
            expand: 'personalData,homeAddress,emergencyContact,academicTraining,languages,publications,trainings,professionalExperience,extraPoints,postulacionDocument'
        });

        if (!cvRecord) {
            console.error("Error retrieving CV data for the user.");
            return;
        }

        const cv: CV = {
            id: cvRecord.id,
            personalData: cvRecord.personalData ?? null,
            homeAddress: cvRecord.homeAddress ?? null,
            emergencyContact: cvRecord.emergencyContact ?? null,
            academicTraining: cvRecord.academicTraining ?? [],
            languages: cvRecord.languages ?? [],
            publications: cvRecord.publications ?? [],
            trainings: cvRecord.trainings ?? [],
            professionalExperience: cvRecord.professionalExperience ?? [],
            extraPoints: cvRecord.extraPoints ?? [],
            postulacionDocument: cvRecord.postulacionDocument ?? null
        };

        setCVs([cv]);

    } catch (error) {
        console.error("Error retrieving CV data for the user:", error);
    }
}
