import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: Request) {
  const session = await getServerSession();

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 404 });
  }

  try {
    const data = await UpvoteSchema.parseAsync(await req.json());
    await prismaClient.upvote.create({
      data: {
        userId: user.id,
        streamId: data.streamId,
      },
    });
    return NextResponse.json({
      message: "Done!",
    });
  } catch (error) {
    console.error("Error upvoting stream:", error);
    return NextResponse.json(
      { error: "Failed to upvote stream" },
      { status: 500 }
    );
  }
}
