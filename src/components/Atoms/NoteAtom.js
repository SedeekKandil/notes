import { atom } from "recoil";

export const noteState = atom({
    key: 'noteState', // unique ID (with respect to other atoms/selectors)
    default:0, // default value (aka initial value)
  });