import { readdirSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

const SRC_PATH = join(__dirname, "../src")

const fileIgnore = [".d.ts", ".test.ts", ".spec.ts"]
function exportAllFiles(dir: string) {
  const dirPath = join(SRC_PATH, dir)
  const dirFiles = readdirSync(dirPath)
  // eslint-disable-next-line functional/no-let
  let code = ""

  dirFiles.forEach((file) => {
    if (
      file.endsWith(".ts") &&
      fileIgnore.every((ignore) => !file.endsWith(ignore))
    )
      code += exportFile("./" + join(dir, file)) + "\n"
  })

  return code
}
function exportFile(path: string) {
  const file = readFileSync(join(SRC_PATH, path), "utf8")

  const exports = file
    .split("\n")
    .filter(
      (line) =>
        line.startsWith("export ") &&
        !line.includes("export type") &&
        !line.includes("export interface")
    )
    .map((line) => {
      const name = line.match(/export (?:\w+) (\w+)/)?.[1]
      if (name) return name

      return line.replace("export {", "").replace("}", "").trim()
    })
    .filter((name) => !name.startsWith("_"))

  return `export { ${exports.join(", ")} } from "${path.replace(".ts", "")}"`
}

writeFileSync(
  join(SRC_PATH, "auto-export.ts"),
  [
    "// export methods",
    exportAllFiles("methods"),
    "// export on",
    exportAllFiles("on"),
    "// export shapes",
    exportAllFiles("shapes"),
    "// export useApi",
    exportAllFiles("useApi")
  ].join("\n")
)
