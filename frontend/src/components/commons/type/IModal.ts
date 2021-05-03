export interface IModal {
  isOpen?: boolean;
  title?: string;
  bodyMessage?: string;
  isHasDecline?: boolean;
  isHasAccept?: boolean;
  callBackFunction?: (status: boolean) => void;
}
