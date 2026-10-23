// Photography sources and licence status are tracked in docs/photography-inventory.md (internal).
const ids = {
  agriculture: "1700241739138-4ec27c548035",
  energy: "1786532852011-443cba5dc9fe",
  minerals: "1523848309072-c199db53f137",
  border: "1769144256181-698b8f807066",
  merchant: "1687422809617-a7d97879b3b0",
}

export const img = (key: keyof typeof ids, w: number, h?: number) =>
  `https://images.unsplash.com/photo-${ids[key]}?w=${w}${h ? `&h=${h}` : ""}&fit=crop&auto=format&q=80`
