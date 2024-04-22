interface FormInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    variant: "password" | "text" | "phone" | "email";
};

export default FormInputProps;