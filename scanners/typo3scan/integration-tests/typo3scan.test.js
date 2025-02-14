// SPDX-FileCopyrightText: the secureCodeBox authors
//
// SPDX-License-Identifier: Apache-2.0

const {scan} = require("../../helpers");

jest.retryTimes(3);

test(
  "typo3scan scans old-typo3 for vulnerable extensions and core only",
  async () => {
    const {categories, severities, count} = await scan(
      "typo3scan-old-typo3",
      "typo3scan",
      ["-d", "http://old-typo3.demo-targets.svc", "--vuln"],
      90
    );

    expect(count).toBe(18);
    expect(categories).toMatchInlineSnapshot(`
      {
        "Vulnerability": 18,
      }
    `);
    expect(severities).toMatchInlineSnapshot(`
      {
        "high": 18,
      }
    `);
  },
  3 * 60 * 1000
);

test(
  "Invalid argument should be marked as errored",
  async () => {
    await expect(
      scan(
        "typo3scan-invalidArg",
        "typo3scan",
        ["--invalidArg", "example.com"],
        90
      )
    ).rejects.toThrow("HTTP request failed");
  },
  3 * 60 * 1000
);
