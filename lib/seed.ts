/**
 * Deterministic seeding helper for mock GEO Analysis data.
 * Uses simple hash-based approach to generate consistent results for the same domain.
 */

export interface SeedData {
  score: number // 50-100
  mentions: number // integer in reasonable range
  sovPct: number // 0-100
  sentiment: 'Positive' | 'Mixed' | 'Negative'
}

/**
 * Simple hash function for domain string
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Generate seeded mock data from domain string.
 * Returns deterministic results for the same input.
 */
export function seedFromDomain(domain: string): SeedData {
  // Normalize domain (remove protocol, trailing slash, etc.)
  const normalized = domain
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .trim()

  const hash = hashString(normalized)

  // Seed for score (50-100)
  const scoreSeed = hash % 51
  const score = 50 + scoreSeed

  // Seed for mentions (200-10000)
  const mentionsSeed = (hash * 7) % 9801
  const mentions = 200 + mentionsSeed

  // Seed for Share of Visibility (0-100)
  const sovSeed = (hash * 13) % 101
  const sovPct = sovSeed

  // Seed for sentiment
  const sentimentSeed = (hash * 3) % 3
  const sentimentMap: SeedData['sentiment'][] = ['Positive', 'Mixed', 'Negative']
  const sentiment = sentimentMap[sentimentSeed]

  return {
    score,
    mentions,
    sovPct,
    sentiment,
  }
}