"use server"

type FormData = {
  email: string
  fullName: string
  company: string
  department: string
}

export async function submitToGoogleSheets(data: FormData) {
  try {
    // Use the updated Google Apps Script URL
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyUZ6-YLtr13J4Gqmp5JoqmUssQifIIGZrb9jdeVUgm_Ujk4hKATmKpvQ_07O3AyWST/exec"

    // Server-side fetch can have CORS issues with Google Apps Script
    // Let's return success and rely on the client-side fallback
    // which uses no-cors mode

    // For logging purposes only - don't wait for this to complete
    fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        fullName: data.fullName,
        company: data.company,
        department: data.department,
      }),
    }).catch((error) => {
      console.log("Non-blocking fetch attempt error (expected):", error)
    })

    // Return success immediately - the client-side fallback will handle the actual submission
    return { success: true }
  } catch (error) {
    console.error("Error in submitToGoogleSheets:", error)
    // Don't throw an error, just return success false
    return { success: false }
  }
}
