import { Country } from "@/types/staticData";
import { pb } from "../pocketbase";


// Location
export async function getCountry(setCountry: (e: Country[]) => void) {
    try {
        const records = await pb.collection('Country').getFullList<Country>({
            sort: '-created',

        });
        setCountry(records);
    } catch (error) { }
}

export async function getProvince(setProvince: (e: any[]) => void) {
    try {
        const records = await pb.collection('Province').getFullList<Country>({
            sort: '-created',
        });

        setProvince(records);
    } catch (error) { }
}

export async function getCanton(setCanton: (e: any[]) => void) {
    try {
        const records = await pb.collection('Canton').getFullList({
            sort: '-created',
        });

        setCanton(records);
    } catch (error) { }
}

export async function getParish(setParish: (e: any[]) => void) {
    try {
        const records = await pb.collection('Parish').getFullList({
            sort: '-created',
        });

        setParish(records);
    } catch (error) { }
}


// Personal Data
export async function getIdentificationType(setIdentificationType: (e: any[]) => void) {
    try {
        const records = await pb.collection('IdentificationType').getFullList({
            sort: '-created',
        });
        setIdentificationType(records);
    } catch (error) { }
}

export async function getGender(setGender: (e: any[]) => void) {
    try {
        const records = await pb.collection('Gender').getFullList({
            sort: '-created',
        });
        setGender(records);
    }
    catch (error) { }
}

export async function getBloodType(setBloodType: (e: any[]) => void) {
    try {
        const records = await pb.collection('BloodType').getFullList({
            sort: '-created',
        });
        setBloodType(records);
    }
    catch (error) { }
}

export async function getMaritalStatus(setMaritalStatus: (e: any[]) => void) {
    try {
        const records = await pb.collection('MaritalStatus').getFullList({
            sort: '-created',
        });
        setMaritalStatus(records);
    }
    catch (error) { }
}

export async function getEthnicIdentification(setEthnicIdentification: (e: any[]) => void) {
    try {
        const records = await pb.collection('EthnicIdentification').getFullList({
            sort: '-created',
        });
        setEthnicIdentification(records);
    } catch (error) { }
}

export async function getEthnicGroup(setEthnicGroup: (e: any[]) => void) {
    try {
        const records = await pb.collection('EthnicGroup').getFullList({
            sort: '-created',
        });
        setEthnicGroup(records);
    } catch (error) { }
}

export async function getEmergencyRelationship(setEmergencyRelationship: (e: any[]) => void) {
    try {
        const records = await pb.collection('EmergencyContactData').getFullList({
            sort: '-created',
        });
        setEmergencyRelationship(records);
    } catch (error) { }
}

export async function getCatastrophicIllnessType(setCatastrophicIllnessType: (e: any[]) => void) {
    try {
        const records = await pb.collection('CatastrophicIllnessType').getFullList({
            sort: '-created',
        });
        setCatastrophicIllnessType(records);
    } catch (error) { }
}

export async function getDisabilityType(setDisabilityType: (e: any[]) => void) {
    try {
        const records = await pb.collection('DisabilityType').getFullList({
            sort: '-created',
        });
        setDisabilityType(records);
    } catch (error) { }
}


export async function getEventType(setEventType: (e: any[]) => void) {
    try {
        const records = await pb.collection('EventType').getFullList({
            sort: '-created',
        });
        setEventType(records);
    } catch (error) { }
}

export async function getCertifiacteType(setCertifiacteType: (e: any[]) => void) {
    try {
        const records = await pb.collection('CertificateType').getFullList({
            sort: '-created',
        });
        setCertifiacteType(records);
    } catch (error) { }
}

export async function getEducationLevel(setEducationLevel: (e: any[]) => void) {
    try {
        const records = await pb.collection('EducationLevel').getFullList({
            sort: '-created',
        });
        setEducationLevel(records);
    } catch (error) { }
}

export async function getStudyDurationType(setStudyDurationType: (e: any[]) => void) {
    try {
        const records = await pb.collection('StudyDurationType').getFullList({
            sort: '-created',
        });
        setStudyDurationType(records);
    } catch (error) { }
}

export async function getEmploymentModality(setEmploymentModality: (e: any[]) => void) {
    try {
        const records = await pb.collection('EmploymentModality').getFullList({
            sort: '-created',
        });
        setEmploymentModality(records);
    } catch (error) { }
}

export async function getReasonJobExit(setReasonJobExit: (e: any[]) => void) {
    try {
        const records = await pb.collection('ReasonJobExit').getFullList({
            sort: '-created',
        });
        setReasonJobExit(records);
    } catch (error) { }
}

export async function getInstitutionType(setInstitutionType: (e: any[]) => void) {
    try {
        const records = await pb.collection('InstitutionType').getFullList({
            sort: '-created',
        });
        setInstitutionType(records);
    } catch (error) { }
}

export async function getResearchType(setResearchType: (e: any[]) => void) {
    try {
        const records = await pb.collection('ResearchType').getFullList({
            sort: '-created',
        });
        setResearchType(records);
    } catch (error) { }
}

export async function getParticipation(setParticipation: (e: any[]) => void) {
    try {
        const records = await pb.collection('Participation').getFullList({
            sort: '-created',
        });
        setParticipation(records);
    } catch (error) { }
}

export async function getPublicationStatus(setPublicationStatus: (e: any[]) => void) {
    try {
        const records = await pb.collection('PublicationStatus').getFullList({
            sort: '-created',
        });
        setPublicationStatus(records);
    } catch (error) { }
}

export async function getPeerReviewed(setPeerReviewed: (e: any[]) => void) {
    try {
        const records = await pb.collection('PeerReviewed').getFullList({
            sort: '-created',
        });
        setPeerReviewed(records);
    } catch (error) { }
}
