const fsPromise = require("fs/promises");

const cssPath = "./assets/css/vars.css";

readJson = async () => {
  const path = "./_data/periodic-table.json";
  try {
    const data = fsPromise.readFile(path, "utf-8");

    data.then((fileData) => {
      const jsonElements = JSON.parse(fileData);
      compileCssVars(jsonElements);
      compileIdProps(jsonElements);
    });
  } catch (err) {
    console.error(err);
  }
};

compileCssVars = async (data) => {
  let css = [];
  const cssStart = ":root {";
  const cssEnd = "}\n\n";

  css.push(cssStart);

  data.forEach((element) => {
    css.push(`--${element.symbol}: #${element.cpkHexColor};`);
  });

  css.push(cssEnd);

  writeCss(css.join("\n"));
};

compileIdProps = async (data) => {
  data.forEach((element) => {
    appendVars(
      `#${element.symbol} {
    background-color: var(--${element.symbol});
}\n\n`
    );
  });
};

writeCss = async (data) => {
  try {
    await fsPromise.writeFile(cssPath, data);
  } catch (error) {
    console.error(error);
  }
};

appendVars = async (data) => {
  try {
    await fsPromise.appendFile(cssPath, data);
  } catch (error) {
    console.log(error);
  }
};

readJson();
