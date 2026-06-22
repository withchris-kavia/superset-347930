/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import maskEmail from './maskEmail';

test('maskEmail returns empty string for nullish/empty input', () => {
  expect(maskEmail(undefined)).toBe('');
  expect(maskEmail(null)).toBe('');
  expect(maskEmail('')).toBe('');
  expect(maskEmail('   ')).toBe('');
});

test('maskEmail masks a typical email address', () => {
  expect(maskEmail('john.doe@example.com')).toBe('j***@example.com');
});

test('maskEmail keeps the domain intact and preserves the first local-part character', () => {
  expect(maskEmail('A@example.com')).toBe('A***@example.com');
  expect(maskEmail('Abc@Example.Com')).toBe('A***@Example.Com');
});

test('maskEmail handles plus addressing and subdomains', () => {
  expect(maskEmail('john.doe+tag@sub.example.co.uk')).toBe(
    'j***@sub.example.co.uk',
  );
});

test('maskEmail returns trimmed original string for invalid email-like input (no usable @)', () => {
  expect(maskEmail('not-an-email')).toBe('not-an-email');
  expect(maskEmail(' @example.com ')).toBe('@example.com');
  expect(maskEmail('user@')).toBe('user@');
});
