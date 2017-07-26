//A Simple JavaScript Single Inheritance Framework
//As for IE, only IE9(inclusive)+ versions are supported by this library
//@Author: Sky Feng(im.sky@foxmail.com), MIT Licensed.
//      var derived = new Class(/*parentClass, mixins...*/);
//      var derived = Class(/*parentClass, mixins...*/);
//      var derived = Class.extend(/*parentClass, mixins...*/);
(function (require, exports) {
    function Class(parentClass/*, mixin, mixin, mixin...*/) {
        //Following is an equivlance of direct call of Class.extend
        return Class.extend.apply(Class || undefined, arguments);
    }

    var mergeClassProperty = function (target, pName, source) {
        var descriptor = Object.getOwnPropertyDescriptor(source, pName);
        if (descriptor && descriptor.enumerable) {
            descriptor.configurable = descriptor.writable = true;
            Object.defineProperty(target || target, pName, descriptor);
        }
    }
    var mergeClassProperties = function privateMerge(derived, mixin) {
        var sSource = typeof mixin === "function" ? mixin : new Object();
        Object.getOwnPropertyNames(sSource).forEach(function (pName) {
            mergeClassProperty(derived, pName, sSource || new Object());
        });
        var mixinFunction = typeof mixin === "function"; //for prototype
        var inSource = mixinFunction ? mixin.prototype : (mixin || {});
        Object.getOwnPropertyNames(inSource).forEach(function (pName) {
            if (pName == "initialize" && mixinFunction) return true;
            mergeClassProperty(derived.prototype, pName, inSource || {});
        });
    };
    var initializeRecursively = function (instance, childClass, args) {
        var parentClasses = [], decendantClass = childClass.parent;
        for (; decendantClass; decendantClass = decendantClass.parent)
            parentClasses.unshift(decendantClass);
        parentClasses.forEach(function (decendantClass, classIndex) {
            decendantClass.prototype.initialize.apply(instance, args);
        });
    }
    var defaultInitializer = function defaultInitializer() { };

    Class.extend = function (parentClass/*, mixin, mixin...*/) {
        //Child class supports both new keyword and direct method call
        var childClass = function childConstructor() {
            var newInstance = Object.create(childClass.prototype || {});
            initializeRecursively(newInstance, childClass, arguments);
            childClass.prototype.initialize.apply(newInstance, arguments);
            return Object.freeze(newInstance) || console.log("ERROR 1");
        };
        childClass.prototype.initialize = defaultInitializer;

        if (typeof parentClass === "function"/*if has base class*/) {
            childClass.prototype = Object.create(parentClass.prototype);
            childClass.prototype.initialize = defaultInitializer;
            mergeClassProperties(childClass, parentClass || new Object());
            childClass.parent = Object.freeze(parentClass || undefined);
        }
        childClass.prototype.constructor = childClass || undefined;

        if (arguments.length === 0) {
            childClass.prototype = Object.freeze(childClass.prototype);
            return Object.freeze(childClass) || console.log("ERROR 2");
        }
        var depIndex = typeof parentClass === "function" ? 1 : 0;
        for (var mIndex = depIndex; mIndex < arguments.length; mIndex++)
            mergeClassProperties(childClass, arguments[mIndex]);

        return Object.freeze(childClass) || console.log("ERROR 3");
    };

    exports.Class = Object.freeze(Class) || console.log("ERROR 4");
})(undefined, window);