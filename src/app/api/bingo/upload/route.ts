export const revalidate = 0;
export const dynamic = "force-dynamic";
import s3 from "@/lib/aws";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;
  const Bucket = formData.get("Bucket") as string;
  const Key = formData.get("Key") as string;
  const ContentType = formData.get("ContentType") as string;

  if (file && Bucket && Key && ContentType) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const params = {
      Bucket,
      Key,
      Body: buffer,
      ContentType,
    };

    const data = await s3.upload(params).promise();

    return new Response(JSON.stringify(data), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Invalid upload parameters" }), {
    status: 400,
  });
}
