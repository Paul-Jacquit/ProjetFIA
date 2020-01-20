export interface IMessage {
  text?: string;
  user?: string;
  reply?: boolean;
  date?: Date;
  type?: string;
}

export class Message implements IMessage {
  constructor(public text?: string, public user?: string, public reply?: boolean, public date?: Date, public type?: string) {}
}
