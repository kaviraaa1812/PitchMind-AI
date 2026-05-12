import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { suggestion, matchContext } = await req.json();

    // In a real scenario, we would call Gemini API here.
    // For now, we simulate a response based on the suggestion.
    
    let feedback = "";
    let confidence = 0.85;
    let risk = "LOW";

    if (suggestion.toLowerCase().includes('bouncer')) {
      feedback = "A bouncer is a high-risk move against Dhoni, but it can disrupt his rhythm if aimed at the body. Pair it with a deep square leg.";
      confidence = 0.92;
      risk = "MEDIUM";
    } else if (suggestion.toLowerCase().includes('spin')) {
      feedback = "Spin is effective here as the pitch is showing some turn. Keep the field tight.";
      confidence = 0.88;
      risk = "LOW";
    } else {
      feedback = `Tactical move '${suggestion}' analyzed. Positioning adjustments recommended to maximize effectiveness.`;
      confidence = 0.75;
      risk = "LOW";
    }

    return NextResponse.json({
      feedback,
      confidence,
      risk,
      tacticalIQ: Math.floor(Math.random() * 20) + 130
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process tactical input" }, { status: 500 });
  }
}
