import {
  extractEmails,
  extractChinesePhones,
  extractAll,
  toJSON,
  extractAndFormat
} from './extractor';

describe('Text Extractor', () => {
  describe('extractEmails', () => {
    it('should extract email addresses from text', () => {
      const text = 'Contact me at test@example.com or support@company.cn';
      const result = extractEmails(text);
      expect(result).toEqual(['test@example.com', 'support@company.cn']);
    });

    it('should return empty array when no emails found', () => {
      const text = 'No emails here just text';
      const result = extractEmails(text);
      expect(result).toEqual([]);
    });

    it('should remove duplicate emails', () => {
      const text = 'test@example.com test@example.com test@example.com';
      const result = extractEmails(text);
      expect(result).toEqual(['test@example.com']);
    });

    it('should handle various email formats', () => {
      const text = 'user.name@domain.co.uk user_name@sub.domain.com test+tag@example.org';
      const result = extractEmails(text);
      expect(result).toEqual([
        'user.name@domain.co.uk',
        'user_name@sub.domain.com',
        'test+tag@example.org'
      ]);
    });
  });

  describe('extractChinesePhones', () => {
    it('should extract Chinese mobile phone numbers', () => {
      const text = 'Call me at 13800138000 or 13912345678';
      const result = extractChinesePhones(text);
      expect(result).toEqual(['13800138000', '13912345678']);
    });

    it('should return empty array when no phones found', () => {
      const text = 'No phone numbers here';
      const result = extractChinesePhones(text);
      expect(result).toEqual([]);
    });

    it('should remove duplicate phone numbers', () => {
      const text = '13800138000 13800138000 13800138000';
      const result = extractChinesePhones(text);
      expect(result).toEqual(['13800138000']);
    });

    it('should only match 11-digit numbers starting with 13-19', () => {
      const text = 'Valid: 13800138000 15012345678 19987654321 Invalid: 12000000000 12345678901 1380013800';
      const result = extractChinesePhones(text);
      expect(result).toEqual(['13800138000', '15012345678', '19987654321']);
    });
  });

  describe('extractAll', () => {
    it('should extract both emails and phones', () => {
      const text = 'Email: test@example.com Phone: 13800138000';
      const result = extractAll(text);
      expect(result).toEqual({
        emails: ['test@example.com'],
        phones: ['13800138000']
      });
    });

    it('should handle complex text with multiple items', () => {
      const text = `
        Contact us:
        - support@company.com
        - sales@example.cn
        - Phone: 13912345678, 15098765432
        - Alternate: admin@test.org
      `;
      const result = extractAll(text);
      expect(result.emails).toEqual(['support@company.com', 'sales@example.cn', 'admin@test.org']);
      expect(result.phones).toEqual(['13912345678', '15098765432']);
    });
  });

  describe('toJSON', () => {
    it('should format result as pretty JSON', () => {
      const result = {
        emails: ['test@example.com'],
        phones: ['13800138000']
      };
      const json = toJSON(result, true);
      expect(json).toContain('\n');
      expect(JSON.parse(json)).toEqual(result);
    });

    it('should format result as minified JSON', () => {
      const result = {
        emails: ['test@example.com'],
        phones: ['13800138000']
      };
      const json = toJSON(result, false);
      expect(json).not.toContain('\n');
      expect(JSON.parse(json)).toEqual(result);
    });
  });

  describe('extractAndFormat', () => {
    it('should extract and format as JSON', () => {
      const text = 'test@example.com 13800138000';
      const json = extractAndFormat(text, true);
      const parsed = JSON.parse(json);
      expect(parsed.emails).toEqual(['test@example.com']);
      expect(parsed.phones).toEqual(['13800138000']);
    });

    it('should handle empty results', () => {
      const text = 'No emails or phones here';
      const json = extractAndFormat(text, true);
      const parsed = JSON.parse(json);
      expect(parsed.emails).toEqual([]);
      expect(parsed.phones).toEqual([]);
    });
  });
});