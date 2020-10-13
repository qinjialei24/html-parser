import { parseStartTag, advance } from '../src/utils';

describe('parseStartTag', () => {
  test('should return match object', () => {
    const input = '<div id="test" style="color:red;display:none"></div>';
    expect(parseStartTag(input)).toEqual({
      tagName: 'div',
      attrs: [
        { name: 'id', value: 'test' },
        { name: 'style', value: 'color:red;display:none' },
      ],
    });
  });
});

describe('advance', () => {
  test('should delete string 1', () => {
    expect(advance('1234', 1)).toBe('234');
  });
});
