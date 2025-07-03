type FormData = {
  email: string
  fullName: string
  company: string
  department: string
}

// This function should be called from the client only!
export async function submitToGoogleSheets(data: FormData) {
  try {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyUZ6-YLtr13J4Gqmp5JoqmUssQifIIGZrb9jdeVUgm_Ujk4hKATmKpvQ_07O3AyWST/exec"

    // Use fetch with no-cors mode for client-side only
    await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        fullName: data.fullName,
        company: data.company,
        department: data.department,
      }),
      mode: "no-cors",
    })

    return { success: true }
  } catch (error) {
    console.error("Error in submitToGoogleSheets:", error)
    return { success: false }
  }
}
