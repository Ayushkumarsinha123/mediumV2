import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: "1",
    },
  });

  return c.json({ message: "post created!!", id: blog.id }, 200);
});

blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

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

blogRouter.get('/', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    accelerateUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
    where : {
        id : body.id
    }
  });

  return c.json({ message: "post fetched!!", blog }, 200)
  } catch(error) {
    c.status(411);
    return c.json({message : 'error found', error})
  }
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