"use client"

import * as React from "react"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Icon } from '@iconify/react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useGlobalContext } from "@/context/globalContext"



export function DropdownUser() {
    const { userProfile, logout, } = useGlobalContext();
    const { name, _id } = userProfile || ''
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <Image src="/useAvatar.webp" width={24} height={24} alt="user" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 flex flex-col gap-y-2">
                <DropdownMenuLabel>{`HOLA ${name}!`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-y-4">
                    <DropdownMenuItem
                        onClick={async () => {
                            await logout()
                        }}
                    >
                        <div className="flex items-center gap-x-4 cursor-pointer hover:opacity-50 duration-200">
                            <Icon icon="material-symbols:logout" width="24" height="24" />
                            <span>Logout</span>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={async () => {
                            router.push(`/profile/${_id}`)
                        }}
                    >
                        <div className="flex items-center gap-x-4 cursor-pointer hover:opacity-50 duration-200">
                            <Icon icon="bx:edit" width="24" height="24" />
                            <span>Edit Profile</span>
                        </div>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
