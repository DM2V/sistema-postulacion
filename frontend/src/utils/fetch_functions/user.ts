import { User } from "@/types/user";
import { CV, PersonalData, HomeAddress, EmergencyContact, AcademicTraining, Language, Publications, Training, ProfessionalExperience, ExtraPoints, PostulacionDocument } from "@/types/cv";
import { pb } from "../pocketbase";

export async function getUserInfo(userId: string, setUser: (e: User) => void): Promise<void> {
    try {
        // Obtener la información del usuario con campos expandidos
        const userInfo = await pb.collection('users').getOne(userId, {
            expand: 'cv.personalData,cv.homeAddress,cv.emergencyContact,cv.academicTraining,cv.languages,cv.publications,cv.trainings,cv.professionalExperience,cv.extraPoints,cv.postulacionDocument'
        });

        if (!userInfo) {
            console.error("Error retrieving user info.");
            return;
        }

        const userCV: CV = {
            id: userInfo.cv?.id ?? null,
            personalData: userInfo.cv?.personalData as PersonalData,
            homeAddress: userInfo.cv?.homeAddress as HomeAddress,
            emergencyContact: userInfo.cv?.emergencyContact as EmergencyContact,
            academicTraining: userInfo.cv?.academicTraining as AcademicTraining[],
            languages: userInfo.cv?.languages as Language[],
            publications: userInfo.cv?.publications as Publications[],
            trainings: userInfo.cv?.trainings as Training[],
            professionalExperience: userInfo.cv?.professionalExperience as ProfessionalExperience[],
            extraPoints: userInfo.cv?.extraPoints as ExtraPoints,
            postulacionDocument: userInfo.cv?.postulacionDocument as PostulacionDocument
        };

        const user: User = {
            id: userInfo.id, 
            period: userInfo.period ?? null,
            identificationNumber: userInfo.identificationNumber ?? "",
            name: userInfo.name ?? null,
            lastName: userInfo.lastName ?? null,
            password: userInfo.password ?? null,
            email: userInfo.email ?? "",
            avatar: userInfo.avatar ?? null,
            role: userInfo.role ?? "candidate",
            cv: [userCV] ?? null,
            phaseStatus: userInfo.phaseStatus ?? null,
            offer: userInfo.offer ?? null,
            expand: userInfo.expand ?? null
        };

        setUser(user);
    } catch (error) {
        console.error("Error retrieving user info:", error);
    }
}
