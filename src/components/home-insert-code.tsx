"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

interface HomeInsertCodeProps {
  code?: string;
}

export default function HomeInsertCode({ code }: HomeInsertCodeProps) {
  const [newCode, setCode] = useState(code || "");
  return (
    <>
      <Input
        id="code"
        placeholder="Digite o código do bingo"
        onChange={(e) => setCode(e.target.value)}
        value={newCode}
        disabled={!!code}
      />
      {newCode && (
        <div className="flex gap-2">
          <Link href={`/edit/${newCode}`} legacyBehavior>
            <Button className="cursor-pointer w-1/2 " variant="secondary">
              Editar
            </Button>
          </Link>
          <Link href={`/start/${newCode}`} legacyBehavior>
            <Button className="cursor-pointer w-1/2" variant="success">
              Começar o bingo
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
