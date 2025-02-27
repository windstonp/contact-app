export interface IContactDto {
  name: string;
  email: string;
  phone: string;
}

export interface IContactDataObject extends IContactDto {
  id: number;
}
