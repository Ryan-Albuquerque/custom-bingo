"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";

interface Bingo {
  image: string | null;
  items: Set<string>;
  code: string;
}

const bucketName = process.env.NEXT_PUBLIC_BUCKETNAME as string;

export default function EditBingo({ bingo }: { bingo: Bingo }) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(bingo.image);
  const [items, setItems] = useState<Set<string>>(bingo.items);
  const [inputValue, setInputValue] = useState<string>("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert("imagem sendo carregada, aguarde para atualizar o bingo");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("Bucket", bucketName); // Substitua pelo nome do bucket
      formData.append("Key", `upload/${file.name}`); // Caminho e nome do arquivo no S3
      formData.append("ContentType", file.type);
      try {
        const uploadFileRequest = await fetch("/api/bingo/upload", {
          method: "POST",
          body: formData,
          cache: "no-store",
        });
        const data = await uploadFileRequest.json();
        setImage(data.Location);
      } catch (error) {
        setImage(null);

        alert(`Erro no upload para o S3: ${error}`);
      }
    }
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems(new Set(items).add(inputValue.trim()));
      setInputValue("");
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Submitted", { image, items: Array.from(items) });
    const validate = Array.from(items).every((item) => item.trim().length > 0);
    if (!validate) {
      alert("Palavras não podem ser vazias");
      return;
    }
    const updateBingo = async () => {
      try {
        const response = await fetch("/api/bingo/update/" + bingo.code, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image,
            items: Array.from(items),
          }),
        });
        const data = await response.json();
        alert("Bingo atualizado com sucesso");
        // Redirect to home with code
        window.location.href = `/?code=${data.code}`;
      } catch (error) {
        alert("Error:" + error);
        // Handle error logic here
      }
    };

    updateBingo();
  };

  return (
    <div className="w-full flex items-center flex-col gap-5 mt-30">
      <div className="flex flex-row max-sm:flex-col w-3/4 gap-16  ">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">
              1. Escolha as palavras
            </AccordionTrigger>
            <AccordionContent>
              <div className="w-full flex flex-col items-center">
                <div className="overflow-scroll max-sm:w-full flex flex-col gap-5 w-3/4 ">
                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full my-3 bg-purple-500 text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 border border-purple-500">
                        Importar com IA
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Adicione suas palavras</DialogTitle>
                        <DialogDescription>
                          Insira qualquer coisa desde que se pareça com uma
                          lista de palavras
                        </DialogDescription>
                      </DialogHeader>
                      <div className="">
                        <div className="">
                          <textarea
                            id="name"
                            placeholder="Insira suas palavras aqui"
                            className="w-full h-32 border-2 border-gray-300 rounded-md p-1"
                            onChange={(e) => setInputList(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={addByAI}
                          variant={"success"}
                        >
                          Gerar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <h2 className="text-center">OU</h2> */}
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") handleAddItem();
                      }}
                      placeholder="Adicione uma palavra"
                      className="w-3/4 p-2 rounded-lg"
                    />
                    <Button
                      onClick={handleAddItem}
                      className="w-1/4"
                      variant={"blue"}
                    >
                      Adicionar
                    </Button>
                  </div>
                  <ol className="mt-4 h-52 overflow-scroll">
                    {Array.from(items).map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center my-1"
                      >
                        <span className="flex gap-2 items-center">
                          {index + 1}.{" "}
                          <Input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newItems = new Set(items);
                              newItems.delete(item);
                              newItems.add(e.target.value);
                              setItems(newItems);
                            }}
                          ></Input>
                        </span>
                        <Label
                          onClick={() => {
                            const newItems = new Set(items);
                            newItems.delete(item);
                            setItems(newItems);
                          }}
                          className="text-red-500 pr-5"
                        >
                          X
                        </Label>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">
              2. Imagem de fundo(Opcional)
            </AccordionTrigger>
            <AccordionContent>
              <div className="w-full flex flex-col items-center">
                <div className="w-1/2 max-sm:w-full">
                  <div>
                    <label htmlFor="imageInput">Upload da imagem:</label>
                    <Input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {image && (
                      <Image
                        src={image as string}
                        alt="Preview"
                        width={400}
                        height={400}
                      />
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Button
        onClick={handleSubmit}
        variant={"success"}
        className="max-sm:w-3/4 w-1/4"
        disabled={items.size === 0}
      >
        Atualizar
      </Button>
    </div>
  );
}
