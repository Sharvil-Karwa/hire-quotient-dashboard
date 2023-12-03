import axios from "axios";
import { UserClient } from "./components/client";

const usersPage = async () => {

    const data = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <UserClient data={data.data}/>
            </div>
        </div>
    )
} 

export default usersPage;