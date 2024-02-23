export interface CardHome {
  title: string;
  icon: React.ReactNode;
  description: string;
  root: string;
}

export interface CardHomeProps {
  card: {
    title: string;
    icon: React.ReactNode;
    description: string;
    root: string;
  };
}

export interface Offer {
  title: string;
  specific_field: string;
  campus: string;
  rmu: string;
  date: string;
}

export interface OfferCardProps {
  offer: {
    title: string;
    specific_field: string;
    campus: string;
    rmu: string;
    date: string;
  };
  onClick?: () => void;
}

export type ValueType<T> = {
  label: string;
  value: any;
}[T extends { value: string } ? "value" : never];

export interface CheckBoxProps {
  name: string;
  options: string[];
  selectedOptions: string[] | string;
  defaultOption?: string;
  allowMultipleSelection: boolean;
  onChange ?: (name: string, selectedOption: string | string[]) => void;
}

export interface ComboBoxProps {
  name: string;
  title: string;
  defaultOption?: string;
  options: string[];
  onChange ? : (name: string, selectedOption: string) => void;
}

export interface ComboBoxGenericProps {
  name: string;
  title: string;
  defaultOption?: string;
  options: Option[];
  onChange ? : (name: string, selectedOption: Option) => void;
}

export type Option = {
  label: string, value: string
}
export interface DateProps {
  name: string;
  title: string;
  placeholder?: string;
  defaultValue?: string | Date;
  onChange ?: (name: string, selectedOption: Date) => void;
}

export interface InputProps {
  name: string;
  title: string;
  placeholder?: string;
  errorMessage?: string;
  helpMessage?: string;
  disabled?: boolean;
  autocomplete?: string;
  defaultValue?: string;
  showErrorIcon?: boolean;
  inputType?: string;
  validationFunction?: (value: string) => boolean;
  onChange?: (name: string, selectedOption: string) => void;
}
export interface InputPropsFile {
  name: string;
  title: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string;
  helpMessage?: string;
  disabled?: boolean;
  accept: string;
  autocomplete?: string;
  defaultValue?: string;
  showErrorIcon?: boolean;
  validationFunction?: (value: string) => boolean;
  onChange?: (name: string, selectedOption: File) => void;
}

export interface PasswordProps {
  name: string;
  title: string;
  helpMessage: string;
  errorMessage: string;
  validationFunction: (value: string) => boolean;
  onPasswordChange?: (name: string,  value: string) => void;
  onChange ?: (name: string, value: string) => void;
}

export interface TableProps {
  columns: string[];
  rows: string[][];
}

export interface SidebarProps {
  user: {
    avatar: string;
    name: string;
    email: string;
  };
}

export interface AboutCampusInfo {
  imageUrl: string;
  title: string;
  description: string;
}

export interface AboutCampusProps {
  info: {
    imageUrl: string;
    title: string;
    description: string;
  };
}

export interface CampusInfo {
  title: string;
  location: string;
  phone: string;
  email: string;
  website: string;
}

export interface InfoCampusProps {
  info: {
    title: string;
    location: string;
    phone: string;
    email: string;
    website: string;
  };
}

// Search Schedule
export interface SearchScheduleProps {
  schedule_period: string;
  schedule_announcement: string;
  schedule_campus: string;
}

//Image
export interface ImageInputProps {
  name: string;
  title: string;
  width: number;
  height: number;
  onChange ?: (file: File | null) => void;
  defaultValue ?: string | null;
}

//Offer
export type OfferView = {
  id: number;
  vacantes: number;
  horas: number;
  sedes: string;
  departamento: string;
  campoAmplio: string;
  campoEspecifico: string;
  tipoPersonalAcademico: string;
};

// Header table type
export type HeaderTable = {
  label?: string,
  value: string,
  type: "string" | "date",
}

export interface FileInputProps {
  onFileChange?: (file: File) => void;
  onViewClick?: () => void;
  onDeleteClick?: () => void;
}