export interface OptionsMenuProps {
  menuButton: JSX.Element | string;
  options: { name: string; icon: JSX.Element }[];
  onClick: (option: string) => void;
}
