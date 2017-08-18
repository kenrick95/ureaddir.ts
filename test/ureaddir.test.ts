import { readdir, ReadingOptions } from "../src";

describe("readdir result", () => {
  const absolutePath = `${__dirname}/testdir`;

  it("has the correct number of keys", done => {
    readdir(absolutePath)
      .then(obj => {
        expect(Object.keys(obj).length).toBe(2);

        done();
      });
  });

  it("has the correct values", done => {
    readdir(absolutePath)
      .then(obj => {
        const exp1 = "this is just a simple\ntext file\n";
        const exp2 = { "and": "this is another file" };
        expect(obj[`${absolutePath}/1.txt`].toString()).toEqual(exp1);
        expect(JSON.parse(obj[`${absolutePath}/2.json`].toString())).toEqual(exp2);

        done();
      });
  });

  it("correctly filters", done => {
    const ext = ".json";

    const options: ReadingOptions = {
      filter: (filepath: string): boolean => {
        return filepath.indexOf(ext, filepath.length - ext.length) > -1;
      },
    };

    readdir(absolutePath, options)
      .then(obj => {
        expect(Object.keys(obj).length).toBe(1);

        done();
      });
  });
});
