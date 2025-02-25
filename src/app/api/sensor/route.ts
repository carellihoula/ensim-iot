import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const sensorData = await req.json();

    const response = await fetch("http://localhost:5000/api/sensors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sensorData),
    });

    if (!response.ok) {
      throw new Error("Failed to add sensor");
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding sensor" },
      { status: 500 }
    );
  }
}
