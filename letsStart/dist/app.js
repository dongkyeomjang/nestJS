"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_route_1 = require("./cats.route");
var Server = (function () {
    function Server() {
        this.app = express();
        this.setMiddlewares();
        this.setRoutes();
    }
    Server.prototype.setRoutes = function () {
        this.app.use(cats_route_1.default);
        this.app.use(function (req, res, next) {
            res.status(404).send({
                success: false,
                error: "NOT FOUND",
            });
        });
    };
    Server.prototype.setMiddlewares = function () {
        this.app.use(function (req, res, next) {
            console.log(req.rawHeaders[1]);
            console.log("this is logging middleware");
            next();
        });
        this.app.use(express.json());
    };
    Server.getInstance = function () {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    };
    Server.prototype.listen = function () {
        this.app.listen(8000, function () {
            console.log("server is on...");
        });
    };
    return Server;
}());
function init() {
    var server = Server.getInstance();
    server.listen();
}
init();
//# sourceMappingURL=app.js.map