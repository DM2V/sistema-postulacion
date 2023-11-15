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
