export interface ApplicationPeriod {
  applicationPeriod: string;
}

export interface Department {
  department: string;
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
