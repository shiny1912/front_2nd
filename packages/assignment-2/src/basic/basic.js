export function shallowEquals(target1, target2) {
  //Array일 경우
  if (Array.isArray(target1) && Array.isArray(target2)) {
    if (target1.length !== target2.length) {
      return false;
    }
    for (let i = 0; i < target1.length; i++) {
      if (target1[i] !== target2[i]) {
        return false;
      }
    }
    return true;
  }
  if (target1 === null || target2 === null || target1 === undefined || target2 === undefined) {
    return target1 === target2;
  }
  if (Object.getPrototypeOf(target1) === Object.prototype && Object.getPrototypeOf(target2) === Object.prototype) {
    const target1_entries = Object.entries(target1);
    const target2_entries = Object.entries(target2);
    if (target1_entries.length !== target2_entries.length) {
      return false;
    }
    for (let i = 0; i < target1_entries.length; i++) {
      // key
      if (target1_entries[i][0] !== target2_entries[i][0]) {
        return false;
      }
      // value
      if (target1_entries[i][1] !== target2_entries[i][1]) {
        return false;
      }
    }
    return true;
  }
  return target1 === target2;
}

export function deepEquals(target1, target2) {
  //Array일 경우
  if (Array.isArray(target1) && Array.isArray(target2)) {
    if (target1.length !== target2.length) {
      return false;
    }
    return target1.every((x, i) => deepEquals(x, target2[i]));
  }
  if (target1 === null || target2 === null || target1 === undefined || target2 === undefined) {
    return target1 === target2;
  }
  if (Object.getPrototypeOf(target1) === Object.prototype && Object.getPrototypeOf(target2) === Object.prototype) {
    const target1_entries = Object.entries(target1);
    const target2_entries = Object.entries(target2);
    const target1_keys = Object.keys(target1);
    const target2_keys = Object.keys(target2);
    if (target1_entries.length !== target2_entries.length) {
      return false;
    }
    for (const key of target1_keys) {
      if (!target2_keys.includes(key) || !deepEquals(target1[key], target2[key])) {
        return false;
      }
    }
    return true;
  }
  return target1 === target2;
}


export function createNumber1(n) {
  return new Number(n);
}

export function createNumber2(n) {
  return new String(n);
}

export function createNumber3(n) {
  let numObj = {
    value: n,
    // toString() {
    //   return `this is createNumber3 => ${this.value}`;
    // },
    toJSON() {
      return `this is createNumber3 => ${this.value}`;
    },
    toString() {
      return `${this.value}`;
    },
    valueOf() {
      return this.value;
    }
  };

  return numObj;
}

export class CustomNumber {
  static cache = {};

  constructor(value) {
    if (CustomNumber.cache[value]) {
      return CustomNumber.cache[value];
    } else {
      this.value = value;
      CustomNumber.cache[value] = this;
    }
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return `${this.value}`;
  }

  toJSON() {
    return this.toString();
  }

}

export function createUnenumerableObject(target) {
  let obj = {};

  for (let key in target) {
    Object.defineProperty(obj, key, {
      value: target[key],
      enumerable: false  // Making it non-enumerable
    });
  }

  return obj;
}

export function forEach(target, callback) {
  if (target.length !== undefined) {
    for (let i = 0; i < target.length; i++) {
      callback(target[i], i);
    }
  } else {
    let keys = Object.getOwnPropertyNames(target);
    keys.forEach(key => {
      callback(target[key], key);
    });
  }

}

export function map(target, callback) {
  if (target.length !== undefined) {
    let obj = [];
    for (let i = 0; i < target.length; i++) {
      obj.push(callback(target[i]));
    }
    return obj;
  } else {
    let obj = {};
    let keys = Object.getOwnPropertyNames(target);
    keys.forEach(key => {
      obj[key] = callback(target[key]);
    });
    return obj;
  }
}

export function filter(target, callback) {
  if (target.length !== undefined) {
    let obj = [];
    for (let i = 0; i < target.length; i++) {
      if (callback(target[i]) === true) {
        obj.push(target[i]);
      }
    }
    return obj;
  } else {
    let obj = {};
    let keys = Object.getOwnPropertyNames(target);
    keys.forEach(key => {
      if (callback(target[key])) {
        obj[key] = target[key];
      }
    });
    return obj;
  }
}


export function every(target, callback) {
  if (target.length !== undefined) {
    let objValue = true;
    for (let i = 0; i < target.length; i++) {
      if (callback(target[i]) === false) {
        objValue = false;
      }
    }
    return objValue;
  } else {
    let objValue = true;
    let keys = Object.getOwnPropertyNames(target);
    keys.forEach(key => {
      if (callback(target[key]) === false) {
        objValue = false;
      }
    });
    return objValue;
  }
}

export function some(target, callback) {
  if (target.length !== undefined) {
    let objValue = false;
    for (let i = 0; i < target.length; i++) {
      if (callback(target[i]) === true) {
        objValue = true;
      }
    }
    return objValue;
  } else {
    let objValue = false;
    let keys = Object.getOwnPropertyNames(target);
    keys.forEach(key => {
      if (callback(target[key]) === true) {
        objValue = true;
      }
    });
    return objValue;
  }
}



