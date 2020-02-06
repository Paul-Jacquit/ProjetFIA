export interface IContactEtInformation {
  id?: number;
}

export class ContactEtInformation implements IContactEtInformation {
  constructor(public id?: number) {}
}
