# Sky.Class.js
This is a simple single (prototype) inheritance javascript framework with which you can dynamically generate classes at runtime.
# Usage
It's really simple to use, just add the Sky.Class.min.js file reference, and then use it like:<br />

```JavaScript
var cls = new Class(/*parentClass, mixins...*/);
var cls = Class(/*parentClass, mixins...*/);
var cls = Class.extend(/*parentClass, mixins...*/);
```

The above three class definitions are equivalent, it creates a class with a default ```initialize``` method.<br />

the ```initialize``` method works as the ```constructor``` when creating new instances of the class. If you provide a ```initialize``` method in the **mixin**, it will overwrite the default one. Multiple mixins are supported, in such a case, the properties (with same name) of the last mixin wins.<br />

A mixin can be either a function, in such case, only ```prototype``` **(functional)** properties are copied accordingly (except the ```prototype.initialize``` method as it works as the constructor, and parent constructor will be called automatically as described later); or a plain object, in such case, all the **(functional)** properties will be copied to the prototype of the generated class.<br />

A Class is a function, but a function is not sure a Class, and only a Class can be used as a parent Class when you defining new Classes, which means you can only sub-classing Classes. 

## Note of non-functional properties
*You should put all NON-FUNCTIONAL properties in the constructor directly, instead of putting them in the mixins/parent classes as properties, as this will cause the REFERENCE-PROPERTY-OVERWRITTEN problems between different class object instances sharing same prototype-chain.*

```JavaScript
var cls = new Class({a: 123}, {a: 456});
//undefined, refer to Note of non-functional properties section.
console.log(cls().a);
```

```JavaScript
// in order to add non-functional properties,
// we need to add non-functional properties to cunstructor
cls = new Class(
    { initialize: function () { this.a = 123; } },
    { initialize: function () { this.a = 456; } }
);
// 456, as the last initializer wins
console.log(new cls().a); 
```

When you create a sub class of a base class, and you initiated a new instance of the sub class, the framework will guarantee that all the initialize methods of parent classes will be called in such an order that the ```initialize``` method of the most top class will be called first.<br />

Please note that this mechanism only applies to the ```initialize``` method.<br />
```JavaScript
var Animal = new Class({
  initialize: function(options){
    this.age = options.age;
    this.weight = options.weight;
  },
  breath: function() {
    console.log("the Animal breath");
  },
  toString: function(){
    return "{age: '"+this.age+"', weight:'"+this.weight+"'}"
  }
});

var Person = new Class(Animal, { //or var Person = Class.extend(Animal, {
  initialize: function(options){
    this.name = options.name;
  },
  breath: function() {
    console.log("the Person breath");
  },
  toString: function(){
    return "{name: '"+this.name+"', age: '"+this.age+"', weight:'"+this.weight+"'}"
  }
});

var Student = new Class(Person, {
  initialize: function(options){
    this.studentNo = options.studentNo;
  },
  breath: function() {
    console.log("the Student breath");
  },
  goToSchool: function(){
    console.log("the Student go to school");
  },
  toString: function(){
    return "{name: '"+this.name+"', age: '"+this.age+"', weight:'"+this.weight+"', studentNo: '"+this.studentNo+"'}"
  }
});

var ao = new Animal({age: 12, weight: 34});
var po = new Person({age: 23, weight: 67, name: "full name"});
var so = new Student({age: 34, weight: 48, name: "the name", studentNo: "23456789"});

//You can also use following statements for initializing (the new keyword is optional):
//var ao = Animal({age: 12, weight: 34});
//var po = Person({age: 23, weight: 67, name: "full name"});
//var so = Student({age: 34, weight: 48, name: "the name", studentNo: "23456789"});

ao.breath(); //the Animal breath
po.breath(); //the Person breath
so.breath(); //the Student breath
so.goToSchool(); //the Student go to school

//{age: '12', weight:'34'}
console.log(ao.toString());

//{name: 'full name', age: '23', weight:'67'}
console.log(po.toString());

//{name: 'the name', age: '34', weight:'48', studentNo: '23456789'}
console.log(so.toString());

console.log(so instanceof Student); //true
console.log(so instanceof Person); //true
console.log(so instanceof Animal); //true

console.log(po instanceof Student); //false
console.log(ao instanceof Person); //false
```

```JavaScript
var C1 = Class({ initialize: function () { console.log("C1 Initializer"); } });
var C2 = Class(C1, { initialize: function () { console.log("C2 Initializer"); } });
var C3 = Class(C2, { initialize: function () { console.log("C3 Initializer"); } });
var C4 = Class(C3, { initialize: function () { console.log("C4 Initializer"); } });
//Output:
//  C1 Initializer
//  C2 Initializer
//  C3 Initializer
//  C4 Initializer
var insC4 = new C4();
```

# Browser Support
IE9+ and all other modern browsers

# License
MIT Licensed
