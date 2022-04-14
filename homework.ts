interface Entity {
  readonly id?: string;
  readonly name?: string;
  readonly age?: number;
  readonly ethnicity?: string;
}

// Given following interface do the following operations:
// Remove - 1. readonly, 2. optional type and 3. id property & ethnicity property
// do this as 3 separate mutation types
// create a mapper function that maps response type of all keys to boolean

// expected:
// type newType = A<B<C<D<Type>>>>
/*
  {
    name: boolean;
    age: boolean;
  }
 */
type D<T> = {
  -readonly [P in keyof T]: T[P];
};
type C<T> = {
  [P in keyof T]-?: T[P];
};

type B<T> = {
  [P in keyof T as P extends "id" | "ethnicity" ? never : P]: T[P];
};
type A<T> = {
  [P in keyof T]: boolean;
};

type newType = A<B<C<D<Entity>>>>;

// EX 2 ------------------------------------------------
/*
/*HW
1. Create an interface Id that has property id of type number
2. Create an interface Name that has property name of type string
3. Create a new type IdOrName and pass in a generic type
* If passed in type extends Id, IdOrName - will be of type number
* Else If passed in type extends Name, IdOrName - will be of type string
* Else passed in type extends Anything Else, IdOrName - will be of type {age: boolean}
 */
interface Id {
  id: number;
}

interface Name {
  name: string;
}

type idOrName<T> = T extends Id
  ? number
  : T extends Name
  ? string
  : { age: boolean };

// EX 3 ------------------------------------------------
/*
 Write a detailed explanation with images || steps || words how ex 5 withLet function works and why did we get the expected result
 */
// Var is binded to the function scope, so when we get out of the for loop we can still access it.
// So when the for finishes and the call stack is empty, every function from the setTimeout() gets executed 1 by 1, and when it tries to console.log i
// it searches for i in it block scope in which it was executed, and because it doesn't find any, searches in the next scope, which is the function scope
// and gets the last value of i.

// Now when we use let, the value is binded to it block scope, so on every loop there is a new i per scope, with it distinct i value.
// So when for finishes, every function from the setTimeout() gets executed its searches for i in its local scope and it finds the distinct i from each
// iteration. So its prints a different i every time.
/*
with var we have 

{
    i: value  -> then the for loop creates 10 scopes, and mutates the i after every iteration,
  { first scope 
    i++
  }
  { second scope 
    i++
  } 
  etc..
}

with let we have 
{
  let i = 0;
  { first iteration
    let i = 0;
    if(condition) {
      console.log(i)
      setTimeout(() => console.log(i))
    }
  }
  { second interation
    let i = 0  // copies the value from the last block scope.
    i++; // 1
    if(condition) {
      console.log(i)
      setTimeout(() => console.log(i))
    }
  }
  { third iteration
    let i = 1 // copies the value from the last iteration.
    i++; // 2
    if(condition) {
      console.log(i)
      setTimeout(() => console.log(i))
    }
  }
} etc..
Create a new i for every new scope, so each setTimeout() has its own i binded to its scope.




// EX 4 ------------------------------------------------
//Having two interfaces:
/*
Replicate an API response that will have the following structure:
{
  data: {
    [any keys of string type]: Generic type;
    pagination: number;
  }
  errors: string[]
}
*/

interface User {
  id: number;
  name: string;
  age: number;
}
interface Car {
  id: number;
  color: string;
  numberOfDoors: number;
}

// ----------------------------------------------------------------------
type ApiResponse1<T> = {
  data: {
    [key: string]: T | number;
    pagination: number;
  };
  errors: string[];
};
let b: ApiResponse1<Car> = {
  data: {
    someData: {
      id: 1,
      color: "red",
      numberOfDoors: 3,
    },
    pagination: 100,
  },
  errors: ["haha", "hehe"],
};

// EX 5 ------------------------------
// Write a class decorator, method decorator and parameter decorator functions for any Class the logic inside each decorator is up to you e.g.:

function ClassDecorator(C : Function) {
  console.log("Class Decorator", C);
}

function PropertyDecorator(target: any, key: string ): void {
  console.log("Am declarat proprietatea:", key);
}

const obj = {};

function check(number: number): any {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
      args.forEach((el, idx) => {
        const validator = obj[key][idx];
        if (validator(el, number)) {
          console.log("Param is bigger than", number);
        } else {
          throw Error(
            "Param is smaller than the number passed into the checker"
          );
        }
      });
      return original.call(this, ...args);
    };
    return descriptor;
  };
}

function isBigger(target: any, key, index) {
  obj[key] = [];
  obj[key][index] = (x, y) => {
    return x > y;
  };
}

@ClassDecorator
class SomeClass {
  @PropertyDecorator
  property1: string;

  @check(100)
  addNumberTo50(@isBigger someParameter: number) {
    return 50 + someParameter;
  }
}

let a = new SomeClass();
a.addNumberTo50(130);
