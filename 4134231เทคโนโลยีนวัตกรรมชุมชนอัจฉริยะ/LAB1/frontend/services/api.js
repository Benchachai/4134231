export async function getStatus() {
  const res = await fetch('http://localhost:3000/api/status')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
