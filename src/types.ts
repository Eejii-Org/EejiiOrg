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
