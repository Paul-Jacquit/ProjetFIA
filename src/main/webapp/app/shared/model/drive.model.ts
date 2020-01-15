export interface IDrive {
  id?: number;
}

export class Drive implements IDrive {
  constructor(public id?: number) {}
}
