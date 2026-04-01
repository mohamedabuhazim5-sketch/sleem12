Applied fixes:
- Replaced server-side public Supabase usage with service-role/admin client where RLS would block backend flows.
- create-profile now uses upsert and avoids duplicate clinic creation.
- payment route now inserts through the authenticated server client instead of the public client.
- webhook now reads clinics using admin client.
- pinned package versions instead of latest to avoid breakage from future Next.js and Tailwind changes.
- lint script changed from `next lint` to `eslint .` for compatibility with newer Next.js docs.
