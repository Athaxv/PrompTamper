import Prompt from "@/models/prompt";
import { ConnectDB } from "@/utils/database"


export const GET = async (request, { params }) => {
    try {
        await ConnectDB();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch all the prompts", {
            status: 500
        })
    }
}