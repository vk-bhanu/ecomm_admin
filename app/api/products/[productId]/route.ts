import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Set CORS headers with a fallback in case the environment variable is missing
const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ECOMMERCE_STORE_URL || "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404, headers: corsHeaders }
      );
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("[productId_GET]", err);
    return new NextResponse("Internal error", { status: 500, headers: corsHeaders });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401, headers: corsHeaders });
    }

    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404, headers: corsHeaders }
      );
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || price == null || expense == null) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );

    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );

    await Promise.all([
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        price,
        expense,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("[productId_POST]", err);
    return new NextResponse("Internal error", { status: 500, headers: corsHeaders });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401, headers: corsHeaders });
    }

    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404, headers: corsHeaders }
      );
    }

    await Product.findByIdAndDelete(product._id);

    await Promise.all(
      product.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("[productId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500, headers: corsHeaders });
  }
};

// Handle CORS preflight requests
export const OPTIONS = () => {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
};

export const dynamic = "force-dynamic";
