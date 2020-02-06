export interface IContact {
  id?: number;
  nom?: string;
  mail?: string;
  telephone?: string;
  bureau?: string;
}

export class Contact implements IContact {
  constructor(public id?: number, public nom?: string, public mail?: string, public telephone?: string, public bureau?: string) {}
}
