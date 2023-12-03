"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { UserColumn, columns } from "./coulmns"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

interface UserClientProps{
    data: UserColumn[]
}

export const UserClient: React.FC<UserClientProps> = ({
    data
}) =>{

    const filters = [
        {
            label: "ID",
            value: "id"
        }, 
        {
            label: "Name",
            value: "name"
        },
        {
            label: "Email",
            value: "email"
        },
        {
            label: "Role",
            value: "role"
        },
    ]


    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Users (${data.length})` }
                    description="Manage users"
                /> 
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="id" filters={filters}/>
            <Separator />
        </>
    )
}