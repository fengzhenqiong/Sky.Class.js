var Class = require("./Sky.Class.js");

var cls = new Class({ a: 123 }, { a: 456 });
console.log(cls().a); // undefined, as non-functional properties will not be merged to prototypes

// in order to add non-functional properties, we need to add non-functional properties to cunstructor
cls = new Class(
    {
        initialize: function () {
            this.a = 123;
        }
    },
    {
        initialize: function () {
            this.a = 456;
        }
    }
);
console.log(new cls().a); // 456

var Animal = new Class({
    initialize: function (options) {
        this.age = options.age;
        this.weight = options.weight;
    },
    breath: function () {
        console.log("the Animal breath");
    },
    toString: function () {
        return "{age: '" + this.age + "', weight:'" + this.weight + "'}"
    }
});

var Person = new Class(Animal, { //or var Person = Class.extend(Animal, {
    initialize: function (options) {
        this.name = options.name;
    },
    breath: function () {
        console.log("the Person breath");
    },
    toString: function () {
        return "{name: '" + this.name + "', age: '" + this.age + "', weight:'" + this.weight + "'}"
    }
});

var Student = new Class(Person, {
    initialize: function (options) {
        this.studentNo = options.studentNo;
    },
    breath: function () {
        console.log("the Student breath");
    },
    goToSchool: function () {
        console.log("the Student go to school");
    },
    toString: function () {
        return `{name: ${this.name}, age: ${this.age}, weight: ${this.weight}, studentNo: ${this.studentNo}}`;
    }
});

var ao = new Animal({ age: 12, weight: 34 });
var po = new Person({ age: 23, weight: 67, name: "full name" });
var so = new Student({ age: 34, weight: 48, name: "the name", studentNo: "23456789" });

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