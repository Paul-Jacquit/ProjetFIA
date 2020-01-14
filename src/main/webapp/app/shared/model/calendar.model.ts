export interface ICalendar {
  id?: number;
}

export class Calendar implements ICalendar {
  constructor(public id?: number) {}
}
