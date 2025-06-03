import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
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
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const data = await UpvoteSchema.parseAsync(await req.json());
    await prismaClient.upvote.delete({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });
  } catch (error) {
    console.error("Error upvoting stream:", error);
    return new Response("Error while upvoting a stream", { status: 500 });
  }
}
