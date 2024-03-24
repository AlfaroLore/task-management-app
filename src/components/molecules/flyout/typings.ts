export interface FlyoutProps {
  isOpen: boolean;
  children: JSX.Element;
  onClose: () => void;
}
