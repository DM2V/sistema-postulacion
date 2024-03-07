export interface PersonalData {
  id?: string;
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
  avatar?: File | null; // base64
}


export interface HomeAddress {
  id?: string;
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
  id?: string;
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
  id?: string;
  educationLevel: string;
  institution: string;
  degree: string;
  studyDuration: string;
  studyDurationType: string;
  country: string;
  senescytRegistrationNumber: string;
  senescytRegistrationDate: string;
  graduationDate: string;
  certificate : File | null; // base64
}

export interface Language {
  id?: string;
  language: string;
  europeanFrameworkLevel: string;
  certificationDate: string;
  certificate: File | null; // base64
}

export interface Publications {
  id?: string;
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
  id?: string;
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
  id?: string;
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

export interface ExtraPoints {
  id?: string;
  professionalExperienceEspe: string; // base64
  fileProfessionalExperienceEspe?: File | null;
  fileNationalInternationalAwards?: File | null; // base64
  fileProfessionalAcademicRecognition?: File | null; // base64
  twonsNationalities: string;
  fileTwonsNationalities?: File | null; // base64
  disability: string;
  fileDisability?: File | null; // base64
  warHeroes: string;
  filewarHeroes?: File | null; // base64
  vulnerableSituations: string; // base64
  fileVulnerableSituations?: File | null;
  genderWomen: string
}

export interface PostulacionDocument{
  id?: string;
  offerId: string;
  resume: string;
  idCopy: string;
  votingCert: string;
  degreeCert: string;
  mecanizadoIess: string;
  noImpedimentCert: string;
  noAdminResponsibilityCert: string;
}

export type CV = {
  id?: string;
  personalData: string;
  homeAddress: string;
  emergencyContact: string;
  academicTraining: string[];
  languages: string[];
  publications: string[];
  trainings: string[];
  professionalExperience: string[];
  extraPoints: string;
  postulacionDocument: string;
  expand?: CvExpandend;
}


export type CvExpandend = {
  id?: string;
  personalData?: PersonalData;
  homeAddress?: HomeAddress;
  emergencyContact?: EmergencyContact;
  academicTraining?: AcademicTraining[];
  languages?: Language[];
  publications?: Publications[];
  trainings?: Training[];
  professionalExperience?: ProfessionalExperience[];
  extraPoints?: ExtraPoints;
  postulacionDocument?: PostulacionDocument;
}