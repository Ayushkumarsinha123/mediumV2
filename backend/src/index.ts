import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign,verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('/api/v1/blog/*', async (c, next ) => {
    const header = c.req.header("authorization") || "";

    if (!header || !header.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ error: "Unauthorized: Missing or invalid header" });
  }
  
    // Bearer Token => ['bearer', 'token']
    const token = header.split(' ')[1];
  try {
    // verify the token 
    const payload = await verify(token, c.env.JWT_SECRET);

    if (payload && payload.id) {
      // @ts-ignore 
      c.set("userId", payload.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized: Invalid payload" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unauthorized: Token verification failed" });
  }
})

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const user = await prisma.user.create({
      data: {
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

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
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
