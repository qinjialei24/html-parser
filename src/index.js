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

export function htmlParser(html) {
  return html;
}

export function createASTElement(tagName, attrs,children) {
  return {
    tag: tagName,
    attrs,
    children,
  };
}

htmlParser(html);
