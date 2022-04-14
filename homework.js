var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var b = {
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
function ClassDecorator(C) {
    console.log("Class Decorator", C);
}
function PropertyDecorator(target, key) {
    console.log("Am declarat proprietatea:", key);
}
var obj = {};
function check(number) {
    return function (target, key, descriptor) {
        var original = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args.forEach(function (el, idx) {
                var validator = obj[key][idx];
                if (validator(el, number)) {
                    console.log("Param is bigger than", number);
                }
                else {
                    throw Error("Param is smaller than the number passed into the checker");
                }
            });
            return original.call.apply(original, __spreadArray([this], args, false));
        };
        return descriptor;
    };
}
function isBigger(target, key, index) {
    obj[key] = [];
    obj[key][index] = function (x, y) {
        return x > y;
    };
}
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.prototype.addNumberTo50 = function (someParameter) {
        return 50 + someParameter;
    };
    __decorate([
        PropertyDecorator,
        __metadata("design:type", String)
    ], SomeClass.prototype, "property1", void 0);
    __decorate([
        check(100),
        __param(0, isBigger),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], SomeClass.prototype, "addNumberTo50", null);
    SomeClass = __decorate([
        ClassDecorator
    ], SomeClass);
    return SomeClass;
}());
var a = new SomeClass();
a.addNumberTo50(130);
