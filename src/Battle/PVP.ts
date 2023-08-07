import Battle from './Battle';
import Fighter from '../Fighter';

export default class PVP extends Battle {
  private _fighter2: Fighter;
  constructor(fighter1: Fighter, fighter2: Fighter) {
    super(fighter1);
    this._fighter2 = fighter2;
  }

  private noVictory(): boolean {
    return this.player.lifePoints !== -1 && this._fighter2.lifePoints !== -1;
  }

  fight(): number {
    while (this.noVictory()) {
      this.player.attack(this._fighter2);
      this._fighter2.attack(this.player);
    }
    return super.fight();
  }
}