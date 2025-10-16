import { createUser, deleteUser, updateUser } from "@/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt?.type;
    if (eventType === "user.created" || eventType === "user.updated") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username,
      } = evt?.data;

      if (eventType === "user.created") {
        try {
          const user = await createUser({
            id,
            first_name,
            last_name,
            image_url,
            email_addresses,
            username,
          });
          const client = await clerkClient();
          await client.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user?._id,
              isAdmin: user?.isAdmin,
            },
          });
        } catch (err) {
          console.error("Error creating new user: ", err);
          return new Response("Error occured", { status: 400 });
        }
      }
      if (eventType === "user.updated") {
        await updateUser({
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
          username,
        });
      }
    }

    if (eventType === "user.deleted") {
      const { id } = evt?.data;
      await deleteUser(id!);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
