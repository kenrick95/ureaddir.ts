import * as path from "path";
import { readdir } from "../../../src";

async function main() {
  const fileContents = await readdir(`${__dirname}/../resources`);

  for (const [filepath, content] of Object.entries(fileContents)) {
    const filename = path.basename(filepath);
    const contentString = content.toString();

    console.log(`${filename}: ${contentString}`);
  }
}

main().catch(console.log);

console.log("hi");
