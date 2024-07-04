import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/products";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, price, brand } = await request.json()
    await connectMongoDB()
    await Product.create({ name, price, brand })
    return NextResponse.json({massage:"Product created"}, {status:201})
}

export async function GET() {
  try {
    await connectMongoDB();
    const products = await Product.find();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB()
    await Product.findByIdAndDelete(id)
    return NextResponse.json({message:"Product deleted"},{status:200})
}