import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const YT_URL_REGEX =
/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})/;

// @ts-ignore
import youtubesearchapi from "youtube-search-api";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await CreateStreamSchema.parseAsync(await req.json());

    const isYT = YT_URL_REGEX.test(data.url);
    if (!isYT) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const extractedId = data.url.split("v=")[1]?.split("&")[0];

    const result = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbnails = result.thumbnail.thumbnails;
    console.log(result);

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        title: result.title ?? "Can't find video",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        largeImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        type: "Youtube",
      },
    });

    return NextResponse.json(
      {
        message: "Stream created successfully",
        stream,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating stream:", error);
    return NextResponse.json(
      { error: "Failed to create stream" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? undefined,
    },
  });

  return NextResponse.json({
    streams,
  });
}
