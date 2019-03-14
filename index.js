'use strict';

/* eslint-disable no-plusplus */
/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
/**
 * @external {Array} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
/**
 * @ignore
 */
const { isNaN } = Number;

/**
 * @desc
 * Represents an infinite-size Array.
 */
class Endless {
  /**
   * @desc
   * Creates an Endless from a function
   * that generates values given an index.
   * @param {EndlessCallback} expr
   */
  constructor(expr) {
    /**
     * @typdef {function} EndlessCallback
     * @param {number} index
     * @return {any}
     */
    /**
     * @ignore
     */
    this.expr = expr;

    const memory = [];
    /**
     * @ignore
     */
    this.memory = memory;

    /**
     * @ignore
     */
    this.generator = (() => {
      let i = 0;
      let s = 0;

      return () => {
        while (1) {
          const r = expr(i++);

          if (typeof r !== 'undefined') {
            // eslint-disable-next-line no-return-assign
            return (memory[s++] = r);
          }
        }
      };
    })();

    /**
     * To gain access to the [] operator, we need to wrap
     * the Endless instance into a Proxy instance.
     * @ignore
     */
    return new Proxy(this, {
      get: (t, k) => ((k in t && t[k]) || (!isNaN(k) ? this.get(k) : undefined)),
      // eslint-disable-next-line no-return-assign
      set: (_t, k, v) => (!isNaN(k) && (memory[k] = v)),
    });
  }

  /**
   * @ignore
   */
  get(i) {
    const { memory } = this;

    while (typeof memory[i] === 'undefined') {
      this.generator();
    }

    return memory[i];
  }

  /**
   * @desc
   * Flattens an Endless of finite lists into an Endless of elements.
   * That is, remove one level of nesting.
   * @example
   * const e = new Endless(x => [x, x*2]);
   * const f = e.flat();
   * f.take(4); // 0, 0, 1, 2
   * @return {Endless}
   */
  flat() {
    let c = [];
    let n = 0;
    return new Endless((x) => {
      while (typeof c[x] === 'undefined') {
        c = c.concat(this[n++]);
      }
      return c[x];
    });
  }

  /**
   * @desc
   * Expands all elements of an Endless into finite lists
   * and flattens them.
   * @example
   * const e = new Endless(x => x);
   * const f = e.flatMap(x => [x, x*2]);
   * f.take(4); // 0, 0, 1, 2
   * @param {FlatMapCallback} mutator
   * @return {Endless}
   */
  flatMap(mutator) {
    /**
     * @typedef {function} FlatMapCallback
     * @param {!any} element an element of an Endless
     * @return {Array}
     */
    return this.map(x => mutator(x)).flat();
  }

  /**
   * @desc
   * Apply a mapping function to each element of an Endless,
   * yielding a new Endless of results
   * @example
   * const e = new Endless(x => x);
   * const f = e.map(x => x*2);
   * f.take(4); // 0, 2, 4, 6
   * @param {MapCallback} expr
   * @return {Endless}
   */
  map(expr) {
    /**
     * @typdef {function} MapCallback
     * @param {!any} element an element of an Endless
     * @return {any}
     */
    return new Endless(x => expr(this[x]));
  }

  /**
   * @desc
   * Select the elements of a list that satisfy a predicate.
   * @example
   * const e = new Endless(x => x);
   * const f = e.filter(x => x % 3 === 0);
   * f.take(4); // 0, 3, 6, 9
   * @param {FilterCallback} expr
   * @return {Endless}
   */
  filter(expr) {
    /**
     * @typdef {function} FilterCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    return this.map(x => (expr(x) ? x : undefined));
  }

  /**
   * @desc
   * Finds the index of the first element that satisfy a predicate.
   * @example
   * new Endless(x => x).find(x => x % 5 === 0); // 5
   * @param {FindCallback} expr
   * @return {number}
   */
  find(expr) {
    /**
     * @typdef {function} FindCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    let index = 0;
    while (!expr(this[index])) index += 1;
    return index;
  }

  /**
   * @desc
   * Selects the indeces of the elements that satisfy a predicate.
   * @example
   * const ex = new Endless(x => x + 1).findIndeces(x => x % 2 === 0);
   * ex.take(5); // [1, 3, 5, 7, 9]
   * @param {FindIndecesCallback} expr
   * @return {Endless}
   */
  findIndeces(expr) {
    /**
     * @typdef {function} FindIndecesCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    return new Endless(x => (expr(this[x]) ? x : undefined));
  }

  /**
   * @desc
   * Finds the index of the first element that is equal to the given value.
   * @example
   * new Endless(x => x).indexOf(100); // 100
   * @param {!any} value
   * @return {number}
   */
  indexOf(value) {
    return this.find(x => x === value);
  }

  /**
   * @desc
   * Deletes the first element that satisfy the predicate.
   * @example
   * const ex = new Endless(x => x).delete(x => x % 2 === 0);
   * ex.take(5); // [0, 1, 3, 4, 5]
   * @param {DeleteByCallback} expr
   * @return {Endless}
   */
  deleteBy(expr) {
    /**
     * @typdef {function} DeleteByCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    const index = this.find(expr);
    return new Endless(x => (x === index ? undefined : this[x]));
  }

  /**
   * @desc
   * Deletes the first element that is equal to the given value.
   * @example
   * const ex = new Endless(x => x).delete(0);
   * ex.take(5); // [1, 2, 3, 4, 5]
   * @param {!any} value
   * @return {Endless}
   */
  delete(value) {
    return this.deleteBy(x => x === value);
  }

  /**
   * @desc
   * Skips the first set of elements.
   * @example
   * const ex = new Endless(x => x).skip(10);
   * ex.take(5); // [10, 11, 12, 13, 14]
   * @param {number} amount
   * @return {Endless}
   */
  skip(amount) {
    return new Endless(x => this[x + amount]);
  }

  /**
   * @desc
   * Skips elements while they satisfy a predicate.
   * @example
   * const ex = new Endless(x => x).skipWhile(x => x < 10);
   * ex.take(5); // [10, 11, 12, 13, 14]
   * @param {SkipWhileCallback} expr
   * @return {Endless}
   */
  skipWhile(expr) {
    /**
     * @typdef {function} SkipWhileCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    const index = this.find(x => !expr(x));
    return new Endless(x => (x < index ? undefined : this[x]));
  }

  /**
   * @desc
   * Skips elements until an element satifies a predicate.
   * @example
   * const ex = new Endless(x => x).skipUntil(x => x === 10);
   * ex.take(5); // [10, 11, 12, 13, 14]
   * @param {SkipUntilCallback} expr
   * @return {Endless}
   */
  skipUntil(expr) {
    /**
     * @typdef {function} SkipUntilCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    const index = this.find(x => expr(x));
    return new Endless(x => (x < index ? undefined : this[x]));
  }

  /**
   * @desc
   * alias for 'skip'
   * @example
   * const ex = new Endless(x => x).drop(10);
   * ex.take(5); // [10, 11, 12, 13, 14]
   * @see {@link Endless#skip}
   * @param {number} amount
   * @return {Endless}
   */
  drop(amount) {
    return this.skip(amount);
  }

  /**
   * @desc
   * alias for 'skipWhile'
   * @example
   * const ex = new Endless(x => x).dropWhile(x => x < 10);
   * ex.take(5); // [10, 11, 12, 13, 14]
   * @see {@link Endless#skipWhile}
   * @param {SkipWhileCallback} expr
   * @return {Endless}
   */
  dropWhile(expr) {
    return this.skipWhile(expr);
  }

  /**
   * @desc
   * alias for 'skipUntil'
   * @example
   * const ex = new Endless(x => x).dropUntil(x => x === 10);
   * ex.take(5); // [10, 11, 12, 13, 14]
   * @see {@link Endless#skipUntil}
   * @param {SkipUntilCallback} expr
   * @return {Endless}
   */
  dropUntil(expr) {
    return this.skipUntil(expr);
  }

  /**
   * @desc
   * Selects elements on every given amount.
   * @example
   * const ex = new Endless(x => x).step(2);
   * ex.take(5); // [0, 2, 4, 6, 8]
   * @param {number} amount
   * @return {Endless}
   */
  step(amount) {
    return new Endless(x => this[x * amount]);
  }

  /**
   * @desc
   * Concats an array at the beginning of an Endless
   * @example
   * const ex = new Endless(x => x).startWith([1, 2, 3, 4, 5]);
   * ex.take(10); // [1, 2, 3, 4, 5, 0, 1, 2, 3, 4]
   * @param {Array} arr
   * @return {Endless}
   */
  startWith(arr) {
    return new Endless(x => (arr.length > x ? arr[x] : this[x - arr.length]));
  }

  /**
   * @desc
   * Takes a finite amount of elements from the beginning
   * @example
   * const ex = new Endless(x => x).take(100);
   * ex; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ..., 99]
   * @param {number} amount
   * @return {Array}
   */
  take(amount) {
    const result = [];
    for (let i = 0; i < amount;) result.push(this[i++]);
    return result;
  }

  /**
   * @desc
   * Takes a finite amount of elements while the elements satisfy a predicate
   * @example
   * const ex = new Endless(x => x).takeWhile(x => x < 100);
   * ex; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ..., 99]
   * @param {TakeWhileCallback} expr
   * @return {Array}
   */
  takeWhile(expr) {
    /**
     * @typdef {function} TakeWhileCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    const result = [];
    for (let i = 0; expr(this[i]);) result.push(this[i++]);
    return result;
  }

  /**
   * @desc
   * Takes a finite amount of elements until an element satisfy a predicate
   * @example
   * const ex = new Endless(x => x).takeUntil(x => x === 100);
   * ex; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ..., 99]
   * @param {TakeUntilCallback} expr
   * @return {Array}
   */
  takeUntil(expr) {
    /**
     * @typdef {function} TakeUntilCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    const result = [];
    for (let i = 0; !expr(this[i]);) result.push(this[i++]);
    return result;
  }

  /**
   * @desc
   * Given an index, get a two-tuple of the finite list
   * of that many elements from the start of a given Endless,
   * and the Endless that follows them.
   * @example
   * const ex = new Endless(x => x).splitAt(10);
   * ex[0]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   * ex[1].take(5) // [10, 11, 12, 13, 14]
   * @param {number} index
   * @return {Array}
   */
  splitAt(index) {
    return [this.take(index), this.skip(index)];
  }

  /**
   * @desc
   * Split an Endless into a longest prefix such that all
   * the elements of it satisfy a given predicate,
   * and the rest of the list following them.
   * @example
   * const ex = new Endless(x => x).span(x => x < 10);
   * ex[0]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   * ex[1].take(5) // [10, 11, 12, 13, 14]
   * @param {SpanCallback} expr
   * @return {Array}
   */
  span(expr) {
    /**
     * @typdef {function} SpanCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    return [this.takeWhile(expr), this.skipWhile(expr)];
  }

  /**
   * @desc
   * Split an Endless into a longest prefix such that all
   * the elements of it do not satisfy a given predicate,
   * and the rest of the list following them.
   * @example
   * const ex = new Endless(x => x).break(x => x === 10);
   * ex[0]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   * ex[1].take(5) // [10, 11, 12, 13, 14]
   * @param {BreakCallback} expr
   * @return {Array}
   */
  break(expr) {
    /**
     * @typdef {function} BreakCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    return [this.takeUntil(expr), this.skipUntil(expr)];
  }

  /**
   * @desc
   * Given a predicate and an Endless, return a pair of Endless of elements
   * which do and do not satisfy the predicate, respectively.
   * @example
   * const ex = new Endless(x => x).partition(x => x % 2 === 0);
   * const evens = ex[0];
   * const odds = ex[1];
   * evens.take(10); // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
   * odds.take(10); // [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
   * @param {PartitionCallback} expr
   * @return {Array}
   */
  partition(expr) {
    /**
     * @typdef {function} PartitionCallback
     * @param {!any} element an element of an Endless
     * @return {boolean}
     */
    return [
      this.filter(expr),
      this.filter(x => !expr(x)),
    ];
  }

  /**
   * @desc
   * Given an Endless of finite lists, intersperse the Endless
   * with a given finite list, and concatenate it.
   * @example
   * const ex = new Endless(x => x).intercalate([1, 2, 3]);
   * ex.take(10); // [0, 1, 2, 3, 1, 1, 2, 3, 2, 1]
   * @param {Array} values
   * @return {Endless}
   */
  intercalate(values) {
    return this.flatMap(x => [x, ...values]);
  }

  /**
   * @desc
   * Place a given elements between every adjacent two elements of a given Endless.
   * @example
   * const ex = new Endless(x => x).intersperse(3.14);
   * ex.take(5); // [0, 3.14, 1, 3.14, 2]
   * @param {...any} values
   * @return {Endless}
   */
  intersperse(...values) {
    return this.intercalate(values);
  }

  /**
   * @desc
   * Given an Endless, split it into maximal-length finite lists
   * where every element in each list is equal.
   * @example
   * const ex = new Endless(x => x).group(3);
   * ex.take(3); // [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
   * @param {number} amount
   * @return {Endless}
   */
  group(amount) {
    return new Endless(x => this.skip(x * amount).take(amount));
  }

  /**
   * @desc
   * Repeat the elements of a non-empty finite list.
   * @example
   * const ex = Endless.cycle([1, 2, 3, 4]);
   * ex.take(8) // [1, 2, 3, 4, 1, 2, 3, 4]
   * @param {Array} arr
   * @return {Endless}
   */
  static cycle(arr) {
    const size = arr.length;
    return new Endless(x => arr[x % size]);
  }

  /**
   * @desc
   * Given a list element, use that as every element in an infinite list.
   * @example
   * const ex = Endless.repeat(1, 2, 3, 4);
   * ex.take(8) // [1, 2, 3, 4, 1, 2, 3, 4]
   * @param {...any} values
   * @return {Endless}
   */
  static repeat(...values) {
    return Endless.cycle(values);
  }

  /**
   * @desc
   * Zip two or more Endless into an Endless of n-tuples,
   * where `(a,b,c,..)` in the nth tuple are the nth elements
   * of the given Endless instances respectively.
   * @example
   * const a = new Endless(x => x);
   * const b = new Endless(x => x + 1);
   * const c = new Endless(x => x + 2);
   * const ex = Endless.zip(a, b, c);
   * ex.take(4) // [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5]]
   * @param  {...any} lists
   * @return {Endless}
   */
  static zip(...lists) {
    return new Endless((x) => {
      const r = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const i of lists) {
        r.push(i[x]);
      }
      return r;
    });
  }

  /**
   * @desc
   * Iterator function for an Endless instance
   * Use at your own risk.
   */
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => this[i++],
    };
  }
}

module.exports = Endless;
