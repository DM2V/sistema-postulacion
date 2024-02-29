export type PostulationPeriod = {
  id: string;
  name: string;
};
export type Department = {
  id: string;
  name: string;
};
export type Site = {
  id: string;
  name: string;
};
export type ContractualType = {
  id: string;
  name: string;
};
export type AcademicStaff = {
  id: string;
  name: string;
};
export type WideField = {
  id: string;
  name: string;
};
export type SpecificField = {
  id: string;
  name: string;
};
export type Activity = {
  id: string;
  name: string;
};

export type Offer = {
  id: string
  period: string
  contractType: string
  wideField: string
  specificField: string
  site: string
  department: string
  academicStaff: string
  activity: string
  startDate: string
  endDate: string
  openings: number
  hours: number
  compensation: number
  created: string
  updated: string
  expand?: OfferExpanded
}

export type OfferExpanded ={
  period?: PostulationPeriod
  contractType?: ContractualType
  wideField?: WideField
  specificField?: SpecificField
  site?: Site
  department?: Department
  academicStaff?: AcademicStaff
  activity?: Activity
}