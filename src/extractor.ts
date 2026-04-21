/**
 * Text extractor for email addresses and Chinese mobile phone numbers
 */

export interface ExtractionResult {
  emails: string[];
  phones: string[];
}

/**
 * Extracts all email addresses from the given text
 * @param text The input text
 * @returns Array of unique email addresses found
 */
export function extractEmails(text: string): string[] {
  // Email regex pattern
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex) || [];
  
  // Remove duplicates and return
  return [...new Set(matches)];
}

/**
 * Extracts all Chinese mobile phone numbers from the given text
 * Chinese mobile numbers: 11 digits starting with 13, 14, 15, 16, 17, 18, 19
 * @param text The input text
 * @returns Array of unique phone numbers found
 */
export function extractChinesePhones(text: string): string[] {
  // Chinese mobile phone regex pattern
  // Matches: 11 digits starting with 13, 14, 15, 16, 17, 18, 19
  const phoneRegex = /1[3-9]\d{9}/g;
  const matches = text.match(phoneRegex) || [];
  
  // Remove duplicates and return
  return [...new Set(matches)];
}

/**
 * Extracts both emails and Chinese phone numbers from the given text
 * @param text The input text
 * @returns ExtractionResult object containing arrays of emails and phones
 */
export function extractAll(text: string): ExtractionResult {
  const emails = extractEmails(text);
  const phones = extractChinesePhones(text);
  
  return {
    emails,
    phones
  };
}

/**
 * Formats the extraction result as JSON string
 * @param result ExtractionResult object
 * @param pretty Whether to format the JSON with indentation
 * @returns JSON string
 */
export function toJSON(result: ExtractionResult, pretty: boolean = true): string {
  if (pretty) {
    return JSON.stringify(result, null, 2);
  }
  return JSON.stringify(result);
}

/**
 * Extracts from text and returns formatted JSON
 * @param text The input text
 * @param pretty Whether to format the JSON with indentation
 * @returns JSON string with extraction results
 */
export function extractAndFormat(text: string, pretty: boolean = true): string {
  const result = extractAll(text);
  return toJSON(result, pretty);
}