import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password,username } = req.body

    // Generate a salt for the password hash
    const salt = await bcrypt.genSalt(10)

    // Hash the user's password using bcrypt
    const passwordHash = await bcrypt.hash(password, salt)

  const user = await prisma.user.create({
    data: {
      email,
      password : passwordHash,
      username
    },
  })

  res.json(user)
}
