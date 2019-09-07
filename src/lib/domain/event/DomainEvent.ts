export abstract class DomainEvent {
  readonly occuredOn: Date;
  constructor() {
    this.occuredOn = new Date();
  }
}
