/**
 * アロー関数は宣言時のレキシカルスコープをthisとしてbindする
 * ネイティブ関数は実行時の呼び出し場所のレキシカルスコープをthisとしてbindする
 */
// ネイティブ関数
function nativeFunc() {
  console.log(this);
}
/**
 * thisはグローバルオブジェクト
 */
console.log("ネイティブ関数");
nativeFunc();

// アロー関数
const arrowFunc = () => {
  console.log(this);
};
/**
 * thisはグローバルオブジェクト
 */
console.log("アロー関数");
arrowFunc();

/**
 * オブジェクト
 */
const testObj = {
  testNativeMethod: function () {
    console.log(this);
    // const test = () => {
    //   console.log(this);
    // };
    // test();
    // const test2 = function () {
    //   console.log(this);
    // };
    // test2();
  },
  testArrowMethod: () => {
    console.log(this);
  },
};
/**
 * thisはtestObj
 */
console.log("オブジェクト ネイティブ関数メソッド");
testObj.testNativeMethod();
/**
 * thisはグローバルオブジェクト
 */
console.log("オブジェクト アロー関数メソッド");
testObj.testArrowMethod();

const testObj2 = {
  testNativeMethod: function () {
    console.log(this);
    function show() {
      console.log(this);
    }
    show();
  },
};
/**
 * メソッドはオブジェクトを指すが、その内部の関数で定義した関数はグローバルオブジェクトを指す
 */
testObj2.testNativeMethod();

/**
 * コンストラクタ
 */
function constructor(value) {
  this.value = value;
  console.log(this);
  this.native = function () {
    console.log(this);
  };
  this.arrow = () => {
    console.log(this);
  };
}
const instance = new constructor(1);
/**
 * thisはインスタンス
 */
console.log("インスタンスネイティブ");
instance.native();
/**
 * thisはインスタンス
 */
console.log("インスタンスアロー");
instance.arrow();

class Class {
  constructor() {
    console.log("class constructor");
    console.log(this);
  }

  nativeFunc() {
    console.log(this);
    const slef = this;
    console.log(self);
  }

  arrowFunc = () => {
    console.log(this);
    const slef = this;
    console.log(self);
  };

  axiosFunc() {
    console.log(this);
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      /**
       * 関数が実行部分がグローバル空間
       * thisはグローバルオブジェクト
       */
      .then(callback)
      /**
       * アロー関数の場合、宣言した瞬間のレキシカルスコープが暗黙的にbindされる
       * ここでは宣言時のレキシカルスコープはclass.axiosFun()で呼び出しているため
       * classとなる。thisはClassインスタンスÏ
       */
      .then((data) => {
        console.log("ラムダ アロー関数");
        console.log(this);
      })
      .then(function (data) {
        console.log("ラムダ ネイティブ関数");
        console.log(this);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
function callback(data) {
  console.log("ネイティブ");
  console.log(this);
}
const testClass = new Class();
console.log("Class ネイティブ関数");
testClass.nativeFunc();
console.log("Class アロー関数");
testClass.arrowFunc();
testClass.axiosFunc();

/**
 * 公式より拝借
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes#boxing_with_prototype_and_static_methods
 */
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

/**
 * class内は全てのメソッドがStrictモードでの実装になるため、関数呼び出しの際にも
 * thisがグローバルオブジェクトになるのではなくundefinedのエラーになる
 */
let obj = new Animal();
console.log(obj.speak()); // Animal {}
let speak = obj.speak;
conosole.log(speak()); // undefined

Animal.eat(); // class Animal
let eat = Animal.eat;
eat(); // undefined
