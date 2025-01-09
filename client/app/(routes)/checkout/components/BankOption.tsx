import {Icon} from "@iconify/react"
export const BankOption = ({
    name,
    icon,
    setPaymentMethod,
    selected,
}: {
    name: string;
    icon: string;
    setPaymentMethod: (method: string) => void;
    selected: boolean;
}) => {
    const handleChange = () => {
        setPaymentMethod(name);
        console.log('Payment method changed:', name);
    };

    return (
        <div className="flex items-center justify-start gap-x-10 space-x-2">
            <input
                type="radio"
                name="payment-method"
                id={`payment-option-${name}`}
                checked={selected}
                onChange={handleChange}
            />
            <span>{name}</span>
            <label
                htmlFor={`payment-option-${name}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                <Icon icon={icon} width="16" height="16" />
            </label>
        </div>
    );
};