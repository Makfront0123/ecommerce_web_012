"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UseCart } from "@/hooks/useCart";
import { UseFavorite } from "@/hooks/useFavorite";
import DialogLoading from "@/components/DialogLoading";
import { Icon } from "@iconify/react";
import { DropdownUser } from "./DropdownUser";
import MenuMobile from "./MenuMobile";
import { navLinks } from "@/models/models";
import { useGlobalContext } from "@/context/globalContext";
import Link from "next/link";
import SearchProducts from "./SearchProducts";

const Header = () => {
    const { isAuthenticated } = useGlobalContext();
    const { items } = UseCart();
    const { itemsFavorite } = UseFavorite();
    const [loading, setLoading] = useState(false);

    const router = useRouter();



    const handleLinkClick = useCallback((href: string) => {
        setLoading(true);
        router.push(href);
    }, [router]);

    useEffect(() => {

        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [loading]);




    const filteredNavLinks = navLinks.filter(item => !(item.title === 'Sign Up' && isAuthenticated));

    return (
        <header className="flex flex-col text-sm w-full">
            <div className="py-2 w-full bg-black flex p-14 items-center">
                <span className="text-white gap-5 mx-auto p-3">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
                    <strong>ShopNow</strong>
                </span>
                <select className="bg-transparent text-white text-[15px] p-1">
                    <option value="fruit">English</option>
                </select>
            </div>

            <div className="py-5 flex md:flex-row md:gap-y-2 gap-y-5 flex-col items-center sm:justify-evenly justify-between lg:px-20 sm:px-6 px-10 text-black border-b-[1.5px] border-gray-400">
                <div>
                    <strong className="font-extrabold text-2xl">EXCLUSIVE</strong>
                </div>
                <div className="gap-x-12 mx-auto md:flex hidden">
                    {filteredNavLinks.map((item: any) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(item.href);
                            }}
                            className="font-medium cursor-pointer hover:opacity-30 duration-200 text-[15px]"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div className="md:hidden flex mt-2">
                    <MenuMobile />
                </div>
                <div className="flex items-center gap-x-8">
                    <SearchProducts/>
                    <Link
                        href={`${isAuthenticated ? "/wishlist" : "/login"}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(`${isAuthenticated ? "/wishlist" : "/login"}`);
                        }}
                        className="cursor-pointer relative"
                    >
                        <div className="absolute z-10 -top-2 -right-3 size-5 font-bold text-sm flex text-center items-center justify-center mx-auto bg-red-600 rounded-full text-white">
                            {itemsFavorite.length}
                        </div>
                        <Icon
                            icon="material-symbols:favorite-outline"
                            className="text-gray-500 hover:opacity-50 duration-200"
                            width="24"
                            height="24"
                        />
                    </Link>
                    <Link
                        href={`${isAuthenticated ? "/cart" : "/login"}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(`${isAuthenticated ? "/cart" : "/login"}`);
                        }}
                        className="cursor-pointer relative"
                    >
                        <div className="absolute z-10 -top-2 -right-3 size-5 font-bold text-sm flex text-center items-center justify-center mx-auto bg-red-600 rounded-full text-white">
                            {items.length}
                        </div>
                        <Icon
                            icon="material-symbols:garden-cart-outline-sharp"
                            className="text-gray-500 hover:opacity-50 duration-200"
                            width="24"
                            height="24"
                        />
                    </Link>
                    {isAuthenticated && <DropdownUser />}
                </div>
            </div>

            {loading && <DialogLoading />}
        </header>
    );
};

export default Header;
