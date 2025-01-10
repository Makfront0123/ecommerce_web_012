'use client';
import { navLinksMobile } from '@/models/models';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import React, { useState } from 'react';

function MenuMobile() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleMenu}>
                {
                    isOpen ? 
                        <Icon icon="material-symbols-light:add-box-outline" width="24" height="24" /> :
                        <Icon icon="material-symbols:menu" width="24" height="24" />
                }
            </button>

            {isOpen && (
                <nav className="fixed animate-slide-in-left after:animate-slide-in-right top-0 left-0 min-w-[35vh] z-40 h-full bg-[#f7f7f7] shadow-md p-10 flex flex-col gap-y-6">
                    {navLinksMobile.map((item:{id:number,title:string,href:string}) => (
                        <Link key={item.id} href={item.href}>
                            <span className="font-medium cursor-pointer hover:opacity-30 duration-200 text-[15px]">
                                {item.title}
                            </span>
                        </Link>
                    ))}
                    <button className="absolute top-5 right-[12%] text-black rounded-full" onClick={toggleMenu}>
                        <Icon icon="oi:x" width="20" height="20" />
                    </button>
                </nav>
            )}
        </div>
    );
}

export default MenuMobile;
