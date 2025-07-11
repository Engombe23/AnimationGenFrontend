import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { svg } = await request.json();
    if (!svg) {
      return NextResponse.json({ error: "No SVG provided" }, { status: 400 });
    }

    // Call OpenAI API to simulate SVG to Lottie conversion
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that converts SVG code to Lottie JSON animation. Always return valid Lottie JSON.",
          },
          {
            role: "user",
            content: `Convert this SVG to a simple Lottie JSON animation: ${svg}`,
          },
        ],
        temperature: 0.2,
        max_tokens: 1200,
      }),
    });

    if (!openaiRes.ok) {
      throw new Error("OpenAI API call failed");
    }
    const openaiData = await openaiRes.json();
    // Try to parse the Lottie JSON from the response
    let lottieJson;
    try {
      const text = openaiData.choices?.[0]?.message?.content || "";
      lottieJson = JSON.parse(text);
    } catch {
      lottieJson = { error: "Failed to parse Lottie JSON from OpenAI response" };
    }
    return NextResponse.json(lottieJson, { status: 200 });
  } catch (error) {
    console.error(error);
    // Return a dummy Lottie JSON as fallback
    const dummyLottie = {
      v: "5.7.4",
      fr: 30,
      ip: 0,
      op: 60,
      w: 512,
      h: 512,
      nm: "Dummy Animation",
      ddd: 0,
      assets: [],
      layers: [],
    };
    return NextResponse.json(dummyLottie, { status: 200 });
  }
}