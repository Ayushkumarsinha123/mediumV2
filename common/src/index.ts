import z from "zod";

// signup
export const signupInput = z.object({
  email: z.email(),
  username : z.string().optional(),
  password : z.string().min(6)
})


//signin 
export const signinInput = z.object({
  email: z.email(),
  password : z.string().min(6)
})



// blog zod validation 

export const createBlogInput = z.object({
  title : z.string(),
  content : z.string()
})



export const updateBlogInput = z.object({
  title : z.string(),
  content : z.string(),
  id : z.number()
})


// zod type inference
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signupInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
