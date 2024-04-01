import { validateNotEmpty } from "@/utils/validations";
import { validateNumbersOnly } from "@/utils/validations";
import { PersonalData, EmergencyContact } from "@/types/cv";
import { is } from "date-fns/locale";



export const validatePersonalDataForm = (formData: PersonalData) => {
    const {
        avatar,
        name,
        lastName1,
        lastName2,
        birthDate,
        gender,
        bloodType,
        maritalStatus,
        nationality,
        residenceYears,
        ethnicIdentification,
        ethnicGroup,
        specialCapacity,
        catastrophicDisease,
        catastrophicDiseaseType,
        disabilityType,
        disabilityPercentage,
        MSPIDNumber
    } = formData;

    const isNameValid = validateNotEmpty(name);
    const isLastName1Valid = validateNotEmpty(lastName1);
    const isLastName2Valid = validateNotEmpty(lastName2);
    const isBirthDateValid = validateNotEmpty(birthDate);
    const isGenderValid = validateNotEmpty(gender);
    const isBloodTypeValid = validateNotEmpty(bloodType);
    const isMaritalStatusValid = validateNotEmpty(maritalStatus);
    const isNationalityValid = validateNotEmpty(nationality);
    const isResidenceYearsValid = validateNotEmpty(residenceYears);
    const isEthnicIdentificationValid = validateNotEmpty(ethnicIdentification);
    const isEthnicGroupValid = validateNotEmpty(ethnicGroup);
    const isSpecialCapacityValid = validateNotEmpty(specialCapacity);
    const isCatastrophicDiseaseValid = validateNotEmpty(catastrophicDisease);
    const isCatastrophicDiseaseTypeValid = validateNotEmpty(catastrophicDiseaseType);
    const isDisabilityTypeValid = validateNotEmpty(disabilityType);
    const isDisabilityPercentageValid = validateNumbersOnly(disabilityPercentage);
    const isMSPIDNumberValid = validateNumbersOnly(MSPIDNumber);
    
    return isNameValid && isLastName1Valid && isLastName2Valid && isBirthDateValid && isGenderValid && isBloodTypeValid && isMaritalStatusValid && isNationalityValid && isResidenceYearsValid && isEthnicIdentificationValid && isEthnicGroupValid && isSpecialCapacityValid && isCatastrophicDiseaseValid && isCatastrophicDiseaseTypeValid && isDisabilityTypeValid && isDisabilityPercentageValid;
}

export const validateEmergencyContactForm = (formData: EmergencyContact) => {
    const { name, lastName1, lastName2, identification, relationship } = formData;

    const isNameValid = validateNotEmpty(name);
    const isLastName1Valid = validateNotEmpty(lastName1);
    const isLastName2Valid = validateNotEmpty(lastName2);
    const isIdentificationValid = validateNumbersOnly(identification);
    const isRelationshipValid = validateNotEmpty(relationship);

    return isNameValid && isLastName1Valid && isLastName2Valid && isIdentificationValid && isRelationshipValid;
};