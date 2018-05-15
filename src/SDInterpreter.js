"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var SDBar_1 = require("./SDBar");
var SDNote_1 = require("./SDNote");
var SDAnnotation_1 = require("./SDAnnotation");
var SDSymbols_1 = require("./SDSymbols");
var SDInterpreter = /** @class */ (function () {
    function SDInterpreter(str) {
        this.sdString = str;
        this.stack = [];
        this.head = new SDBar_1.SDBar();
        this.current = this.head;
    }
    SDInterpreter.prototype.add = function (item) {
        var canBeJoined = this.current && item && SDSymbols_1.default.isNote(this.current.getValue()) && SDSymbols_1.default.isMatra(item.getValue());
        return canBeJoined ? this.merge(this.current, item) : this.addAsNewNode(item);
    };
    SDInterpreter.prototype.merge = function (into, item) {
        into.addMatra(item.getValue());
        this.stack = item ? [] : this.stack;
    };
    SDInterpreter.prototype.addAsNewNode = function (item) {
        item && this.current.setNext(item);
        item && item.setPrevious(this.current);
        this.current = item ? item : this.current;
        this.stack = item ? [] : this.stack;
    };
    SDInterpreter.prototype.parse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sdString, i, char, newHead;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sdString = this.sdString;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < sdString.length)) return [3 /*break*/, 4];
                        char = sdString.charAt(i);
                        return [4 /*yield*/, this.processChar(char)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        newHead = this.head.next();
                        newHead.setPrevious(null);
                        this.head = newHead;
                        return [2 /*return*/, this.head];
                }
            });
        });
    };
    SDInterpreter.prototype.processChar = function (char) {
        return __awaiter(this, void 0, void 0, function () {
            var node, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.stack.push(char);
                        return [4 /*yield*/, this.processStackForNote()];
                    case 1:
                        node = _c.sent();
                        _a = node;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processStackForNoteAnnotation()];
                    case 2:
                        _a = (_c.sent());
                        _c.label = 3;
                    case 3:
                        node = _a;
                        _b = node;
                        if (_b) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.processStackForGroupAnnotation()];
                    case 4:
                        _b = (_c.sent());
                        _c.label = 5;
                    case 5:
                        node = _b;
                        this.add(node);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    SDInterpreter.prototype.processStackForNote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pop, isNote, node;
            return __generator(this, function (_a) {
                pop = this.stack.pop();
                pop && this.stack.push(pop);
                isNote = SDSymbols_1.default.isNote(pop) || SDSymbols_1.default.isMatra(pop);
                node = isNote ? new SDNote_1.default(this.stack.join('')) : null;
                return [2 /*return*/, node];
            });
        });
    };
    SDInterpreter.prototype.processStackForNoteAnnotation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //if it is a note annotation,we have to leave the stack as it is
                // if its not, then it will be processed in next
                return [2 /*return*/, null];
            });
        });
    };
    SDInterpreter.prototype.processStackForGroupAnnotation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pop, isGrpAnn, node;
            return __generator(this, function (_a) {
                pop = this.stack.pop();
                pop && this.stack.push(pop);
                isGrpAnn = SDSymbols_1.default.isGroupAnnotation(pop);
                node = isGrpAnn ? new SDAnnotation_1.default(pop) : null;
                return [2 /*return*/, node];
            });
        });
    };
    return SDInterpreter;
}());
exports.default = SDInterpreter;
