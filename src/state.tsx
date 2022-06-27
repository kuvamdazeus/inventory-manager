import { atom } from "recoil";
import { IUser } from "./types";

export const userAtom = atom<IUser | null>({
  key: "userAtom",
  default: null,
});
