import { connectToDB } from "../../../../../utils/database";
import Prompt from "../../../../../models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log("connected to DB")
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    console.log("stringify : ", JSON.stringify(prompts))
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
