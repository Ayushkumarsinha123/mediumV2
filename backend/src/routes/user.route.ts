import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign} from "hono/jwt";
import { signupInput, signinInput } from "@harshit2005/medium-v2";

const userRouter = new Hono<{
  Bindings : {
    DATABASE_URL :string,
    JWT_SECRET : string,
  }
}>()


userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
     const { success } = signupInput.safeParse(body);
          if(!success){
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
  } catch (e:any) {
    console.error("Signup Error:", e);
    if (e.code === 'P2002') {
    return c.json({ error: "Username already taken." }, 409);
  }
    
    c.status(403);
    return c.json({ 
      error: "error while signing up",
      details: e instanceof Error ? e.message : e 
    });
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success) {
      c.status(411);
            return c.json({message:"inputs not correct"});
    } 

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
      id : user.id
    });
  } catch (e:any) {
    console.error("Signin Error:", e);
    
    c.status(403);
    return c.json({ 
      error: "error while signing in",
      details: e instanceof Error ? e.message : e 
    });
  }
} )

userRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        // NEVER expose password
      },
    });

    return c.json(users);
  } catch (e: any) {
    return c.json({
      error: "Error fetching users",
      details: e.message,
    }, 500);
  }
});

export default userRouter;