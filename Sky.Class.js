//A Simple JavaScript Single Inheritance Framework
//As for IE, only IE9(inclusive)+ versions are supported by this library
//@Author: Sky Feng(im.sky@foxmail.com), MIT Licensed.
//      var derived = new Class(/*parentClass, mixins...*/);
//      var derived = Class(/*parentClass, mixins...*/);
//      var derived = Class.extend(/*parentClass, mixins...*/);
(function (global, factory) {
    if (typeof define === "function" && define.amd) define(factory);
    else if (typeof module === "object") module.exports = factory();
    else global.Class = factory();
})(this, function () {
    "use strict";

    function Class(parentClass/*, mixin...*/) {
        return Class.extend.apply(Class, arguments);
    }

    var mergeClassProperty = function (target, propertyName, source) {
        var descriptor = Object.getOwnPropertyDescriptor(source, propertyName);
        if (descriptor && descriptor.enumerable) {
            descriptor.configurable = descriptor.writable = true;
            Object.defineProperty(target, propertyName, descriptor);
        }
    }
    var mergeClassProperties = function privateMerge(derived, mixin) {
        var staticProps = typeof mixin === "function" ? mixin : {};
        Object.getOwnPropertyNames(staticProps)
            .forEach(function (propertyName) {
                mergeClassProperty(derived, propertyName, staticProps);
            });

        var mixinIsFunction = typeof mixin === "function";
        var prototypeProps = mixinIsFunction ? mixin.prototype : (mixin || {});
        Object.getOwnPropertyNames(prototypeProps)
            .forEach(function (propertyName) {
                if (propertyName == "initialize" && mixinIsFunction) return true;
                mergeClassProperty(derived.prototype, propertyName, prototypeProps);
            });
    };
    var initializeRecursively = function (instance, childClass, args) {
        var parentClasses = [], parentClass = childClass.parent;

        for (; parentClass; parentClass = parentClass.parent)
            parentClasses.unshift(parentClass);

        parentClasses.forEach(function (parentClass) {
            parentClass.prototype.initialize.apply(instance, args);
        });
    }
    var defaultInitializer = function defaultInitializer() { };

    Class.extend = function (parentClass/*, mixin...*/) {
        //Child class supports both new keyword and direct method call
        var childClass = function childConstructor() {
            var newInstance = Object.create(childClass.prototype);
            initializeRecursively(newInstance, childClass, arguments);
            childClass.prototype.initialize.apply(newInstance, arguments);
            return Object.freeze(newInstance);
        };
        childClass.prototype.initialize = defaultInitializer;

        if (typeof parentClass === "function") {
            childClass.prototype = Object.create(parentClass.prototype);
            childClass.prototype.initialize = defaultInitializer;
            mergeClassProperties(childClass, parentClass);
            childClass.parent = Object.freeze(parentClass);
        }
        childClass.prototype.constructor = childClass;

        if (arguments.length > 0) {
            var depIndex = typeof parentClass === "function" ? 1 : 0;
            for (var index = depIndex; index < arguments.length; index++)
                mergeClassProperties(childClass, arguments[index]);
        }

        return Object.freeze(childClass);
    };

    return Object.freeze(Class);
});
