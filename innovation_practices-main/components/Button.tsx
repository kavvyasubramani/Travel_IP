import { useEffect, useState } from "react";
import Image from "next/image";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    variant: string;
};

const Button = ({ type, title, icon, variant }: ButtonProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <button 
            className={`flexCenter gap-2 px-4 py-2 text-base font-medium rounded-full transition-all duration-300 ${variant}`}
        >
            {icon && (
                <Image
                    src={icon}
                    alt={title}
                    width={20}  // Adjusted icon size
                    height={20}
                    className={isClient ? "filter invert" : ""}
                />
            )}
            <label className="whitespace-nowrap cursor-pointer">{title}</label>
        </button>
    );
};

export default Button;
