import { BehaviorSubject } from 'rxjs';
import { Action } from './action.base';

export abstract class BaseStore<
  TState extends Readonly<unknown>,
  TAction extends Action<unknown>,
> {
  protected readonly _state$: BehaviorSubject<TState>;
  constructor(initialState: TState) {
    this._state$ = new BehaviorSubject<TState>(initialState);
  }
  protected abstract mapActionToStore(action: TAction): void;
  public dispatch(action: TAction) {
    this.mapActionToStore(action);
  }
}
