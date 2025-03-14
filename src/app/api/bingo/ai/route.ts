export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API_KEY is missing" }), {
        status: 500,
      });
    }

    const { list } = await req.json();

    const fixedPrompt = `
    Extraia os itens desta lista, independente do formato, e retorne apenas um array JSON de strings, sem duplicatas:
    Lista recebida: ${JSON.stringify(list)}
    
    Regras:
    - A lista pode estar numerada (1., 2., 3. ou I., II., III.).
    - Pode estar separada por vírgulas, ponto e vírgula, quebras de linha ou qualquer outro separador.
    - Pode conter palavras repetidas, que devem ser removidas.
    - Retorne APENAS um JSON válido contendo um array de strings, sem explicações adicionais.

    Exemplo de resposta esperada:
    ["Item 1", "Item 2", "Item 3"]
    `;

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        prompt: fixedPrompt,
        max_tokens: 150,
        temperature: 0,
      }),
    });

    const data = await response.json();
    const cleanedList = JSON.parse(data.choices?.[0]?.text || "[]");

    return new Response(JSON.stringify(cleanedList), { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: errorMessage }),
      { status: 500 }
    );
  }
}
