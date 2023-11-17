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

export interface CheckBoxProps {
  name: string;
  options: string[];
  selectedOptions: string[];
  allowMultipleSelection: boolean;
  onChange: (selectedOptiones: string[]) => void;
}

export interface ComboBoxProps {
  name: string;
  title: string;
  defaultOption: string;
  options: string[];
  onChange: (selectedOption: string) => void;
}

export interface DateProps {
  name: string;
  title: string;
  onChange: (date: Date) => void;
}

export interface InputProps {
  name: string;
  title: string;
  placeholder: string;
  errorMessage: string;
  helpMessage: string;  
  disabled: boolean;
  autocomplete: string;
  validationFunction: (value: string) => boolean;
  onChange: (value: string) => void;
}


export interface PasswordProps {
 name: string;
 title: string;
 helpMessage: string;
 errorMessage: string;
 validationFunction: (value: string) => boolean;
 onPasswordChange: (value: string) => void;
 onChange: (value: string) => void; 
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
