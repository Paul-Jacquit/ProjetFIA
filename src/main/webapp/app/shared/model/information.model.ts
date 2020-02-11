export interface IInformation {
  id?: number;
  titre?: string;
  description?: string;
  channel?: string;
}

export class Information implements IInformation {
  constructor(public id?: number, public titre?: string, public description?: string, public channel?: string) {}
}
