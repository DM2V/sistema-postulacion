export interface CV {
  personalData: PersonalData;
  HomeAddress: HomeAddress;
  emergencyContact: EmergencyContact;
  academicTraining: AcademicTraining[];
  languages: Language[];
  publications: Publications[];
  trainings: Training[];
  professionalExperience: ProfessionalExperience[];
  extraPoints: ExtraPoints;
  postulacionDocument: postulacionDocument;

}

export interface PersonalData {
  name: string;
  lastName1: string;
  lastName2: string;
  birthDate: string;
  gender: string;
  bloodType: string;
  maritalStatus: string;
  nationality: string;
  residenceYears?: string;
  ethnicIdentification: string;
  ethnicGroup: string;
  specialCapacity: string;
  catastrophicDisease: string;
  catastrophicDiseaseType?: string;
  disabilityType?: string;
  disabilityPercentage?: string;
  MSPIDNumber?: string;
  avatar: File | null; // base64
}

export interface HomeAddress {
  province: string;
  canton: string;
  parish: string;
  mainStreet: string;
  secondaryStreet: string;
  reference: string;
  number: string;
  homePhone: string;
  cellPhone: string;
  workPhone: string;
  extencion: string;
}

export interface EmergencyContact {
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

export interface AcademicTraining {
  educationLevel: string;
  institution: string;
  degree: string;
  studyDuration: string;
  studyDurationType: string;
  Country: string;
  SenescytRegistrationNumber: string;
  graduationDate: string;
  certificate : File | null; // base64
}

export interface Language {
  language: string;
  europeanFrameworkLevel: string;
  certificationDate: string;
  certificate: File | null; // base64
}

export interface Publications {
  researchType: string;
  fullTitle: string;
  publisher: string;
  issnIsbnDoi: string;
  participation: string;
  language: string;
  publicationStatus: string;
  publicationDate: string;
  volumeNumber: string;
  peerReviewed: string;
  additionalDocuments: File | null; // base64
}

export interface Training{
  eventType: string;
  eventTheme: string;
  institutionName: string;
  country: string;
  province: string;
  startDate: string;
  endDate: string;
  hoursCount: string;
  certificateType: string;
  additionalDocuments: File | null; // base64
}

export interface ProfessionalExperience {
  institutionName: string;
  position: string;
  administrativeUnit: string;
  institutionType: string;
  employmentModality: string;
  reasonJobExit: string;
  country: string;
  province: string;
  startDate: string;
  endDate: string;
  employmentCertificates: File | null; // base64
}

export interface ExtraPoints{
  professionalExperienceEspe: File | null; // base64
  nationalInternationalAwards: File | null; // base64
  professionalAcademicRecognition: File | null; // base64
  twonsNationalities: File | null; // base64
  disability: File | null; // base64
  warHeroes: File | null; // base64
  vulnerableSituations: File | null; // base64
}

export interface PostulacionDocument{
  offerId: string;
  resume: string;
  idCopy: string;
  votingCert: string;
  degreeCert: string;
  mecanizadoIess: string;
  noImpedimentCert: string;
  noAdminResponsibilityCert: string;
}