import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID ?? "146673485"
const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID ?? "ccf23d19-c4e5-46cd-a928-d8b5a7d607d3"

export async function POST(request: NextRequest) {
  try {
    const rawPayload = await request.json()

    if (!rawPayload || typeof rawPayload !== "object") {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 })
    }

    const portalId =
      typeof (rawPayload as Record<string, unknown>).portalId === "string"
        ? ((rawPayload as Record<string, unknown>).portalId as string)
        : HUBSPOT_PORTAL_ID
    const formGuid =
      typeof (rawPayload as Record<string, unknown>).formGuid === "string"
        ? ((rawPayload as Record<string, unknown>).formGuid as string)
        : HUBSPOT_FORM_GUID

    const payload: Record<string, unknown> = { ...(rawPayload as Record<string, unknown>) }
    delete payload.portalId
    delete payload.formGuid

    const clientIp = getClientIp(request)

    const cookieHeader = request.headers.get("cookie") ?? ""
    const headerHutkMatch = cookieHeader.match(/hubspotutk=([^;]+)/)
    const headerHutk = headerHutkMatch ? decodeURIComponent(headerHutkMatch[1]) : undefined

    const incomingContext =
      payload.context && typeof payload.context === "object" ? (payload.context as Record<string, unknown>) : {}

    const context: Record<string, unknown> = { ...incomingContext }
    const cookieHutk = request.cookies.get("hubspotutk")?.value
    const existingHutk = typeof incomingContext.hutk === "string" ? incomingContext.hutk : undefined
    const existingIp = typeof incomingContext.ipAddress === "string" ? incomingContext.ipAddress : undefined

    if (existingHutk || cookieHutk || headerHutk) {
      context.hutk = existingHutk ?? cookieHutk ?? headerHutk
    }

    if (clientIp) {
      context.ipAddress = clientIp
    } else if (existingIp) {
      context.ipAddress = existingIp
    }

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, context }),
      },
    )

    const responseBody = await response.json().catch(() => ({}))

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "HubSpot submission failed",
          status: response.status,
          body: responseBody,
        },
        { status: 502 },
      )
    }

    return NextResponse.json(responseBody)
  } catch (error) {
    console.error("HubSpot submit error:", error)
    return NextResponse.json({ message: "HubSpot submit error" }, { status: 500 })
  }
}

function getClientIp(request: NextRequest) {
  const headerCandidates = [
    "x-forwarded-for",
    "x-real-ip",
    "true-client-ip",
    "cf-connecting-ip",
    "fastly-client-ip",
    "x-client-ip",
  ]

  for (const headerName of headerCandidates) {
    const value = request.headers.get(headerName)
    if (value && value.length > 0) {
      const first = value.split(",")[0]?.trim()
      if (first) return first
    }
  }

  // @ts-expect-error - available when running in the Node.js runtime
  const runtimeIp = request.ip as string | undefined
  return runtimeIp ?? undefined
}
