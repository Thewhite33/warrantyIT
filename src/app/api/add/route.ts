import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        let user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: body.email
                }
            })
        }
        const product = await prisma.product.create({
            data: {
                productName: body.productName,
                skuid: body.skuid,
                brandName: body.brandName,
                warranty: body.warranty,
                type: body.type,
                purchasedate:body.purchasedate,
                userId: user.id
            }
        })

        return NextResponse.json({ message: "Product saved successfully", product });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}


export async function GET(){
    try {
        const product = await prisma.product.findMany({
            include:{
                user:true
            },
            orderBy:{
                purchasedate:'desc'
            }
        })
        return NextResponse.json({ product });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}