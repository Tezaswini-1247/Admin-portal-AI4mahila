import { createAbsoluteUrl } from '../urls';

describe('urls', () => {
  describe('createAbsoluteUrl', () => {
    it('should return the url if it is an absolute URL', () => {
      expect(createAbsoluteUrl('https://example.com')).toMatchInlineSnapshot(
        `"https://example.com"`
      );
    });

    it('should return the window.location.origin if the url is not provided', () => {
      expect(createAbsoluteUrl()).toMatchInlineSnapshot(`"http://54.87.140.98:1337"`);
    });

    it('should return the window.location.origin prefixed to the provided url if the url is relative', () => {
      expect(createAbsoluteUrl('/example')).toMatchInlineSnapshot(
        `"http://54.87.140.98:1337/example"`
      );
    });

    it('should handle protocol relative URLs', () => {
      expect(createAbsoluteUrl('//example.com')).toMatchInlineSnapshot(`"http://example.com/"`);
    });
  });
});
