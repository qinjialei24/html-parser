import { advance, createASTElement, parseStartTag } from './utils';

// id="app" id='app' id=app
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
//标签名  <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// > />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

const NODE_TYPE = {
  text: 1,
};

const html = `<div class="div" id="app" style="color:red;font-size:18px">
  hello,world{{data}}
  <p id='xx'>测试</p>
</div>`;

export function htmlParser(html = '') {
  let root;

  let currentParent;
  let text;
  let stack = [];
  while (html) {
    const textEnd = html.indexOf('<');
    if (textEnd === 0) {
      const { startTagMatch, htmlRest } = parseStartTag(html);
      html = htmlRest;

      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      const endTagMatch = html.match(endTag);

      if (endTagMatch) {
        html = advance(html, endTagMatch[0].length);
        end(endTagMatch);
        continue;
      }
    }

    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }

    if (text) {
      html = advance(html, text.length);
      chars(text);
    }
  }

  console.log('root: ', root);

  function start(tagName, attrs) {
    const element = createASTElement(tagName, attrs);
    if (!root) {
      root = element;
    }
    currentParent = element;
    stack.push(element);
  }

  function end() {
    const element = stack.pop();
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }

  function chars(text) {
    text = text.trim();
    if (text.length > 0) {
      currentParent.children.push({
        type: NODE_TYPE.text,
        text,
      });
    }
  }
}

htmlParser(html);
