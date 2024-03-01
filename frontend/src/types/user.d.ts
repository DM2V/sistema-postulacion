import { PostulationPeriod } from './convocatoria';
import { Language, ProfessionalExperience, Publications, Training } from './cv';
import { Offer } from './offer';
import { PhaseStatus } from './phaseStatus';

export type User = {
  id: string;
  period?: string;
  identificationNumber: string;
  name?: string;
  lastName?: string;
  password?: string;
  email: string;
  avatar?: Image;
  role: "candidate" | "evaluator" | "admin_hr";
  cv?: CV[];
  phaseStatus?: string;
  offer?: string;
  expand?: Expandend;
};

export interface UserEvaluator {
  id: string;
  identificationNumber: string;
  name?: string;
  lastname?: string;
  password?: string;
  role: string;
}

export type Expandend = {
  cv?: CV.expand.id;
  period: PostulationPeriod;
  academicTraining: AcademicTraining[];
  languages: Language[];
  publications: Publications[];
  trainings: Training[];
  professionalExperience: ProfessionalExperience[];
  phaseStatus: PhaseStatus;
  offer: Offer[];
}
