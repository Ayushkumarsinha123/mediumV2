import { Hono } from "hono";
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// cors
app.use("/*", cors());
//Routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;
