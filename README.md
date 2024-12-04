
## Usage

```typescript
class Animal {
  constructor(name?: string) {
    if (name) this.name = name;
  }
  name: string = "animal";
}

function mixinRun<T extends Constructor<Animal>>(Cls: T) {
  class AnimalCanRun extends Cls {
    constructor(...arg: any[]) {
      super(...arg);
      // ...do something
    }
    run() {
      console.log("I can run");
    }
  }
  return AnimalCanRun;
}

function mixinFly<T extends Constructor<Animal>>(Cls: T) {
  class AnimalCanFly extends Cls {
    @Decorator() // you can add decorators
    fly() {
      console.log("I can fly");
    }
  }
  return AnimalCanFly;
}
function Decorator(): MethodDecorator {
  return function (target, propKey, descriptor) {
    console.log(`${target.constructor.name} ${String(propKey)}`); // AnimalCanFly fly
  };
}

class Unicorn extends multiExtends(Animal, [mixinRun, mixinFly]) {
  constructor() {
    super('unicorn')
  }
  // ...do something
}

const unicorn = new Unicorn();
console.log(unicorn.name); // unicorn
unicorn.run(); // I can run
unicorn.fly(); // I can fly
```