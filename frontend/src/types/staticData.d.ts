// Location
export type Country = {
    id: string;
    code: string;
    description: string;
};

export type Province = {
    id: string;
    province: string;
};

export type Canton = {
    id: string;
    canton: string;
    province?: string;
};

export type Parish = { 
    id: string;
    parish: string;
    canton?: string;
};


// Personal Data
export type IdentificationType = {
    id: string,
    name: string
}

export type Gender = {
    id: string
    name: string
}

export type BloodType = {
    id: string
    name: string
}

export type MaritalStatus = {
    id: string
    name: string
}

export type EthnicIdentification = {   
    id: string
    name: string
}

export type EthnicGroup = {
    id: string
    name: string
}


export type EmergencyRelationship = {
    id: string
    relationship: string
}


// Disability Disease
export type CatastrophicIllnessType = {
    id: string
    name: string
}

export type DisabilityType = {
    id: string
    name: string
}



// Training

export type EventType = {
    id: string
    name: string
}

export type CertifiacteType = {
    id: string
    name: string
}

// academicTraining
export type EducationLevel = {
    id: string
    name: string
}

export type StudyDurationType = {
    id: string
    name: string
}

// professionalExperience

export type EmploymentModality = {
    id: string
    name: string
}

export type ReasonJobExit = {
    id: string
    name: string
}

export type InstitutionType = {
    id: string
    name: string
}

// publications
export type ResearchType =
{
    id: string
    name: string
}
 
export type Participation = {
    id: string
    name: string
}

export type PublicationStatus = {
    id: string
    name: string
}

export type PeerReviewed = {
    id: string
    name: string
}
