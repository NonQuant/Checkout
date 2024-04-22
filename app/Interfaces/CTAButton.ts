
type ButtonType = "primary" | "secondary";

interface CTAButtonProps {
    title: string;
    variant: ButtonType;
    onPress: () => void;
    disabled?: boolean;
  }

export default CTAButtonProps;