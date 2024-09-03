import { NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const PINATA_URL = process.env.PINATA_URL!;
const PINATA_JWT = process.env.PINATA_JWT!;

export const POST = async (req: Request) => {
  try {
    const pinata = new PinataSDK({
      pinataJwt: PINATA_JWT,
      pinataGateway: PINATA_URL,
    });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    console.log("fill ", file);
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
    const upload = await pinata.upload.file(file);
    return NextResponse.json({ cid: upload.IpfsHash });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
