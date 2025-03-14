import { connectToDataBase } from "@/lib/db/db";
import Bingo from "@/lib/db/models/bingo";

export async function GET(
  req: Request,
  param: Promise<{ params: { code: string } }>
) {
  try {
    await connectToDataBase();

    const { params } = await param;
    const { code } = await params;
    const bingo = await Bingo.findOne({ code });

    if (!bingo) {
      return new Response(
        JSON.stringify({ message: "Bingo não encontrado", ok: false }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(bingo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknown error", error);
    }

    return new Response(
      JSON.stringify({ message: "Bingo não encontrado", ok: false }),
      { status: 500 }
    );
  }
}
