import { Department, PostulationPeriod, Site } from "./offers";

export interface ApplicationPeriod {
  applicationPeriod: string;
}

export interface TypeOfHiring {
  typeOfHiring: string;
}

export interface TypeOfAcademicStaff {
  typeOfAcademicStaff: string;
  description: string;
}

export interface Activity {
  activity: string;
  description: string | null;
}

export interface Item {
  description: string;
  academicStaff: TypeOfAcademicStaff[];
}

export interface Requirement {
  description: string;
  items: Item[];
}

export interface TitleOfExperience {
  description: string;
  detail: string;
  minScore: number;
  maxScore: number;
  observation: string;
  requirement: Requirement[];
}

export interface WideField {
  wideField: string;
  description: string;
}

export interface SpecificField {
  specificField: string;
  wideField: WideField[];
  description: string;
}

export interface Remuneration {
  rmu: number;
}


export type CalendarPhase ={
  id: string
  activity: string
  start: string
  end: string
}

export type Call = {
  id: string
  period: string
  department: string
  site: string
  calendarPhases: string[]
  offers: string[]
  rules: string
  created: string
  updated: string
  expand?: CallExpanded
}

export type CallExpanded = {
  period?: PostulationPeriod
  department?: Department
  site?: Site
  calendarPhases?: CalendarPhase[]
  offers?: Offer[]
}