import { pb } from "../pocketbase";
import { CvExpandend, PersonalData, HomeAddress, EmergencyContact, AcademicTraining, Language, Publications, Training, ProfessionalExperience, ExtraPoints, PostulacionDocument } from "@/types/cv";


export async function getCVs(setCVs: (e: CvExpandend | null) => void, cvId: string): Promise<void> {
    try {
        const cvRecord = await pb.collection("CV").getOne(cvId, {});
        if (!cvRecord) {
            console.error("Error retrieving CV data for the user.");
            return;
        }

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
            postulacionDocument: await fetchPostulacionDocument(cvRecord.postulacionDocument)
        };
        setCVs(cv);
    } catch (error) {
        console.error("Error retrieving CV data for the user:", error);
        setCVs(null);
    }
}

export async function fetchPersonalData(personalDataId: string): Promise<PersonalData> {
    try {
        const record = await pb.collection("PersonalData").getOne(personalDataId);
        const personalData: PersonalData = {
            name: record.name,
            lastName1: record.lastName1,
            lastName2: record.lastName2,
            birthDate: record.birthDate,
            gender: record.gender,
            bloodType: record.bloodType,
            maritalStatus: record.maritalStatus,
            nationality: record.nationality,
            residenceYears: record.residenceYears,
            ethnicIdentification: record.ethnicIdentification,
            ethnicGroup: record.ethnicGroup,
            specialCapacity: record.catastrophicDisease,
            catastrophicDisease: record.disabilityType,
            catastrophicDiseaseType: record.catastrophicDiseaseType,
            disabilityType: record.disabilityType,
            disabilityPercentage: record.disabilityPercentage,
            MSPIDNumber: record.MSPIDNumber,
            avatar: record.avatar
        }
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
        const record = await pb.collection("HomeAddress").getOne(homeAddressId);
        const homeData: HomeAddress = {
            province: record.province,
            canton: record.canton,
            parish: record.parish,
            mainStreet: record.mainStreet,
            secondaryStreet: record.secondaryStreet,
            reference: record.reference,
            number: record.number,
            homePhone: record.homePhone,
            cellPhone: record.cellPhone,
            workPhone: record.workPhone,
            extencion: record.extencion
        }
        if (!homeData) {
            console.log("No home address found for user");
        }
        return homeData;
    } catch (error) {
        console.error("Error fetching personal data:", error);
        throw new Error("Failed to fetch personal data");
    }
}

export async function fetchEmergencyContact(emergencyContactId: string): Promise<EmergencyContact> {
    try {
        const record = await pb.collection("EmergencyContact").getOne(emergencyContactId);
        const emergencyData: EmergencyContact = {
            name: record.name,
            lastName1: record.lastName1,
            lastName2: record.lastName2,
            typeIdentification: record.typeIdentification,
            identification: record.identification,
            relationship: record.relationship,
            province: record.province,
            canton: record.canton,
            parish: record.parish,
            mainStreet: record.mainStreet,
            secondaryStreet: record.secondaryStreet,
            reference: record.reference,
            number: record.number,
            homePhone: record.homePhone,
            cellPhone: record.cellPhone
        }
        if (!emergencyData) {
            console.log("No emergency contact found for user");
        }
        return emergencyData;
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
        const record = await pb.collection("ExtraPoints").getOne(extraPointsId);
        const extraPointsData: ExtraPoints = {
            professionalExperienceEspe: record.professionalExperienceEspe,
            fileProfessionalExperienceEspe: record.fileProfessionalExperienceEspe,
            fileNationalInternationalAwards: record.fileNationalInternationalAwards,
            fileProfessionalAcademicRecognition: record.fileProfessionalAcademicRecognition,
            twonsNationalities: record.twonsNationalities,
            fileTwonsNationalities: record.fileTwonsNationalities,
            disability: record.disability,
            fileDisability: record.fileDisability,
            warHeroes: record.warHeroes,
            filewarHeroes: record.filewarHeroes,
            vulnerableSituations: record.vulnerableSituations,
            fileVulnerableSituations: record.fileVulnerableSituations,
            genderWomen: record.genderWomen
        };
        if (!extraPointsData) {
            console.log("No extra points found for user");
        }
        return extraPointsData;
    } catch (error) {
        console.error("Error fetching extra points:", error);
        throw new Error("Failed to fetch extra points");
    }
}

export async function fetchPostulacionDocument(postulacionDocumentId: string): Promise<PostulacionDocument> {
    try {
        const record = await pb.collection("PostulacionDocument").getOne(postulacionDocumentId);
        const postulationData: PostulacionDocument = {
            offerId: record.offerId,
            resume: record.resume,
            idCopy: record.idCopy,
            votingCert: record.votingCert,
            degreeCert: record.degreeCert,
            mecanizadoIess: record.mecanizadoIess,
            noImpedimentCert: record.noImpedimentCert,
            noAdminResponsibilityCert: record.noAdminResponsibilityCert
        }

        return postulationData ?? null;
    } catch (error) {
        console.error("Error fetching postulacion document:", error);
        throw new Error("Failed to fetch personal document");
    }
}

// The same but for the users
  export async function fetchPersonalDataForUser(userId: string) {
    try {
      const record = await pb.collection("users").getOne("msof6xv1zl55pof", {
        expand: "cv,cv.personalData",
        fields: "expand.cv.expand.personalData",
      });
      if (record?.expand?.cv?.expand?.personalData) {
        return record.expand.cv.expand.personalData;
      } else {
        console.log("No personal data found for user");
        return null;
      }
    } catch (error) {
      console.error("Error fetching personal data:", error);
        return null;
    }
  }


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
