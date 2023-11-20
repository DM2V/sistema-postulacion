export interface personalData {
  name: string;
  lastName1: string;
  lastName2: string;
  birthDate: string;
  gender: string;
  bloodType: string;
  maritalStatus: string;
  nationality: string;
  residenceYears: string;
  ethnicIdentification: string;
  ethnicGroup: string;
  specialCapacity: string;
  catastrophicDisease: string;
  catastrophicDiseaseType: string;
  disabilityType: string;
  disabilityPercentage: string;
  MSPIDNumber: string;
}

export interface PersonalInformation {
  province: "";
  canton: "";
  parish: "";
  mainStreet: "";
  secondaryStreet: "";
  reference: "";
  number: "";
  homePhone: "";
  cellPhone: "";
  workPhone: "";
  extencion: "";
}

export interface emergencyContact {
  name: string;
  lastName1: string;
  lastName2: string;
  typeIdentification: string;
  identification: string;
  relationship: string;
  province: string;
  canton: string;
  parish: string;
  mainStreet: string;
  secondaryStreet: string;
  reference: string;
  number: string;
  homePhone: string;
  cellPhone: string;
}
