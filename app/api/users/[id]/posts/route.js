// app/api/users/[id]/posts/route.js (or .ts)
import Prompt from "@/models/prompt";
import { ConnectDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await ConnectDB();

        const userId = params.id; // params.id corresponds to the dynamic route parameter [id]

        console.log("Fetching prompts for user ID:", userId);

        const prompts = await Prompt.find({
            creator: userId
        }).populate('creator');

        console.log("Fetched prompts:", prompts);

        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching prompts:", error);
        return new Response("Failed to fetch all the prompts", {
            status: 500
        });
    }
};
