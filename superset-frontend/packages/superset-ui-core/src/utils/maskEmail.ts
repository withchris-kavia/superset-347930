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

/**
 * Masks an email address for display/logging contexts while preserving enough
 * domain context for recognition.
 *
 * Safe propagation rule: this function is intended for presentation and
 * observability boundaries only. Do not use masked values for delivery,
 * authentication, user lookup, persistence, or API contracts.
 */
// PUBLIC_INTERFACE
export default function maskEmail(email?: string | null): string {
  /**
   * Behavior:
   * - null/undefined/empty -> ''
   * - invalid "email-like" strings (no usable '@') -> trimmed original input
   * - valid -> keep first char of local-part, apply a fixed mask, keep full domain
   *
   * Examples:
   * - "john.doe@example.com" -> "j***@example.com"
   * - "a@example.com" -> "a***@example.com"
   */
  if (email == null) return '';

  const trimmed = `${email}`.trim();
  if (!trimmed) return '';

  const atIndex = trimmed.lastIndexOf('@');
  if (atIndex <= 0 || atIndex === trimmed.length - 1) {
    // Not a usable email address; return a safe, non-throwing fallback.
    return trimmed;
  }

  const localPart = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex + 1);

  if (!localPart || !domain) return trimmed;

  const firstChar = localPart[0];
  const fixedMask = '***';

  return `${firstChar}${fixedMask}@${domain}`;
}
