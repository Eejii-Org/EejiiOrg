export type GenderType = "m" | "f";
export type UserType = {
  email: string;
  plainPassword: string;
  phoneNumber: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: GenderType;
  bio: string;
  registerNumber: string;
  birthday: string;
  address: {
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    address: string;
  };
};
export type EventType = {
  "@id": string;
  "@type": string;
  id: number;
  slug: string;
  title: string;
  type: string;
  description: string;
  shortDescription: string;
  state: string;
  isEnabled: boolean;
  isFeatured: boolean;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: null | string;
  owner: string;
  images: [
    {
      "@type": "EventImage";
      "@id": "/api/.well-known/genid/8b0c1febab531373a63b";
      id: 37;
      path: "4c/da/b6b2348d8c09ef7d91cb6ce31365.png";
      type: "hero";
    },
    {
      "@type": "EventImage";
      "@id": "/api/.well-known/genid/34c21806b50514f5a7bd";
      id: 38;
      path: "3a/47/fbc30d1e4757117b2638a427a317.png";
      type: "main";
    }
  ];
  approvedAt: null;
};

export type ImageType = {
  "@type": string;
  "@id": string;
  id: number;
  path: string;
  type: "hero" | "main";
};
