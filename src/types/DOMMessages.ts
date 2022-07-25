export type DOMMessage = {
  type: "GET_DOM";
};

export type DOMMessageResponse = {
  messages: string[];
};

export interface Message {
  name: string;
  image: string;
  text: string;
}
