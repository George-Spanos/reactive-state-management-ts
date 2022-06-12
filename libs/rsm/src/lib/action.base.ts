export abstract class Action<TPayload> {
  abstract type: string;
  abstract payload: TPayload;
}
