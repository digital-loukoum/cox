import { compile, patch } from "@digitak/tsc-esm"
import { rmSync, cpSync, readFileSync, writeFile, writeFileSync } from "fs"

console.log("Cleaning package...")
rmSync("package", { recursive: true, force: true })

console.log("Compiling typescript...")
compile()

console.log("Patching imports...")
patch()

console.log("Bump build version...")
const packageInfos = JSON.parse(readFileSync("./package.json", "utf-8"))
const [major, minor, build] = packageInfos.version
	.split(".")
	.map((value: string) => parseInt(value))
packageInfos.version = [major, minor, build + 1].join(".")
writeFileSync("./package.json", JSON.stringify(packageInfos, null, "\t"))

console.log("Copying configuration files...")
cpSync("./README.md", "./package/README.md")
cpSync("./package.json", "./package/package.json")
