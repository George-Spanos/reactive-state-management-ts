import { AddPeople, PeopleStore, Person, UnmappedAction } from './people.store';
describe('Base Store Test', () => {
  const me: Person = {
    name: 'George',
    surname: 'Spanos',
  };
  const katerina: Person = {
    name: 'Katerinaki',
    surname: 'Spatharou',
  };
  const peopleStore = new PeopleStore({ items: [] });
  it('should create store', () => {
    expect(peopleStore).toBeDefined();
  });
  it('should call mapActionToStore when an action is dispatched', () => {
    const spy = jest.spyOn(peopleStore, 'mapActionToStore');
    peopleStore.dispatch(new AddPeople([me, katerina]));
    expect(spy).toHaveBeenCalled();
  });
  it('should get a new store value when an action is dispatched', (done) => {
    peopleStore.dispatch(new AddPeople([me, katerina]));
    peopleStore.people$.subscribe((people) => {
      expect(people.length).toEqual(2);
      done();
    });
  });
  it('should throw an error when dispatching an unmapped action', () => {
    const functionWithError = () => {
      peopleStore.dispatch(new UnmappedAction());
    };
    expect(functionWithError).toThrowError('unmapped store action');
  });
});
