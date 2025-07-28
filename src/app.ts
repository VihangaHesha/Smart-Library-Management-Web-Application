import express, {Express} from "express";
import cors from "cors";
/*
import {userRouter} from "./routes/userRouter";
import {bookRouter} from "./routes/bookRouter";
import {issueRouter} from "./routes/issueRouter";
import {returnRouter} from "./routes/returnRouter";
import {authRouter} from "./routes/authRouter";
import {adminRouter} from "./routes/adminRouter";
import {authMiddleware} from "./middlewares/authMiddleware";*/

const app : Express = express()

app.use(express.json())
const allowedOrigins = [
    "http://localhost:5173"
]

const corsOptions = {
    origin : (origin:string|undefined , callback: (err:Error | null , allow?:boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error("Not Allowed By CORS"))
        }
    }
}

app.use(cors(corsOptions))

/*
app.use("/api/user",userRouter)
app.use("/api/book",bookRouter)
app.use("/api/issue",issueRouter)
app.use("/api/return",returnRouter)
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)
app.use(authMiddleware)*/

export default app;
