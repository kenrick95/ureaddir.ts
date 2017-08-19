[![ci-badge][]][ci] [![docs-badge][]][docs]

# ureaddir.ts

ureaddir is a tiny and efficient library for reading the contents of files in a
given directory.

A pitfall for reading the contents of files in a directory is awaiting I/O one
by one per file, when all files could be read simultaneously and collected.

### Installation

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

[ci]: https://travis-ci.org/zeyla/ureaddir.ts
[ci-badge]: https://travis-ci.org/zeyla/ureaddir.ts.svg?branch=master
[docs]: https://zeyla.github.io/ureaddir.ts
[docs-badge]: https://img.shields.io/badge/docs-online-5023dd.svg
[license]: https://github.com/zeyla/ureaddir.ts/blob/master/LICENSE.md
