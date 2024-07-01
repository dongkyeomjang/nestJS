import * as express from "express";
import catsRouter from './cats.route';

class Server {
    private static instance: Server;
    public app: express.Application;

    constructor() {
        this.app = express();
        this.setMiddlewares();
        this.setRoutes();
    }

    private setRoutes() {
        this.app.use(catsRouter);


        this.app.use((req, res, next) => {
            res.status(404).send({
                success: false,
                error: "NOT FOUND",
            });
        });
    }

    private setMiddlewares() {
        this.app.use((req, res, next) => {
            console.log(req.rawHeaders[1]);
            console.log("this is logging middleware");
            next();
        })

        //* json middleware
        this.app.use(express.json());
    }
    public static getInstance() : Server {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }

    public listen() {
        this.app.listen(8000, () => {
            console.log("server is on...");
        });
    }
}
function init() {
    const server = Server.getInstance();
    server.listen();
}

init();
