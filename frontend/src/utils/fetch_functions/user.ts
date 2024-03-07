import { User, Expandend } from "@/types/user";
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
            cv: userInfo.cv ?? [],
            phaseStatus: userInfo.phaseStatus ?? null,
            offer: userInfo.offer ?? null,
            // expand: userInfo.expand.cv.id ?? undefined
            expand: (userInfo.expand as Expandend) ?? undefined,
        };

        setUser(user);
    } catch (error) {
        console.error("Error retrieving user info:", error);
    }
}
