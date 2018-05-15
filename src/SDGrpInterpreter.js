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
var SDAnnotation_1 = require("./SDAnnotation");
var AllOpStrategy_1 = require("./AllOpStrategy");
var SDBar_1 = require("./SDBar");
var SDGrpInterpreter = /** @class */ (function () {
    function SDGrpInterpreter() {
        this._stack = [];
        this.strategyMap = {};
        this.debugCount = {};
        this.add(new AllOpStrategy_1.NoteOpStrategy(), ">");
        this.add(new AllOpStrategy_1.TieNoteOpStrategy(), "-");
        this.add(new AllOpStrategy_1.BarOpStrategy(), "|");
        this.add(new AllOpStrategy_1.BarOpStrategy(), "।");
    }
    SDGrpInterpreter.prototype.add = function (strategy, forCh) {
        this.strategyMap[forCh] = strategy;
    };
    SDGrpInterpreter.prototype.parse = function (head) {
        return __awaiter(this, void 0, void 0, function () {
            var node, str;
            return __generator(this, function (_a) {
                this._head = head;
                node = head;
                str = "";
                while (node) {
                    this.process(node);
                    node = node.next();
                }
                return [2 /*return*/, this._head];
            });
        });
    };
    SDGrpInterpreter.prototype.isGroupCloseSymbol = function (ch) {
        return ['-', '`', '>', '|', '।'].indexOf(ch) >= 0;
    };
    SDGrpInterpreter.prototype.process = function (node) {
        var isGrpClosed = (node instanceof SDAnnotation_1.default) && this.isGroupCloseSymbol(node.getValue());
        isGrpClosed ? this.popStack(node) : this.push(node);
    };
    SDGrpInterpreter.prototype.isOperatorClosed = function (open, close) {
        var isGroupPair = (open && close) && ((close.getValue() === '-') ||
            ((close.getValue() === '|' || close.getValue() === '।') && open instanceof SDBar_1.SDBar) ||
            (close.getValue() === '>' && open.getValue() === '<') ||
            (close.getValue() === '|' && open.getValue() === '|') ||
            (close.getValue() === '|' && open.getValue() === '।') ||
            (close.getValue() === '।' && open.getValue() === '|') ||
            (close.getValue() === '`' && open.getValue() === '`') ||
            (close.getValue() === '।' && open.getValue() === '।'));
        return isGroupPair;
    };
    SDGrpInterpreter.prototype.popStack = function (grpCloseNode) {
        this.debugCount[grpCloseNode.getValue()] = this.debugCount[grpCloseNode.getValue()] === undefined ? 0 : this.debugCount[grpCloseNode.getValue()] + 1;
        var count = 0;
        var notes = [];
        var stacknode = this._stack.pop();
        while (!this.isOperatorClosed(stacknode, grpCloseNode) && this._stack.length) {
            notes.push(stacknode);
            stacknode = this._stack.pop();
            count++;
        }
        var alteredNodes = this.processNodesForGroup(notes.reverse(), grpCloseNode);
        this.addAlteredNotesBackToStack(alteredNodes, grpCloseNode);
    };
    SDGrpInterpreter.prototype.addAlteredNotesBackToStack = function (alteredNodes, grpCloseNode) {
        var isStackEmpty = (this._stack.length === 0);
        this._head = isStackEmpty && alteredNodes.length ? alteredNodes[0] : this._head;
        this._head.setPrevious(null);
        !isStackEmpty && alteredNodes.length && this._stack[this._stack.length - 1].setNext(alteredNodes[0]);
        !isStackEmpty && alteredNodes.length && alteredNodes[0].setPrevious(this._stack[this._stack.length - 1]);
        alteredNodes.length && alteredNodes[alteredNodes.length - 1].setNext(grpCloseNode.next());
        grpCloseNode.next() && alteredNodes.length && grpCloseNode.next().setPrevious(alteredNodes[alteredNodes.length - 1]);
        for (var _i = 0, alteredNodes_1 = alteredNodes; _i < alteredNodes_1.length; _i++) {
            var node = alteredNodes_1[_i];
            this._stack.push(node);
        }
    };
    SDGrpInterpreter.prototype.processNodesForGroup = function (nodes, grpNode) {
        var strtgy = this.strategyMap[grpNode.getValue()];
        nodes = strtgy ? strtgy.process(nodes, grpNode) : nodes;
        return nodes;
    };
    SDGrpInterpreter.prototype.push = function (node) {
        this._stack.push(node);
    };
    return SDGrpInterpreter;
}());
exports.default = SDGrpInterpreter;
