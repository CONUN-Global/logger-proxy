import { Router } from "express";
import { saveLogger } from "./service";


const esServiceRouter = Router();

esServiceRouter.post("/elastic", saveLogger)



const baseRoouter = Router()
baseRoouter.use("/log",  esServiceRouter);
export default baseRoouter;