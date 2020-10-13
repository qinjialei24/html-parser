import { htmlParser, createASTElement } from '../src';

test('html string to ast', () => {
  const html = `<div class="div" id="app" style="color:red;font-size:18px">
  hello,world{{data}}
  <p>测试
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </p>
</div>`;

  expect(htmlParser(html)).toBe(html);
});

test('createASTElement', () => {
  const res = createASTElement('div', { id: 'app' }, [1]);
  expect(res).toStrictEqual({
    tag: 'div',
    attrs: { id: 'app' },
    children: [1],
  });
});
