import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/products";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params
    const { newName: name, newPrice: price, newBrand: brand } = await request.json()
    await connectMongoDB()
    await Product.findByIdAndUpdate(id, { name, price, brand })
    return NextResponse.json({massage:"Product Updated"},{ status:200})
}

export async function GET(request, { params }) {
    const { id } = params
    await connectMongoDB()
    const product = await Product.findOne({ _id: id })
    return NextResponse.json({product},{status:200})
}