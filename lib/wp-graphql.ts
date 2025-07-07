// lib/wp-graphql.ts
export async function fetchComingSoonData() {
  const res = await fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
  });

  const json = await res.json();
  return json.data?.page;
}
