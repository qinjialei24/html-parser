export function parseStartTag(html = '') {
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  const startTagClose = /^\s*(\/?)>/;
  const ncname = '[a-zA-Z_][\\w\\-\\.]*';
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
  const startTagOpen = new RegExp(`^<${qnameCapture}`);

  const start = html.match(startTagOpen);
  if (start) {
    const match = {
      tagName: start[1],
      attrs: [],
    };
    html = advance(html, start[0].length);
    let end, attr;
    while (
      !(end = html.match(startTagClose)) &&
      (attr = html.match(attribute))
    ) {
      match.attrs.push({
        name: attr[1],
        value: attr[3] || attr[4] || attr[5], //单双引号 和 没有引号的情况
      });
      html = advance(html, attr[0].length);
    }
    if (end) {
      html = advance(html, end[0].length);
      return {
        startTagMatch: match,
        htmlRest: html,
      };
    }
  }

  return {
    startTagMatch: null,
    htmlRest: html,
  };
}

export function advance(html, length) {
  return html.substring(length);
}

export function createASTElement(tagName, attrs, children = []) {
  return {
    tagName,
    attrs,
    children,
  };
}
