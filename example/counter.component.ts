import {inject} from 'light-injectable';
import { CounterStore } from './counter.store';

// Injecting into constructor params
@inject()
export class CounterComponent {
  constructor(private counterStore: CounterStore) {
    this.counterStore.count;
    this.counterStore.increment();
  }
}

// Injecting into class property
export class CounterComponent2 {
  @inject() private counterStore: CounterStore;
  constructor() {
    this.counterStore.count;
    this.counterStore.increment();
  }
}