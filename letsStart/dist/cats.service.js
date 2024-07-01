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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCat = exports.updateCatPartial = exports.updateCatAll = exports.CreateCat = exports.readCat = exports.readAllCats = void 0;
var cats_model_1 = require("./cats.model");
var readAllCats = function (res) {
    try {
        var cats = cats_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats,
            }
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};
exports.readAllCats = readAllCats;
var readCat = function (req, res) {
    try {
        var catId_1 = req.params.id;
        var cat = cats_model_1.Cat.find(function (cat) { return cat.id === catId_1; });
        if (!cat) {
            throw new Error("Cat not found");
        }
        res.status(200).send({
            success: true,
            data: {
                cat: cat,
            }
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            error: error.message,
        });
    }
};
exports.readCat = readCat;
var CreateCat = function (req, res) {
    try {
        var data = req.body;
        console.log(data);
        cats_model_1.Cat.push(data);
        res.status(200).send({
            success: true,
            data: {}
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};
exports.CreateCat = CreateCat;
var updateCatAll = function (req, res) {
    try {
        var result_1;
        var body_1 = req.body;
        var catId_2 = req.params.id;
        cats_model_1.Cat.forEach(function (cat) {
            if (cat.id === catId_2) {
                cat = body_1;
                result_1 = cat;
            }
        });
        if (!result_1) {
            throw new Error("Cat not found");
        }
        res.status(200).send({
            success: true,
            data: {
                result: result_1,
            }
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            error: error.message,
        });
    }
};
exports.updateCatAll = updateCatAll;
var updateCatPartial = function (req, res) {
    try {
        var result_2;
        var catId_3 = req.params.id;
        var body_2 = req.body;
        cats_model_1.Cat.forEach(function (cat) {
            if (cat.id === catId_3) {
                cat = __assign(__assign({}, cat), body_2);
                result_2 = cat;
            }
        });
        if (!result_2) {
            throw new Error('Cat not found');
        }
        res.status(200).send({
            success: true,
            data: { result: result_2 }
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            error: error.message,
        });
    }
};
exports.updateCatPartial = updateCatPartial;
var deleteCat = function (req, res) {
    try {
        var catId_4 = req.params.id;
        var newCats = cats_model_1.Cat.filter(function (cat) { return cat.id !== catId_4; });
        if (newCats.length === cats_model_1.Cat.length) {
            throw new Error('Cat not found');
        }
        res.status(200).send({
            success: true,
            data: newCats,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            error: error.message,
        });
    }
};
exports.deleteCat = deleteCat;
//# sourceMappingURL=cats.service.js.map