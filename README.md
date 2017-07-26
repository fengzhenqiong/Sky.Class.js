# Sky.Class.js
This is a simple single inheritance javascript framework
# Usage
It's really simple to use it, just add the Sky.Class.js file reference, and then use it like:<br />

var cls = new Class();<br />
var cls = Class.extend();<br />

The above two class definition are equivalent, it creates a class with a default initialize method.<br />

the initialize method works as the initializer when creating new instances of the class. if you provide a initialize method in the mixin, it will overwrite the default one.<br />

When you create d sub class of a base class (only functions are regarded as classes), and you initiated a new instance of the sub class, the framework will guarantee that all the initialize methods of parent classes will be called in such an order that the method of the most top class will be called first.<br />

Please note that this mechanism only applies to the initialize method.<br />
```JavaScript
var Animal = new Class({
  age: "",
  weight: 0,
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
  name: "",
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
  studentNo: "",
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
```

```JavaScript
var cls = new Class(parent, mixins);
var cls = Class(parent, mixins);
var cls = Class.extend(parent, mixins);
//The above three class definition are equivalent.
```

if parent is a function, it will be regarded as the parent class the the new cls generated, or else it will be regarded as a mixin.

# License
MIT Licensed
