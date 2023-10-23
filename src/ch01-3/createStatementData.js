function createStatementData(invoice, plays) {
  let statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enhancePerformance);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = totalAmount(statementData);

  return statementData;

  function enhancePerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);

    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case 'tragedy':
        result = 40000;

        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30000;

        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }

        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }

    return result;
  }

  function volumeCreditsFor(perf) {
    let result = Math.max(perf.audience - 30, 0);

    if (playFor(perf).type === 'comedy') {
      result += Math.floor(perf.audience / 5);
    }

    return result;
  }

  function totalVolumeCredits(statementData) {
    return statementData.performances.reduce(
      (total, performance) => total + performance.volumeCredits,
      0
    );
  }

  function totalAmount(statementData) {
    return statementData.performances.reduce(
      (total, aPerformance) => total + aPerformance.amount,
      0
    );
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
}

export { createStatementData };
