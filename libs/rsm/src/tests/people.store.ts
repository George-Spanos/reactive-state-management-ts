import { map } from 'rxjs';
import { Action } from '../lib/action.base';
import { BaseStore } from '../lib/store.base';

export interface Person {
  name: string;
  surname: string;
}
export class AddPeople extends Action<Person[]> {
  type = 'people/addPeople';
  constructor(public payload: Person[]) {
    super();
  }
}
export class ClearPeople extends Action<undefined> {
  payload: undefined;
  type = 'people/clearPeople';
}
export class UnmappedAction extends Action<undefined> {
  payload: undefined;
  type = 'people/unmappedAction';
}
export interface PeopleState {
  items: Person[];
}
export type PeopleAction = AddPeople | ClearPeople;
export class PeopleStore extends BaseStore<PeopleState, PeopleAction> {
  select = {
    people$: this._state$.pipe(map((state) => state.items)),
  };
  public mapActionToStore(action: PeopleAction): void {
    if (action instanceof AddPeople) {
      this._state$.next({ items: action.payload });
    } else if (action instanceof ClearPeople) {
      this._state$.next({ items: [] });
    } else {
      throw new Error('unmapped store action');
    }
  }
}
