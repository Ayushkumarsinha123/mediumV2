import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { updateBlogInput,createBlogInput } from "@harshit2005/medium-v2";


const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  } , 
  Variables : {
    userId: string
  };
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    //@ts-ignore
    const user = await verify(authHeader, c.env.JWT_SECRET, "HS256");
    if(user) {
      c.set("userId", (user.id as string));
     await next();
    } else {
      c.status(403)
      return c.json({
        message : "you are not logged in"
      })
    }
})

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId")
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const {success} = createBlogInput.safeParse(body);
  if(!success) {
    c.status(411)
    return c.json({message : "input data is not correct"})
  }

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({ message: "post created!!", id: blog.id }, 200);
});

blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const {success} = updateBlogInput.safeParse(body);
  if(!success) {
    c.status(411)
    return c.json({message : "input data is not correct"})
  }

  const blog = await prisma.post.update({
    where : {
        id : body.id
    },
    data: {
      title: body.title,
      content: body.content
    },
  });

  return c.json({ message: "post updated!!", id: blog.id }, 200);
})

// we have to implement pagination later 
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany()

  return c.json({
    blogs
  })
})

export default blogRouter;

blogRouter.get('/:id', async (c) => {
  const id =  c.req.param("id");
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
    where : {
        id : id
    }
  });

  return c.json({ message: "post fetched!!", blog }, 200)
  } catch(error) {
    c.status(411);
    return c.json({message : 'error found', error})
  }
})

