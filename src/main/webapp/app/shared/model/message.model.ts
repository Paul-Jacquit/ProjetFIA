export interface IMessage {
  text?: string;
  user?: string;
  reply?: boolean;
  date?: Date;
}

export class Message implements IMessage {
  constructor(public text?: string, public user?: string, public date?: Date) {}
}
