import Prompt from "../../../models/prompt";
import { ConnectDB } from "../../../utils/database"


export const GET = async (request) => {
    try {
        await ConnectDB();

        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch all Prompts", { status: 500})
    }
}
