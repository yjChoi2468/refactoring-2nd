class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;

    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }

    return result;
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;

    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }

    result += 300 * this.performance.audience;

    return result;
  }

  get volumeCredits() {
    let volumeCredits = Math.max(this.performance.audience - 30, 0);

    volumeCredits += Math.floor(this.performance.audience / 5);

    return volumeCredits;
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

function createStatementData(invoice, plays) {
  let statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enhancePerformance);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = totalAmount(statementData);

  return statementData;

  function enhancePerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);

    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

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
