import { htmlStatement, statement } from '@/ch01/statement.js';
import invoicesJson from './invoices.json';
import playsJson from './plays.json';

describe('statement', () => {
  it('should print a statement for multiple plays, single customer and multiple seats in plain text', () => {
    const expected =
      '청구 내역 (고객명: BigCo)\n' +
      '  Hamlet: $650.00 (55석)\n' +
      '  As You Like It: $580.00 (35석)\n' +
      '  Othello: $500.00 (40석)\n' +
      '총액: $1,730.00\n' +
      '적립 포인트: 47점\n';

    expect(statement(invoicesJson, playsJson)).toBe(expected);
  });

  it('should print a statement for multiple plays, single customer and multiple seats in html', () => {
    const expected =
      `<h1>청구 내역 (고객명: BigCo)</h1>\n` +
      `<table>\n` +
      `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n` +
      `  <tr><td>Hamlet</td><td>(55석)</td><td>$650.00</td></tr>\n` +
      `  <tr><td>As You Like It</td><td>(35석)</td><td>$580.00</td></tr>\n` +
      `  <tr><td>Othello</td><td>(40석)</td><td>$500.00</td></tr>\n` +
      `</table>\n` +
      `<p>총액: <em>$1,730.00</em></p>\n` +
      `<p>적립 포인트: <em>47</em>점</p>\n`;

    expect(htmlStatement(invoicesJson, playsJson)).toBe(expected);
  });
});
