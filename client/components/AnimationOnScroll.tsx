import React, { useEffect, useRef, useState } from "react";

type Props = {
    children: React.ReactNode;
    animationClass?: string;
    animateClass?: string;
    threshold?: number;
};

const AnimateOnScroll = ({
    children,
    animationClass = "opacity-0 translate-y-10",
    animateClass = "animate-slide-in-left",
    threshold = 0.5,
}: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        const element = elementRef.current;
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={`${animationClass} ${isVisible ? animateClass : ""} transition-all duration-400 ease-out`}
        >
            {children}
        </div>
    );
};

export default AnimateOnScroll;
