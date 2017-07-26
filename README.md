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

var Animal = new Class({<br />
  age: "",<br />
  weight: 0,<br />
  initialize: function(options){<br />
    this.age = options.age;<br />
    this.weight = options.weight;<br />
  },<br />
  breath: function() {<br />
    console.log("the Animal breath");<br />
  },<br />
  toString: function(){<br />
    return "{age: '"+this.age+"', weight:'"+this.weight+"'}"<br />
  }<br />
});<br />

var Person = new Class(Animal, {<br />
  name: "",<br />
  initialize: function(options){<br />
    this.name = options.name;<br />
  },<br />
  breath: function() {<br />
    console.log("the Person breath");<br />
  },<br />
  toString: function(){<br />
    return "{name: '"+this.name+"', age: '"+this.age+"', weight:'"+this.weight+"'}"<br />
  }<br />
});<br />

var Student = new Class(Person, {<br />
  studentNo: "",<br />
  initialize: function(options){<br />
    this.studentNo = options.studentNo;<br />
  },<br />
  breath: function() {<br />
    console.log("the Student breath");<br />
  },<br />
  goToSchool: function(){<br />
    console.log("the Student go to school");<br />
  },<br />
  toString: function(){<br />
    return "{name: '"+this.name+"', age: '"+this.age+"', weight:'"+this.weight+"', studentNo: '"+this.studentNo+"'}"<br />
  }<br />
});<br />
var ao = new Animal({age: 12, weight: 34});<br />
var po = new Person({age: 23, weight: 67, name: "full name"});<br />
var so = new Student({age: 34, weight: 48, name: "the name", studentNo: "23456789"});<br />
ao.breath(); //the Animal breath<br />
po.breath(); //the Person breath<br />
so.breath(); //the Student breath<br />
so.goToSchool(); //the Student go to school<br />
//{age: '12', weight:'34'}<br />
console.log(ao.toString());<br />
//{name: 'full name', age: '23', weight:'67'}<br />
console.log(po.toString());<br />
//{name: 'the name', age: '34', weight:'48', studentNo: '23456789'}<br />
console.log(so.toString());<br />

var cls = new Class(parent, mixins);<br />
var cls = Class(parent, mixins);<br />
var cls = Class.extend(parent, mixins);<br />

The above three class definition are equivalent.<br />

if parent is a function, it will be regarded as the parent class the the new cls generated, or else it will be regarded as a mixin.

# License
MIT Licensed
