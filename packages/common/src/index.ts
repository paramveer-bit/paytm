import { z } from "zod"

export const CredentialSchema = z.object({
    phone: z.number(),
    password: z.string()
})