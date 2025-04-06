// Define types for our application
export interface Fault {
  id: number;
  description: string;
  address: string;
  severity: string;
  name: string;
  contact: string;
  area: string;
  status: string;
  image: string | null;
}

export interface NewFault {
  description: string;
  address: string;
  severity: string;
  name: string;
  contact: string;
  area: string;
  status: string;
  image: string | null;
}

export type PageType = 'home' | 'report' | 'list' | 'confirmation';