import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try{
    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    } 

    const user = await prismadb.user.findFirst({
      where:{
        id: params.userId
      },
    }) 

    return NextResponse.json(user);
  } catch(error){
    console.log('[USER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const { id,name, email, role } = body;

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }


    const audit = await prismadb.user.updateMany({
      where: {
        id: params.userId
      },
      data: {
        id,
        name,
        email,
        role
      }
    });
  
    return NextResponse.json(audit);
  } catch (error) {
    console.log('[USER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {

    const user = await prismadb.user.deleteMany({
        where:{
            id: params.userId
        }
    })
  
    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
