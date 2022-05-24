"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableComponent = exports.reorder = void 0;
var react_1 = __importStar(require("react"));
var draggable_module_css_1 = __importDefault(require("./draggable.module.css"));
var reorder = function (original, from, to) {
    var elemsCopy = original.flatMap(function (elem, i) {
        switch (i) {
            case to:
                return to - from > 0 ? [elem, original[from]] : [original[from], elem];
            case from:
                return [];
            default:
                return [elem];
        }
    });
    return elemsCopy;
};
exports.reorder = reorder;
var DraggableComponent = function (_a) {
    var children = _a.children, onPosChange = _a.onPosChange;
    var _b = (0, react_1.useState)([]), elems = _b[0], setElems = _b[1];
    var _c = (0, react_1.useState)({ to: null, from: null }), indexes = _c[0], setIndexes = _c[1];
    (0, react_1.useEffect)(function () {
        setElems(children);
    }, [children]);
    var insertElementBefore = (0, react_1.useCallback)(function () {
        if (indexes.from !== null && indexes.to !== null && indexes.from !== indexes.to) {
            var from = indexes.from, to = indexes.to;
            setElems((0, exports.reorder)(elems, from, to));
            onPosChange &&
                ((to - from > 0) ? onPosChange(to, from) : onPosChange(from, to));
        }
        setIndexes({ to: null, from: null });
    }, [indexes, elems, onPosChange, setElems, setIndexes]);
    var dragStart = (0, react_1.useCallback)(function (idx) {
        if (idx !== indexes.from)
            setIndexes(function (state) { return (__assign(__assign({}, state), { from: idx })); });
    }, [setIndexes, indexes]);
    var dragEnter = (0, react_1.useCallback)(function (idx) {
        if (idx !== indexes.to)
            setIndexes(function (state) { return (__assign(__assign({}, state), { to: idx })); });
    }, [setIndexes, indexes]);
    var dragDrop = (0, react_1.useCallback)(function () {
        insertElementBefore();
    }, [insertElementBefore]);
    return react_1.default.createElement(react_1.default.Fragment, null, elems === null || elems === void 0 ? void 0 : elems.map(function (item, i) { return react_1.default.cloneElement(item, {
        key: "clone-".concat(i),
        draggable: true,
        onDragStart: function () { return dragStart(i); },
        onDragOver: function (e) { dragEnter(i); e.preventDefault(); },
        onDrop: function () { return dragDrop(); },
        className: "".concat(item.props.className, " ").concat(draggable_module_css_1.default.grabbable)
    }); }));
};
exports.DraggableComponent = DraggableComponent;
