import express, {Express} from "express";
import cors from "cors";
import bookRouter from "./routes/book.route";
import authRouter from "./routes/auth.route";
import reportRouter from "./routes/report.route";
import memberRouter from "./routes/member.route";
import transactionRouter from "./routes/transactions.route";

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
app.use("/books", bookRouter)
app.use("/auth", authRouter)
app.use("/reports", reportRouter)
app.use("/members", memberRouter)
app.use("/transactions", transactionRouter)

export default app;
