import HomeInsertCode from "@/components/home-insert-code";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { code, error } = await searchParams;

  return (
    <div>
      <div className="flex justify-center p-8 min-h-96 items-center">
        <div className="flex flex-col gap-5 w-[40%] max-sm:w-3/4">
          {error && (
            <div className="w-full bg-destructive border-red-500 rounded-lg p-2">
              <p>Error {error}</p>
            </div>
          )}
          {code && (
            <div className="w-full bg-green flex flex-col gap-3 border-red-500 rounded-lg p-2 text-center">
              <h2 className="text-white font-bold">
                Para acessar o bingo quando quiser, copie o link abaixo:
              </h2>
              <h3 className="text-white underline">{`${process.env.NEXT_PUBLIC_URL}/?code=${code}`}</h3>
            </div>
          )}
          <HomeInsertCode code={code as string} />
          <span className="text-center">ou</span>
          <Link href="/create" legacyBehavior>
            <Button variant="blue" className="cursor-pointer">
              Criar bingo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
