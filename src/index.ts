import * as fs from "fs";
import * as path from "path";

/**
 * Options for reading the files of a directory.
 */
export interface ReadingOptions {
  /**
   * An optional filter that can be defined to filter the filepaths prior to
   * reading them.
   *
   * Returning `true` means the content of the file will be read, false meaning
   * it will be skipped.
   *
   * ### Examples
   *
   * ~~~
   * const options: ReadingOptions = {
   *   filter: (filepath: string): boolean => {
   *     return filepath.endsWith(".yml");
   *   },
   * };
   * ~~~
   *
   * @param filepath The path to the file.
   * @returns Whether to read the file.
   */
  filter?: (filepath: string) => boolean;
}

/**
 * Obtains a list of files in a given directory and then reads the contents into
 * a Buffer, mpping the full filepath to the Buffer.
 *
 * ### Examples
 *
 * Simply reading the contents of a directory:
 *
 * ~~~
 * import { readdir } from "ureaddir";
 *
 * const mappedContents = await readdir("/srv/project/locale");
 *
 * for (const [filepath, content] of Object.entries(mappedContents)) {
 *   console.log(`The content of **${filepath}** is: ${content}`);
 * }
 * ~~~
 *
 * Reading the contents of a directory while filtering to only read `.js` and
 * `.json` files:
 *
 * ~~~
 * import { ReadingOptions, readdir } from "ureddir";
 *
 * const options: ReadingOptions = {
 *   filter: (filepath: string): boolean => {
 *     return filepath.endsWith('.json') || filepath.endsWith('.js');
 *   },
 * };
 *
 * const mappedContents = await readdir("/srv/project/locale", options);
 * ~~~
 *
 * @param absolutePath The path to the directory to read contents of. This
 * should likely be an absolute path.
 * @param options An optionally defined object of options, such as for filtering
 * the files to read.
 * @returns An object mapping the filepaths to Buffers of their contents.
 */
export async function readdir(absolutePath: string, options?: ReadingOptions): Promise<{[key: string]: Buffer}> {
  if (!options) {
    options = {};
  }

  const filenames = await new Promise<string[]>((resolve, reject) => {
    fs.readdir(absolutePath, {}, (err, filenames) => {
      if (err) {
        reject(err);
      } else {
        resolve(filenames.map(filename => {
          if (filename instanceof Buffer) {
            return filename.toString();
          } else {
            return filename;
          }
        }));
      }
    });
  });

  let filepaths = filenames.map(filename => path.join(absolutePath, filename));

  if (options.filter) {
    filepaths = filepaths.filter(options.filter);
  }

  const promises = filepaths.map(filepath => {
    return new Promise<[string, Buffer]>((resolve, reject) => {
      fs.readFile(filepath, {}, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve([filepath, content]);
        }
      });
    });
  });

  const fileContents = await Promise.all(promises);

  const mapped: {[key: string]: Buffer} = {};

  for (const [filepath, content] of fileContents) {
    mapped[filepath] = content;
  }

  return mapped;
}
