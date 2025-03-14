import EditBingo from "@/components/edit-bingo";
import { callBingoByCode } from "@/lib/service";
import { redirect } from "next/navigation";

export default async function Edit({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  let bingo;

  try {
    const response = await callBingoByCode(code);

    if (response.error) {
      throw response.message;
    }
    bingo = response;
  } catch (error) {
    console.error("Failed to fetch bingo data:", error);
    bingo = { items: [] }; // Default value in case of error
  }

  if (bingo.items.length === 0) {
    redirect("/?error=bingo não encontrado");
  }

  return <EditBingo bingo={bingo} />;
}
