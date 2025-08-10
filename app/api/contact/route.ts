import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role, message } = body

    // Validate required fields
    if (!name || !email || !role || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create email content
    const emailContent = {
      to: "hello@zamora.ai",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Role/Title:</strong> ${role}</p>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <div style="background-color: #e0e7ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #4338ca; margin-top: 0;">Next Steps</h4>
            <p style="margin-bottom: 0;">Please respond to this inquiry within 24 hours. The prospect is interested in ANDI's capabilities for their business challenges.</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from the ANDI Coming Soon page contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Information:
Name: ${name}
Email: ${email}
Role: ${role}

Message:
${message}

Next Steps:
Please respond to this inquiry within 24 hours. The prospect is interested in ANDI's capabilities for their business challenges.

---
This message was sent from the ANDI Coming Soon page contact form.
      `,
    }

    // For now, we'll just log the contact form data
    // In production, you would integrate with an email service like Resend, SendGrid, etc.
    console.log("Contact form submission:", emailContent)

    // TODO: Integrate with email service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send(emailContent)

    return NextResponse.json({ message: "Contact form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
