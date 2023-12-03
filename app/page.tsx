import axios from "axios";
import { UserClient } from "./components/client";
import prismadb from "@/lib/prismadb";

const usersPage = async () => {

    const data = await prismadb.user.findMany();

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <UserClient data={data}/>
            </div>
        </div>
    )
} 

export default usersPage;