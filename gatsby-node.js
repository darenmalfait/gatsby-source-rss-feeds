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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceNodes = void 0;
var crypto_1 = __importDefault(require("crypto"));
var rss_parser_1 = __importDefault(require("rss-parser"));
var omitBy_1 = __importDefault(require("lodash/omitBy"));
var normalize = function (item) {
    var namespaceMatched = Object.keys(item).filter(function (e) { return e.match(/:/); });
    if (namespaceMatched.length === 0) {
        return item;
    }
    var namespaced = {};
    namespaceMatched.forEach(function (key) {
        var _a = __read(key.split(":"), 2), namespace = _a[0], childKey = _a[1];
        if (!namespaced[namespace]) {
            namespaced[namespace] = {};
        }
        namespaced[namespace][childKey] = item[key];
    });
    return __assign(__assign({}, omitBy_1.default(item, function (_, key) { return key.match(/:/); })), namespaced);
};
var invalidkeys = ["$", "_"];
var clearInvalid = function (obj) {
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === "object") {
            var isInvalid = Object.keys(obj[key]).filter(function (value) {
                return invalidkeys.includes(value);
            }).length;
            if (isInvalid) {
                return (obj[key] = "");
            }
            clearInvalid(obj[key]);
        }
        return obj[key];
    });
};
var createContentDigest = function (obj) {
    return crypto_1.default.createHash("md5").update(JSON.stringify(obj)).digest("hex");
};
var sourceNodes = function (_a, _b) {
    var actions = _a.actions, createNodeId = _a.createNodeId;
    var url = _b.url, _c = _b.name, name = _c === void 0 ? "blog" : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var createNode, parser, feed, items;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!url) {
                        throw new Error("url is required.");
                    }
                    if (!name) {
                        throw new Error("name is required.");
                    }
                    createNode = actions.createNode;
                    parser = new rss_parser_1.default();
                    return [4 /*yield*/, parser.parseURL(url)];
                case 1:
                    feed = _d.sent();
                    items = feed.items;
                    items.forEach(function (item) {
                        var normalizedItem = normalize(item);
                        clearInvalid(normalizedItem);
                        var guid = item.guid, link = item.link;
                        var nodeId = createNodeId(guid || link);
                        createNode(__assign(__assign({}, normalizedItem), { id: nodeId, parent: null, children: [], internal: {
                                contentDigest: createContentDigest(item),
                                type: "Feed" + name,
                            } }));
                    });
                    return [2 /*return*/];
            }
        });
    });
};
exports.sourceNodes = sourceNodes;
//# sourceMappingURL=gatsby-node.js.map