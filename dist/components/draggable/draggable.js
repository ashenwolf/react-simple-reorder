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
exports.DraggableComponent = void 0;
var react_1 = __importStar(require("react"));
var draggable_module_css_1 = __importDefault(require("./draggable.module.css"));
var DraggableComponent = function (_a) {
    var children = _a.children, onPosChange = _a.onPosChange;
    var _b = (0, react_1.useState)([]), elems = _b[0], setElems = _b[1];
    var _c = (0, react_1.useState)({ to: null, from: null }), indexes = _c[0], setIndexes = _c[1];
    (0, react_1.useEffect)(function () {
        setElems(children);
    }, [children]);
    var insertElementBefore = (0, react_1.useCallback)(function () {
        if (indexes.from !== null && indexes.to !== null && indexes.from !== indexes.to) {
            var from_1 = indexes.from, to_1 = indexes.to;
            var elemsCopy = elems.flatMap(function (elem, i) {
                switch (i) {
                    case to_1:
                        return to_1 - from_1 > 0 ? [elem, elems[from_1]] : [elems[from_1], elem];
                    case from_1:
                        return [];
                    default:
                        return [elem];
                }
            });
            setElems(elemsCopy);
            onPosChange &&
                ((to_1 - from_1 > 0) ? onPosChange(to_1, from_1) : onPosChange(from_1, to_1));
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
