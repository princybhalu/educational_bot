export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  isVisible: boolean;
}
