# ureaddir.ts

ureaddir is a tiny and efficient library for reading the contents of files in a
given directory.

A pitfall for reading the contents of files in a directory is awaiting I/O one
by one per file, when all files could be read simultaneously and collected.

### Instllation

If you're using yarn,

```sh
$ yarn add https://github.com/zeyla/ureaddir.ts --save
```

If using npm,

```sh
$ npm install https://github.com/zeyla/ureaddir.ts --save
```

### Examples

Read the files in a given directory:

```ts
import * as path from "path";
import { readdir } from "ureaddir";

async function main() {
  const fileContents = await readdir(`${__dirname}/files`);

  for (const [filepath, content] of Object.entries(fileContents)) {
    const filename = path.basename(filepath);
    const contentString = content.toString();

    console.log(`${filename}: ${contentString}`);
  }
}
```

### License

ISC. The license can be read [here][license].

[license]: https://github.com/zeyla/ureaddir.ts/blob/master/LICENSE.md
