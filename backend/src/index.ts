import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign,verify } from "hono/jwt";
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";
import { signupInput } from "@harshit2005/medium-v2";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


//Routes

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
      if(success!){
        c.status(411);
        return c.json({message:"inputs not correct"})
      }
    const user = await prisma.user.create({
      data: {
        username : body.username,
        email: body.email,
        password: body.password,
      },
    });

    
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
      message: "user created",
    });
  } catch (e) {
    console.error("Signup Error:", e);
    
    c.status(403);
    return c.json({ 
      error: "error while signing up",
      details: e instanceof Error ? e.message : e 
    });
  }
});

app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password : body.password
      },
    });

    if (!user || user.password !== body.password) {
      c.status(403);
      return c.json({ error: "Invalid credentials" });
    }

    
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
      message: "logged in",
    });
  } catch (e) {
    console.error("Signin Error:", e);
    
    c.status(403);
    return c.json({ 
      error: "error while signing in",
      details: e instanceof Error ? e.message : e 
    });
  }
} )

export default app;
