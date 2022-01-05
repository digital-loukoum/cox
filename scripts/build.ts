import { compile, patch } from "@digitak/tsc-esm"
import { rmSync, cpSync } from "fs"

console.log("Cleaning package...")
rmSync("package", { recursive: true, force: true })

console.log("Compiling typescript...")
compile()

console.log("Copying configuration files...")
cpSync("./README.md", "./package/README.md")
cpSync("./package.json", "./package/package.json")

console.log("Patching imports...")
patch()
