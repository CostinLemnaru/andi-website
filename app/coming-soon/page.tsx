import ComingSoon from "@/components/coming-soon"

export const dynamic = "force-static" // dacă vrei doar static fără ISR

export default async function ComingSoonPage() {
  const res = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          page(id: 6, idType: DATABASE_ID) {
              title
              comingSoon {
                heroSection {
                  title
                }
              }
            }
          }
        `,
      }),
    next: { revalidate: 60 }, // sau scoți dacă vrei doar static build
  })

  const json = await res.json()
  const data = json.data?.page

  return <ComingSoon data={data} />
}
