/**
 * @copyright 2020 Yash Shah yashah1234@gmail.com
 * @license MIT
 */

/**
 * @class ArrayQueue
 * implements FIFO using JS Arrays
 */
export default class ArrayQueue<T> {
  /**
   * Initialise the class
   * @constructor
   * @param arr A list of elements to initialise the Queue
   */
  private _offset: number;
  private _q: T[];
  constructor() {
    this._offset = 0; // To speed up dequeue
    this._q = [];
  }

  /**
   * Enqueues an element
   * @param {*} e Element to be enqueued
   * @return {undefined}
   */
  enqueue(e: T): void {
    this._q.push(e);
  }

  /**
   * Dequeues an element
   * @return {*}
   */
  dequeue(): T | null {
    /*
     * There is a novice implementation
     * Where all we can do is `return this._q.pop()`
     * but, according to ECMA specs, runtime may exceed to
     * O(N) due to copy costs at engine defined boundaries
     *
     * This is why I have chosen the following implementation
     * Don't actually delete till enough elements need to be deleted.
     *
     * This should be easier to solve in the linked list version
     *
     */
    if (this.isEmpty()) return null;

    const returnValue: T = this.front() as T;
    this._offset += 1;

    if (this._offset * 2 < this._q.length) return returnValue;
    /*
     * If more than half the array is of deleted
     * elements, then remove the unnecessary ones.
     */
    this._q = this._q.slice(this._offset);
    this._offset = 0;
    return returnValue;
  }

  /**
   * Returns the number of elements
   * @return {number}
   */
  size(): number {
    return this._q.length - this._offset;
  }

  /**
   * Returns the oldest element still in the queue
   * @return {*}
   */
  front(): T | null {
    if (this.isEmpty()) return null;
    return this._q[this._offset];
  }

  /**
   * Returns the newest element in the queue
   * @return {*}
   */
  back(): T | null {
    if (this.isEmpty()) return null;
    return this._q[this._q.length - 1];
  }

  /**
   * Returns true if queue is empty
   * @return {Boolean}
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Re initialises the queue
   * @return {undefined}
   */
  reset(): void {
    this._q = [];
    this._offset = 0;
  }

  /**
   * Returns the elements in the queue, without
   * modifying the queue.
   * First element of the list will be the oldest
   * element in the queue.
   */
  toArray(): T[] {
    const returnValue: T[] = [];
    if (!this.isEmpty())
      for (let i = this._offset; i < this._q.length; i++)
        returnValue.push(this._q[i]);
    return returnValue;
  }
}
