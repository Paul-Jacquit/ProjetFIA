export interface IMessage {
  id?: number;
  text?: string;
  user?: string;
  reply?: boolean;
  date?: Date;
  type?: string;
}

export class Message implements IMessage {
  constructor(
    public id?: number,
    public text?: string,
    public user?: string,
    public reply?: boolean,
    public date?: Date,
    public type?: string
  ) {}
}
