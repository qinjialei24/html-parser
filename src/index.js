const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 标签名
const ncname = '[a-zA-Z_][\\w\\-\\.]*';
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;

// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// > 或者 />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;

const html = `<div class="div" id="app" style="color:red;font-size:18px">
  hello,world{{data}}
  <p>测试
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </p>
</div>`;

export function parseStartTag(html) {
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
        value: attr[3],
      });
      html = advance(html, attr[0].length);
    }
  }
}

export function createASTElement(tagName, attrs, children) {
  return {
    tag: tagName,
    attrs,
    children,
  };
}

export function advance(html, length) {
  return html.substring(length);
}

export function htmlParser(html) {
  while (html) {
    const textEnd = html.indexOf('<');
    if (textEnd === 0) {
      const startTagMatch = parseStartTag(html);
    }
    break;
  }
  return html;
}

htmlParser(html);
