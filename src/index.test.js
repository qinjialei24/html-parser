import { htmlParser } from './index';

test('html string to ast', () => {
  const html = `<div class="div">
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
