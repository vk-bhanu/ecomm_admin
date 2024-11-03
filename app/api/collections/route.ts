import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const { title, description, image } = await req.json()
    console.log("Received data:", { title, description, image });

    const existingCollection = await Collection.findOne({ title })

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 })
    }

    if (!title || !description || !image) {
      // const { title, description, image } = await req.json();
      console.log("Received data:", { title, description, image });
      return new NextResponse("Title, description, and image are required", { status: 400 })
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    })

    // await newCollection.save()

    return NextResponse.json(newCollection, { status: 200 })
  } catch (err) {
    console.error("[collections_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const collections = await Collection.find().sort({ createdAt: "desc" })

    return NextResponse.json(collections, { status: 200 })
  } catch (err) {
    console.log("[collections_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";