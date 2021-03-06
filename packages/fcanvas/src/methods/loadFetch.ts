import normalize from "path-normalize"

// cache
const fetchMap = new Map<string, string>()
function loadFetch(url: string, get?: true): Promise<string>
// eslint-disable-next-line no-redeclare
function loadFetch(url: string, get: false): string

// eslint-disable-next-line no-redeclare
function loadFetch(url: string, get = false): Promise<string> | string {
  if (get) return getFetch(url)

  const key = normalize(url)
  const inCache = fetchMap.get(key)

  if (inCache) return Promise.resolve(inCache)

  return fetch(url)
    .then((res) => res.text())
    .then((text) => {
      fetchMap.set(key, text)

      return text
    })
}

export { loadFetch }
export function getFetch(url: string): string {
  if (!fetchMap.has(normalize(url)))
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error(`Cannot find image ${url}. First run await loadFetch().`)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fetchMap.get(normalize(url))!
}
