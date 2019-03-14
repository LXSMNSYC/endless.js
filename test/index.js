/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import assert from 'assert';
import Endless from '../src';

/**
 *
 */
describe('Endless', () => {
  /**
   *
   */
  describe('#flat', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).flat() instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => [x * 2, x + 1]).flat();
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === (i % 2 === 0 ? i : (i + 1) / 2));
      }
    });
  });
  /**
   *
   */
  describe('#flatMap', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).flatMap(() => []) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).flatMap(x => [x * 2, x + 1]);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === (i % 2 === 0 ? i : (i + 1) / 2));
      }
    });
  });
  /**
   *
   */
  describe('#map', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).map(x => x) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).map(x => x * 2);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === i * 2);
      }
    });
  });
  /**
   *
   */
  describe('#filter', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).filter(() => true) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).filter(x => x % 2 === 0);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === i * 2);
      }
    });
  });
  /**
   *
   */
  describe('#find', () => {
    /**
     *
     */
    it('should return a number', () => {
      /**
       *
       */
      assert(typeof new Endless(x => x).find(() => 1) === 'number');
    });
    /**
     *
     */
    it('should correctly output the index', () => {
      const ex = new Endless(x => x);
      for (let i = 0; i < 100; i++) {
        assert(ex.find(x => x === i) === i);
      }
    });
  });
  /**
   *
   */
  describe('#findIndeces', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).findIndeces(x => x % 2 === 0) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).findIndeces(x => x % 2 === 0);
      for (let i = 0; i < 100; i++) {
        if (i % 2 === 0) {
          assert(ex[i] === i * 2);
        }
      }
    });
  });
  /**
   *
   */
  describe('#indexOf', () => {
    /**
     *
     */
    it('should return a number', () => {
      /**
       *
       */
      assert(typeof new Endless(x => x).indexOf(1) === 'number');
    });
    /**
     *
     */
    it('should correctly output the index', () => {
      const ex = new Endless(x => x);
      for (let i = 0; i < 100; i++) {
        assert(ex.indexOf(i) === i);
      }
    });
  });
  /**
   *
   */
  describe('#deleteBy', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).deleteBy(x => x % 2 === 0) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).deleteBy(x => x === 0);
      assert(ex[0] !== 0);
      for (let i = 1; i < 100; i++) {
        assert(ex[i - 1] === i);
      }
    });
  });
  /**
   *
   */
  describe('#delete', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).delete(0) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).delete(0);
      assert(ex[0] !== 0);
      for (let i = 1; i < 100; i++) {
        assert(ex[i - 1] === i);
      }
    });
  });
  /**
   *
   */
  describe('#skip', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).skip(1) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).skip(1);
      assert(ex[0] !== 0);
      for (let i = 1; i < 100; i++) {
        assert(ex[i - 1] === i);
      }
    });
  });
  /**
   *
   */
  describe('#skipWhile', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).skipWhile(x => x < 1) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).skipWhile(x => x < 1);
      assert(ex[0] !== 0);
      for (let i = 1; i < 100; i++) {
        assert(ex[i - 1] === i);
      }
    });
  });
  /**
   *
   */
  describe('#skipUntil', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).skipUntil(x => x === 1) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).skipUntil(x => x === 1);
      assert(ex[0] !== 0);
      for (let i = 1; i < 100; i++) {
        assert(ex[i - 1] === i);
      }
    });
  });
  /**
   *
   */
  describe('#drop', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).drop(1) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).drop(1);
      assert(ex[0] !== 0);
      for (let i = 1; i < 100; i++) {
        assert(ex[i - 1] === i);
      }
    });
  });
  /**
   *
   */
  describe('#dropWhile', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).dropWhile(x => x < 1) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).dropWhile(x => x < 1);
      assert(ex[0] !== 0);
      for (let i = 1; i < 100; i++) {
        assert(ex[i - 1] === i);
      }
    });
  });
  /**
   *
   */
  describe('#dropUntil', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).dropUntil(x => x === 1) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).dropUntil(x => x === 1);
      assert(ex[0] !== 0);
      for (let i = 1; i < 100; i++) {
        assert(ex[i - 1] === i);
      }
    });
  });
  /**
   *
   */
  describe('#step', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).step(2) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).step(2);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === i * 2);
      }
    });
  });
  /**
   *
   */
  describe('#startWith', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).startWith([1, 2, 3, 4, 5]) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const arr = [1, 2, 3, 4, 5];
      const ex = new Endless(x => x).startWith(arr);
      for (let i = 0; i < 100; i++) {
        if (i < 5) {
          assert(arr[i] === i + 1);
        } else {
          assert(ex[i] === i - 5);
        }
      }
    });
  });
  /**
   *
   */
  describe('#take', () => {
    /**
     *
     */
    it('should return an Array', () => {
      /**
       *
       */
      assert(new Endless(x => x).take(100) instanceof Array);
    });
    /**
     *
     */
    it('should correctly output an Array', () => {
      const ex = new Endless(x => x).take(100);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === i);
      }
    });
  });
  /**
   *
   */
  describe('#takeWhile', () => {
    /**
     *
     */
    it('should return an Array', () => {
      /**
       *
       */
      assert(new Endless(x => x).takeWhile(x => x < 100) instanceof Array);
    });
    /**
     *
     */
    it('should correctly output an Array', () => {
      const ex = new Endless(x => x).takeWhile(x => x < 100);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === i);
      }
    });
  });
  /**
   *
   */
  describe('#takeUntil', () => {
    /**
     *
     */
    it('should return an Array', () => {
      /**
       *
       */
      assert(new Endless(x => x).takeUntil(x => x === 100) instanceof Array);
    });
    /**
     *
     */
    it('should correctly output an Array', () => {
      const ex = new Endless(x => x).takeUntil(x => x === 100);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === i);
      }
    });
  });
  /**
   *
   */
  describe('#splitAt', () => {
    /**
     *
     */
    it('should return an Array', () => {
      /**
       *
       */
      assert(new Endless(x => x).splitAt(10) instanceof Array);
    });
    /**
     *
     */
    it('should correctly output an Array', () => {
      const ex = new Endless(x => x).splitAt(10);

      for (let i = 0; i < 10; i++) {
        assert(ex[0][i] === i);
      }
      for (let i = 0; i < 100; i++) {
        assert(ex[1][i] === i + 10);
      }
    });
  });
  /**
   *
   */
  describe('#span', () => {
    /**
     *
     */
    it('should return an Array', () => {
      /**
       *
       */
      assert(new Endless(x => x).span(x => x < 10) instanceof Array);
    });
    /**
     *
     */
    it('should correctly output an Array', () => {
      const ex = new Endless(x => x).span(x => x < 10);

      for (let i = 0; i < 10; i++) {
        assert(ex[0][i] === i);
      }
      for (let i = 0; i < 100; i++) {
        assert(ex[1][i] === i + 10);
      }
    });
  });
  /**
   *
   */
  describe('#break', () => {
    /**
     *
     */
    it('should return an Array', () => {
      /**
       *
       */
      assert(new Endless(x => x).break(x => x === 10) instanceof Array);
    });
    /**
     *
     */
    it('should correctly output an Array', () => {
      const ex = new Endless(x => x).break(x => x === 10);

      for (let i = 0; i < 10; i++) {
        assert(ex[0][i] === i);
      }
      for (let i = 0; i < 100; i++) {
        assert(ex[1][i] === i + 10);
      }
    });
  });
  /**
   *
   */
  describe('#intercalate', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).intercalate([1]) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).intercalate([1]);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === (i % 2 === 0 ? i / 2 : 1));
      }
    });
  });
  /**
   *
   */
  describe('#intersperse', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).intersperse(1) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).intersperse(1);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === (i % 2 === 0 ? i / 2 : 1));
      }
    });
  });
  /**
   *
   */
  describe('#group', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(new Endless(x => x).group(3) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = new Endless(x => x).group(3);
      for (let i = 0; i < 100; i++) {
        const el = ex[i];
        assert(el.length === 3);
        assert(el[0] === i * 3);
        assert(el[1] === i * 3 + 1);
        assert(el[2] === i * 3 + 2);
      }
    });
  });
  /**
   *
   */
  describe('#partition', () => {
    /**
     *
     */
    it('should return an Array', () => {
      /**
       *
       */
      assert(new Endless(x => x).partition(x => x % 2 === 0) instanceof Array);
    });
    /**
     *
     */
    it('should correctly output an Array', () => {
      const ex = new Endless(x => x).partition(x => x % 2 === 0);

      for (let i = 0; i < 10; i++) {
        assert(ex[0][i] === i * 2);
      }
      for (let i = 0; i < 100; i++) {
        assert(ex[1][i] === i * 2 + 1);
      }
    });
  });
  /**
   *
   */
  describe('#cycle', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(Endless.cycle([1, 2, 3, 4]) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = Endless.cycle([1, 2, 3, 4]);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === ((i % 4) + 1));
      }
    });
  });
  /**
   *
   */
  describe('#repeat', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(Endless.repeat(1, 2, 3, 4) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const ex = Endless.repeat(1, 2, 3, 4);
      for (let i = 0; i < 100; i++) {
        assert(ex[i] === ((i % 4) + 1));
      }
    });
  });
  /**
   *
   */
  describe('#zip', () => {
    /**
     *
     */
    it('should return an Endless', () => {
      /**
       *
       */
      assert(Endless.zip(new Endless(x => x), new Endless(x => x + 1)) instanceof Endless);
    });
    /**
     *
     */
    it('should correctly output the Endless', () => {
      const a = new Endless(x => x);
      const b = new Endless(x => x + 1);
      const c = new Endless(x => x + 2);
      const ex = Endless.zip(a, b, c);
      for (let i = 0; i < 100; i++) {
        const el = ex[i];
        assert(el.length === 3);
        assert(el[0] === i);
        assert(el[1] === i + 1);
        assert(el[2] === i + 2);
      }
    });
  });
});
