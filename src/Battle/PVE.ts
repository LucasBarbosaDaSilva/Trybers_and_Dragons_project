import Battle from './Battle';
import Character from '../Character';
import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';

type PVEFighter = Fighter | Character;
type PVEMonster = Monster | Fighter | SimpleFighter;

export default class PVE extends Battle {
  private _player: PVEFighter;
  private _monster: PVEMonster[];

  constructor(player: PVEFighter, monster: PVEMonster[]) {
    super(player);
    this._player = player;
    this._monster = monster;
  }

  public fight(): number {
    let index = 0;
    while (index < this._monster.length) {
      this._player.attack(this._monster[index]);
      this._monster[index].attack(this._player);
      if (this._player.lifePoints <= 0) {
        return super.fight();
      }
      if (this._monster[index].lifePoints <= 0) {
        index += 1;
      }
    }
    return super.fight();
  }
}