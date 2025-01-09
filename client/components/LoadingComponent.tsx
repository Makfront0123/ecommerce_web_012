"use client";

import { useEffect, useState } from "react";
import DialogLoading from "@/components/DialogLoading";

const LoadingComponent = () => {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            {loading && <DialogLoading />}
        </>
    );
};

export default LoadingComponent;
