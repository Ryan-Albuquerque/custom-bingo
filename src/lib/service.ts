/* eslint-disable @typescript-eslint/no-explicit-any */
import getConfig from "next/config";

export const revalidate = 0;

export async function callBingoByCode(code: string) {
  try {
    const { serverRuntimeConfig } = getConfig();

    const response = await fetch(
      `${serverRuntimeConfig.URL}/api/bingo/${code}`,
      {
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: result?.message,
      };
    }

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      error: true,
      message: "Erro Interno, contate o administrador",
    };
  }
}
