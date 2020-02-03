export interface IInformation {
  id?: number;
  titre?: string;
  description?: string;
}

export class Information implements IInformation {
  constructor(public id?: number, public titre?: string, public description?: string) {}
}
