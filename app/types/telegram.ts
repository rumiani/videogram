import { Context, SessionFlavor } from "grammy";

interface SessionData {
  step: string;
}
export type MyContext = Context & SessionFlavor<SessionData>;
