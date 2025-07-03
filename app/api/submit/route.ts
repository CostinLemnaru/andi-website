import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { email, fullName, company, department } = data

    // Updated Google Apps Script URL
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyUZ6-YLtr13J4Gqmp5JoqmUssQifIIGZrb9jdeVUgm_Ujk4hKATmKpvQ_07O3AyWST/exec"

    // Submit all data to Google Sheets
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        fullName,
        company,
        department,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit form" }, { status: 500 })
  }
}
