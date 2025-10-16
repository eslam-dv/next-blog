import { createOrUpdateUser } from "@/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data;
    const eventType = evt?.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username,
      } = evt?.data;

      try {
        const user = await createOrUpdateUser(
          id,
          first_name!,
          last_name!,
          image_url,
          email_addresses,
          username!,
        );

        if (user && eventType === "user.created") {
          try {
            const client = await clerkClient();
            await client.users.updateUserMetadata(id, {
              publicMetadata: {
                userMongoId: user._id,
                isAdmin: user.isAdmin,
              },
            });
          } catch (err) {
            console.error("Error updating user metadata: ", err);
            return new Response("Error occured", { status: 400 });
          }
        }
      } catch (err) {
        console.error("error creating or updating user: ", err);
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
