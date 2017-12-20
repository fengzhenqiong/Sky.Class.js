//A Simple JavaScript Single Inheritance Framework
//As for IE, only IE9(inclusive)+ versions are supported by this library
//@Author: Sky Feng(im.sky@foxmail.com), MIT Licensed.
//      var derived = new Class(/*parentClass, mixins...*/);
//      var derived = Class(/*parentClass, mixins...*/);
//      var derived = Class.extend(/*parentClass, mixins...*/);
(function (name, global, factory) {
    if (typeof define === "function" && define.amd) define(factory);
    else if (typeof module === "object") module.exports = factory();
    else global[name] = factory();
})("Class", this, function () {
    function Class(/*parentClass, mixins...*/) {
        return Class.extend.apply(Class, arguments);
    }
    var mergeSingleProperty = function (target, propName, source) {
        var descriptor = Object.getOwnPropertyDescriptor(source, propName);
        if (descriptor && descriptor.enumerable) {
            descriptor.configurable = descriptor.writable = true;
            Object.defineProperty(target, propName, descriptor);
        }
    };
    var mergeSourceProperties = function privateMerge(derived, mixin) {
        var mixinIsFunction = typeof mixin === "function";
        var protoProps = mixinIsFunction ? mixin.prototype : (mixin || {});
        Object.getOwnPropertyNames(protoProps).forEach(function (propName) {
            if (propName == "initialize" && mixinIsFunction) return true;
            mergeSingleProperty(derived.prototype, propName, protoProps);
        });
    };
    var runParentInitializers = function (thisInstance, thisClass, args) {
        var allParentClasses = [], thisParentClass = thisClass.parent;
        for (; thisParentClass; thisParentClass = thisParentClass.parent)
            allParentClasses.unshift(thisParentClass);
        allParentClasses.forEach(function (thisParentClass, index) {
            thisParentClass.prototype.initialize.apply(thisInstance, args);
        });
    };
    var defaultClassInitializer = function defaultClassInitializer() { };
    Class.extend = function (parentClass/*, mixin...*/) {
        var childClass = function childClassConstructor() {
            var childInstance = Object.create(childClass.prototype);
            runParentInitializers(childInstance, childClass, arguments);
            childClass.prototype.initialize.apply(childInstance, arguments);
            return Object.freeze(childInstance);
        };
        if (typeof parentClass === "function") {
            childClass.prototype = Object.create(parentClass.prototype);
            childClass.parent = Object.freeze(parentClass/*immutable*/);
        }
        childClass.prototype.initialize = defaultClassInitializer;
        for (var dpdtIndex = 0; dpdtIndex < arguments.length; dpdtIndex++)
            mergeSourceProperties(childClass, arguments[dpdtIndex]);

        return childClass = Object.freeze(childClass);
    };
    return Object.freeze(Class/*immutable*/);
});
