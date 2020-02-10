export interface IMessage {
  text?: string;
  user?: string;
  reply?: boolean;
  date?: Date;
  channel?: string;
}

export class Message implements IMessage {
  constructor(public text?: string, public user?: string, public date?: Date, public channel?: string) {}
}
