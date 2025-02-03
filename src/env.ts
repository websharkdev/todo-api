
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

expand(config());


const ENVSchema = z.object({
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.enum(["fatal","error","warn","info","debug","trace"]),
});

export type env = z.infer<typeof ENVSchema>

let env:env

try {
  env = ENVSchema.parse(process.env);
} catch (error) {
  const e = error as ZodError

  console.error('❌ Invalid ENV:')
  console.error(e.flatten().fieldErrors)
  
  process.exit(1);
  
}


export default env
