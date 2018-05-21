import {injectable} from 'light-injectable';

@injectable()
export class CounterStore {
  count: number = 0;
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
}