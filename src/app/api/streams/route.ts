import { prismaClient } from "@/app/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";
const YT_URL_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})/;

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await CreateStreamSchema.parseAsync(await req.json());

    const isYT = YT_URL_REGEX.test(data.url);
    if (!isYT) {
      return new Response("Invalid YouTube URL", { status: 400 });
    }

    const extractedId = data.url.split("v=")[1]?.split("&")[0];

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
      },
    });
  } catch (error) {
    console.error("Error creating stream:", error);
    return new Response("Error while adding a stream", { status: 411 });
  }
}
