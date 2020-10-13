export function parseStartTag(html = '') {
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  const startTagClose = /^\s*(\/?)>/;
  const ncname = '[a-zA-Z_][\\w\\-\\.]*';
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
  const startTagOpen = new RegExp(`^<${qnameCapture}`);

  let textEnd = html.indexOf('<');
  if (textEnd === 0) {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tag: start[1],
        attr: [],
      };
      html = advance(html, start[0].length);
      let end, attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        match.attr.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5], //单双引号 和 没有引号的情况
        });
        html = advance(html, attr[0].length);
      }
      if (end) {
        advance(html, end[0].length);
      }
      return match;
    }
  }
}

export function advance(html, length) {
  return html.substring(length);
}

const res = parseStartTag(
  `<div id="test" style="color:red;display:none"></div>`
);
console.log('res: ', res);
