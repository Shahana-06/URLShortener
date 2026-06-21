/**
 * base62.js
 * Encodes a PostgreSQL auto-increment integer ID into a Base62 short code.
 *
 * Why Base62?
 *   - URL-safe: no +, /, or = like Base64
 *   - Human-readable: no special characters
 *   - Collision-free: encoding a unique integer ID always produces a unique result
 *   - Compact: 62^6 = 56 billion combinations from just 6 characters
 *
 * Algorithm: treat the integer like a number in base-62.
 * Repeatedly divide by 62 and map each remainder to a character.
 *
 * Example:
 *   encode(125) → remainders [1, 2] → reversed → ALPHABET[2] + ALPHABET[1] → "21"
 *   encode(3844) → "100" (first 4-char code)
 */

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = ALPHABET.length; // 62

/**
 * encode(id) → short string
 * @param {number} id - PostgreSQL SERIAL integer (must be > 0)
 * @returns {string} Base62-encoded short code
 */
const encode = (id) => {
  if (id <= 0) throw new Error('ID must be a positive integer');
  let result = '';
  while (id > 0) {
    result = ALPHABET[id % BASE] + result;
    id = Math.floor(id / BASE);
  }
  return result;
};

/**
 * decode(str) → integer
 * Inverse of encode. Useful for debugging or lookups without DB.
 * @param {string} str - Base62 short code
 * @returns {number} Original integer ID
 */
const decode = (str) => {
  let result = 0;
  for (const char of str) {
    result = result * BASE + ALPHABET.indexOf(char);
  }
  return result;
};

module.exports = { encode, decode };
