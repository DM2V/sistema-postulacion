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
