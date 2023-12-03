import prismadb from "@/lib/prismadb";
import axios from "axios";
import {NextResponse} from "next/server";

export async function POST(
    req: Request,
) {
    try{
        const body = await req.json(); 
        const {name, id, email, role} = body;

        if(!name){ 
            return new NextResponse("Name is required", {status:400});
        } 
        if(!id){ 
            return new NextResponse("Id is required", {status:400});
        } 
        if(!email){ 
            return new NextResponse("Email is required", {status:400});
        } 
        if(!role){ 
            return new NextResponse("Role is required", {status:400});
        } 

        const user = await prismadb.user.findFirst({
            where:{
                id
            }
        }) 

        if(user){
            return new NextResponse("User already exists", {status:400});
        }

        const newUser = await prismadb.user.create({
            data:{
                id,
                name,
                email,
                role
            }
        })

        return NextResponse.json(newUser);
    } catch (error){
        console.log('[USERS_POST]', error);
        return new NextResponse ("Internal error", {status:500});
    }
} 


export async function GET(req: Request) {
  try {

    

    const users = await prismadb.user.findMany();


    return NextResponse.json(users);
  } catch (error) {
    console.log('[USERS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
