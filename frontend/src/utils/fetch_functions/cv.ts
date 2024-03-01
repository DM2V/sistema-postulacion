import { pb } from "../pocketbase";
import { CvExpandend, PersonalData, HomeAddress, EmergencyContact, AcademicTraining, Language, Publications, Training, ProfessionalExperience, ExtraPoints, PostulacionDocument } from "@/types/cv";


export async function getCVs(setCVs: (e: CvExpandend | null) => void, cvId: string): Promise<void> {
    try {
        const cvRecord = await pb.collection("CV").getOne(cvId, {
            expand: 'personalData,emergencyContact,academicTraining,languages,publications,trainings,professionalExperience,extraPoints,postulacionDocument'
        });

        if (!cvRecord) {
            console.error("Error retrieving CV data for the user.");
            return;
        }

        // const cv: CV = {
        //     id: cvRecord.id,
        //     personalData: cvRecord.personalData ?? null,
        //     homeAddress: cvRecord.homeAddress ?? null,
        //     emergencyContact: cvRecord.emergencyContact ?? null,
        //     academicTraining: cvRecord.academicTraining ?? [],
        //     languages: cvRecord.languages ?? [],
        //     publications: cvRecord.publications ?? [],
        //     trainings: cvRecord.trainings ?? [],
        //     professionalExperience: cvRecord.professionalExperience ?? [],
        //     extraPoints: cvRecord.extraPoints ?? [],
        //     postulacionDocument: cvRecord.postulacionDocument ?? null
        // };
        const cv: CvExpandend = {
            id: cvRecord.id,
            personalData: await fetchPersonalData(cvRecord.personalData),
            homeAddress: await fetchHomeAddress(cvRecord.homeAddress),
            emergencyContact: await fetchEmergencyContact(cvRecord.emergencyContact),
            academicTraining: await fetchAcademicTraining(cvRecord.academicTraining),
            languages: await fetchLanguages(cvRecord.languages),
            publications: await fetchPublications(cvRecord.publications),
            trainings: await fetchTrainings(cvRecord.trainings),
            professionalExperience: await fetchProfessionalExperience(cvRecord.professionalExperience),
            extraPoints: await fetchExtraPoints(cvRecord.extraPoints),
            //postulacionDocument: await fetchPostulacionDocument(cvRecord.postulacionDocument)
        };

        setCVs(cv);

    } catch (error) {
        console.error("Error retrieving CV data for the user:", error);
        setCVs(null);
    }
}


export async function fetchPersonalData(personalDataId: string): Promise<PersonalData> {
    try {
        const record = await pb.collection("users").getOne(personalDataId, {
            expand: "cv,cv.personalData",
            fields: "expand.cv.expand.personalData",
        });

        const personalData = record?.expand?.cv?.personalData;

        if (!personalData) {
            throw new Error("No personal data found");
        }

        return personalData;
    } catch (error) {
        console.error("Error fetching personal data:", error);
        throw new Error("Failed to fetch personal data");
    }
}


export async function fetchHomeAddress(homeAddressId: string): Promise<HomeAddress> {
    try {
        const record = await pb.collection("users").getOne(homeAddressId, {
            expand: "cv,cv.homeAddress",
            fields: "expand.cv.expand.homeAddress",
        });
        const homeAddress = record?.expand?.cv?.homeAddress;
        if (!homeAddress) {
            console.log("No home address found for user");
        }
        return homeAddress;
    } catch (error) {
        console.error("Error fetching personal data:", error);
        throw new Error("Failed to fetch personal data");
    }
}

export async function fetchEmergencyContact(emergencyContactId: string): Promise<EmergencyContact> {
    try {
        const record = await pb.collection("users").getOne(emergencyContactId, {
            expand: "cv,cv.emergencyContact",
            fields: "expand.cv.expand.emergencyContact",
        });
        const emergencyContact = record?.expand?.cv?.emergencyContact;
        if (!emergencyContact) {
            console.log("No emergency contact found for user");
        }
        return emergencyContact;
    } catch (error) {
        console.error("Error fetching personal data:", error);
        throw new Error("Failed to fetch personal data");
    }
}

export async function fetchLanguages(languageIds: string[]): Promise<Language[]> {
    try {
        const languagePromises = languageIds.map(async (languageId) => {
            const record = await pb.collection("Language").getOne(languageId);
            return record.data() as Language; // Convertir los datos recuperados al tipo Language
        });

        const languages = await Promise.all(languagePromises);
        return languages.filter(language => !!language); // Filtrar cualquier valor falso o nulo
    } catch (error) {
        console.error("Error fetching languages:", error);
        return [];
    }
}

export async function fetchPublications(publicationIds: string[]): Promise<Publications[]> {
    try {
        const publicationPromises = publicationIds.map(async (publicationId) => {
            const record = await pb.collection("Publications").getOne(publicationId);
            return record.data() as Publications;
        });

        const publications = await Promise.all(publicationPromises);
        return publications.filter(publication => !!publication);
    } catch (error) {
        console.error("Error fetching publications:", error);
        return [];
    }
}

export async function fetchTrainings(trainingIds: string[]): Promise<Training[]> {
    try {
        const trainingPromises = trainingIds.map(async (trainingId) => {
            const record = await pb.collection("Training").getOne(trainingId);
            return record.data() as Training;
        });
        const trainings = await Promise.all(trainingPromises);
        return trainings.filter(training => !!training);
    } catch (error) {
        console.error("Error fetching trainings:", error);
        return [];
    }
}

export async function fetchProfessionalExperience(professionalExperienceIds: string[]): Promise<ProfessionalExperience[]> {
    try {
        const professionalExperiencePromises = professionalExperienceIds.map(async (professionalExperienceId) => {
            const record = await pb.collection("ProfessionalExperience").getOne(professionalExperienceId);
            return record.data() as ProfessionalExperience;
        });
        const professionalExperiences = await Promise.all(professionalExperiencePromises);
        return professionalExperiences.filter(professionalExperience => !!professionalExperience);
    } catch (error) {
        console.error("Error fetching professional experiences:", error);
        return [];
    }
}

export async function fetchAcademicTraining(academicTrainingIds: string[]): Promise<AcademicTraining[]> {
    try {
        const academicTrainingPromises = academicTrainingIds.map(async (academicTrainingId) => {
            const record = await pb.collection("AcademicTraining").getOne(academicTrainingId);
            return record.data() as AcademicTraining;
        });
        const academicTrainings = await Promise.all(academicTrainingPromises);
        return academicTrainings.filter(academicTraining => !!academicTraining);
    } catch (error) {
        console.error("Error fetching academic trainings:", error);
        return [];
    }
}

export async function fetchExtraPoints(extraPointsId: string): Promise<ExtraPoints> {
    try {
        const record = await pb.collection("users").getOne(extraPointsId, {
            expand: "cv,cv.extraPoints",
            fields: "expand.cv.expand.extraPoints",
        });
        const extraPoints = record?.expand?.cv?.extraPoints;
        if (!extraPoints) {
            console.log("No extra points found for user");
        }
        return extraPoints;
    } catch (error) {
        console.error("Error fetching extra points:", error);
        throw new Error("Failed to fetch extra points");
    }
}

export async function fetchPostulacionDocument(postulacionDocumentId: string): Promise<PostulacionDocument> {
    try {
        const record = await pb.collection("users").getOne(postulacionDocumentId, {
            expand: "cv,cv.postulacionDocument",
            fields: "expand.cv.expand.postulacionDocument",
        });

        return record?.expand?.cv?.postulacionDocument ?? null;
    } catch (error) {
        console.error("Error fetching postulacion document:", error);
        throw new Error("Failed to fetch personal document");
    }
}

// The same but for the users
export async function fetchLanguagesForUser(userId: string) {
    try {
        const record = await pb.collection("users").getOne(userId, {
            expand: "cv,cv.languages",
            fields: "expand.cv.expand.languages",
        });
        if (record?.expand?.cv?.expand?.languages) {
            return record.expand.cv.expand.languages;
        } else {
            console.log("No languages found for user");
            return null;
        }
    } catch (error) {
        console.error("Error fetching languages:", error);
        return null;
    }
}
export async function fetchPublicationsForUser(userId: string) {
    try {
        const record = await pb.collection("users").getOne(userId, {
            expand: "cv,cv.publications",
            fields: "expand.cv.expand.publications",
        });
        if (record?.expand?.cv?.expand?.publications) {
            return record.expand.cv.expand.publications;
        } else {
            console.log("No publications found for user");
            return null;
        }
    } catch (error) {
        console.error("Error fetching publications:", error);
        return null;
    }
}

export async function fetchAcademicTrainingForUser(userId: string) {
    try {
        const record = await pb.collection("users").getOne(userId, {
            expand: "cv,cv.academicTraining",
            fields: "expand.cv.expand.academicTraining",
        });
        if (record?.expand?.cv?.expand?.academicTraining) {
            return record.expand.cv.expand.academicTraining;
        } else {
            console.log("No academic training found for user");
            return null;
        }
    } catch (error) {
        console.error("Error fetching academic training:", error);
        return null;
    }
}
