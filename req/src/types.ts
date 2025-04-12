export type GenderType = "m" | "f";
export type UserType = {
  id?: string;
  email: string;
  type: string;
  plainPassword: string;
  password: string;
  phoneNumber: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  gender?: GenderType;
  bio?: string;
  registerNumber?: string;
  organizationType?: string;
  birthday?: string;
  address?: AddressType;
  images?: ImageType[];
  level?: number;
  xp?: number;
  state?: string;
  organization?: string;
};

export type OwnerType = {
  "@id": string;
  "@type": string;
  id: number;
  email: string;
  images: ImageType[];
  phoneNumber: string;
  type: string;
  username: string;
  organizationType: string;
};
export type ContactType = {
  email: string;
  phoneNumber: string;
};
export type EventType = {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  slug: string;
  title: string;
  type: string;
  description: string;
  shortDescription: string | null;
  state: string;
  isEnabled: boolean;
  isFeatured: boolean;
  contact: ContactType;
  maxPoint: number;
  volunteeringHours: null | number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  owner: OwnerType;
  images: ImageType[];
  address: AddressType;
  media: MediaType[];
  eventUsers: EventUserType[];
  roles: RoleType[];
  categories: CategoryType[];
  approvedAt: null;
};
export type EventUserType = {
  "@id": string;
  "@type": string;
  id: number;
  event: string;
  owner: OwnerType;
  state: "pending" | "accepted" | "denied";
  requestType: "invitation" | "request";
  userType: "volunteer";
};

export type ImageType = {
  "@type": string;
  "@id": string;
  id: number;
  path: string;
  type: "thumbnail" | "main";
};

export type AddressType = {
  "@id"?: string;
  "@type"?: string;
  id?: number;
  country: string;
  region: string;
  regionCode: null | string;
  countryCode: string;
  address: null | string;
};

export type RoleType = {
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  slots: number;
  accepted: null | string;
  event: string;
  eventUsers: EventUserType[];
};

export type ForgotPasswordType = {
  email: string;
  callbackUri: string;
  sendResetCodeAgain: boolean;
  resetCode: string;
};

export type ChangePasswordType = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export type CategoryType = {};

export type MediaType = {};

export type CertificateType = {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  slug: string;
  title: string;
  type: string;
  description: string;
  shortDescription: string | null;
  state: string;
  isEnabled: boolean;
  isFeatured: boolean;
  contact: ContactType;
  maxPoint: number;
  volunteeringHours: null | number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  owner: OwnerType;
  images: ImageType[];
  address: AddressType;
  media: MediaType[];
  eventUsers: EventUserType[];
  roles: RoleType[];
  categories: CategoryType[];
  approvedAt: null;
};
