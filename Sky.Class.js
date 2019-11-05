﻿//A Simple JavaScript Single (prototype)Inheritance Framework
//As for IE, only IE9(inclusive)+ versions are supported by this library
//@Author: Sky Feng(im.sky@foxmail.com), MIT Licensed.
//      var derived = new Class(/*parentClass, mixins...*/);
//      var derived = Class(/*parentClass, mixins...*/);
//      var derived = Class.extend(/*parentClass, mixins...*/);
(function (name, global, factory) {
    if (typeof define === "function" && define.amd) define(factory);
    else if (typeof module === "object") module.exports = factory();
    //uncomment this line to make this library NOT RE-IMPORTABLE
    //else if (global[name]) throw new Error("Class already exists!");
    else global[name] = global[name] || factory(); //RE-IMPORTABLE
})("Class", this, function () {
    function Class(/*parentClass, mixins...*/) {
        return Class.extend.apply(Class, arguments);
    }
    Class.prototype.__proto__ = Function.prototype; //instanceof
    var mergeProperty = function (target, propName, source) {
        var descriptor = Object.getOwnPropertyDescriptor(source, propName);
        if (descriptor && descriptor.enumerable) {
            descriptor.configurable = descriptor.writable = true;
            Object.defineProperty(target, propName, descriptor);
        }
    };
    var mergeProperties = function privateMerge(derived, mixin, _flags) {
        var mixinIsFunction = typeof mixin === "function"; // functional
        var protoProps = (mixinIsFunction ? mixin.prototype : mixin) || {};
        Object.getOwnPropertyNames(protoProps).forEach(function (pName) {
            if (pName === "initialize" && mixinIsFunction) return true;
            if (typeof protoProps[pName] !== "function") return true;
            if (Object.getOwnPropertyDescriptor(_flags, pName)) return true;
            mergeProperty(derived.prototype, pName, protoProps);
            _flags[pName] = true; // use cache to improve performances
        });
    };
    var runParentInitializers = function (thisInstance, thisClass, args) {
        var allParentClasses = [], thisParentClass = thisClass.parent;
        for (; thisParentClass; thisParentClass = thisParentClass.parent)
            allParentClasses.push(thisParentClass);
        allParentClasses.reverse().forEach(function (thisParentClass, i) {
            thisParentClass.prototype.initialize.apply(thisInstance, args);
        });
    };
    var defaultClassInitializer = function defaultClassInitializer() { };
    Class.extend = function (parentClass /*, mixins...*/) {
        var childClass = function childClassConstructor() {
            var childInstance = Object.create(childClass.prototype);
            runParentInitializers(childInstance, childClass, arguments);
            childClass.prototype.initialize.apply(childInstance, arguments);
            return childInstance; /*CLASS OBJECTS NEED TO BE MUTABLE*/
        };
        if (typeof parentClass === "function") {
            if (!(parentClass instanceof Class)) /* NO MIXED USE */
                throw new Error("Only support Classes as parent Classes!");
            childClass.prototype = Object.create(parentClass.prototype);
            childClass.parent = Object.freeze(parentClass /*immutable*/);
        }
        childClass.prototype.initialize = defaultClassInitializer;
        for (var _flags = {}, idx = arguments.length - 1; idx >= 0; --idx)
            mergeProperties(childClass, arguments[idx], _flags);
        childClass.__proto__ = Object.freeze(Class.prototype); //Class
        return childClass = Object.freeze(childClass); /*immutable*/
    };
    return Object.freeze(Class /*immutable*/);
});
