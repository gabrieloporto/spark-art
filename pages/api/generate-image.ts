import { NextApiRequest, NextApiResponse } from "next";
import { HfInference } from "@huggingface/inference";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const model = "stabilityai/stable-diffusion-3.5-large";

    const result = await hf.textToImage({ inputs: prompt, model });

    const buffer = Buffer.from(await result.arrayBuffer());

    cloudinary.v2.uploader
      .upload_stream(
        { resource_type: "image", folder: "generated-images" },
        (error, result) => {
          if (error) {
            console.error("Error al subir a Cloudinary:", error);
            return res
              .status(500)
              .json({ message: "Error uploading to Cloudinary" });
          }

          return res.status(200).json({ imageUrl: result?.secure_url });
        }
      )
      .end(buffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error generating image" });
  }
}
