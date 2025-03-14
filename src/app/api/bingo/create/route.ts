/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectToDataBase } from "@/lib/db/db";
import Bingo from "@/lib/db/models/bingo";
import { NextRequest } from "next/server";

export async function POST(request: Request | NextRequest) {
  try {
    await connectToDataBase();

    const { items, image } = await request.json();

    const bingo = await Bingo.create({
      items,
      image,
    });

    await bingo.save();
    return new Response(JSON.stringify(bingo), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log(error?.message);

    return new Response("Erro ao criar", { status: 500 });
  }
}
