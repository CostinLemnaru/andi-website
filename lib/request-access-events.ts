"use client"

export const REQUEST_ACCESS_EVENT = "andi:request-access"

export type RequestAccessEventDetail = {
  handled: boolean
}

export const dispatchRequestAccessEvent = () => {
  if (typeof window === "undefined") return
  const event = new CustomEvent<RequestAccessEventDetail>(REQUEST_ACCESS_EVENT, {
    detail: { handled: false },
  })
  window.dispatchEvent(event)
  return event.detail.handled
}
