import BonusValue from './BonusValue';
import Cell from './Cell';
import Config from './Config';

export interface BonusJson {
  multiplier: number;
  score: number;
  type: string;
  x: number;
  y: number;
}

abstract class Bonus {
  public readonly config: Config;

  public readonly multiplier: number;

  public readonly score: number;

  public readonly x: number;

  public readonly y: number;

  constructor({
    config,
    multiplier,
    score,
    x,
    y
  }: {
    config: Config;
    multiplier: number;
    score: number;
    x: number;
    y: number;
  }) {
    this.config = config;
    this.multiplier = multiplier;
    this.score = score;
    this.x = x;
    this.y = y;
  }

  public canApply(cell: Cell): boolean {
    return this.matchesCellCoordinates(cell);
  }

  public getValue(): BonusValue {
    return {
      characterMultiplier: 1,
      wordMultiplier: 1
    };
  }

  public matchesCellCoordinates(cell: Cell): boolean {
    return this.x === cell.x && this.y === cell.y;
  }

  public abstract getType(): string;

  public toJson(): BonusJson {
    return {
      multiplier: this.multiplier,
      score: this.score,
      type: this.getType(),
      x: this.x,
      y: this.y
    };
  }
}

export default Bonus;
