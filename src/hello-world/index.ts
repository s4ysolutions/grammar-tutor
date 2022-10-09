import { v4 as uuidv4 } from 'uuid';

export class HelloWorldClass {
  suffix: string;

  constructor(suffix: string) {
    this.suffix = suffix;
  }

  static getName(): string {
    return `Hello, ${uuidv4()}`;
  }

  getHello() {
    return `Hello, ${HelloWorldClass.getName()} - ${this.suffix}`;
  }
}
