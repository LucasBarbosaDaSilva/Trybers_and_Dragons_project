import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;

  private _energy: Energy;

  constructor(
    name: string,
    race?: Race,
    archetype?: Archetype,
  ) {
    this._archetype = archetype || new Mage(name);
    this._defense = getRandomInt(1, 10);
    this._dexterity = getRandomInt(1, 10);
    this._race = race || new Elf(name, this._dexterity);
    this._strength = getRandomInt(1, 10);
    this._maxLifePoints = (this._race.maxLifePoints / 2);
    this._lifePoints = this._maxLifePoints;
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get race(): Race {
    return this._race;
  }

  get strength(): number {
    return this._strength;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get energy(): Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;

    if (damage <= 0) {
      return this._lifePoints;
    }
    if ((this._lifePoints - damage) < 0) {
      this._lifePoints = -1;
    } else {
      this._lifePoints -= damage;
    }
    return this._lifePoints;
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    const addPoints = getRandomInt(1, 10);

    if (this._maxLifePoints + addPoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    } else {
      this._maxLifePoints += addPoints;
    }

    this._lifePoints = this._maxLifePoints;
    this._strength += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._energy.amount = 10;
  }

  special(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._defense * 0.5);
  }
}