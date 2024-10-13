import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {
    console.log('Seeding database 🌱')
    console.time('Seeding complete 🌱')

    await prisma.users.createMany({

        data: [
            {
                name: "user",
                email: "user@user.com",
                password: await bcrypt.hash("123456",10),
            },
            {
                name: "user1",
                email: "user1@user.com",
                password: await bcrypt.hash("123456",10 ),
            }
        ],
    })

    await prisma.tasks.createMany({

        data: [
            {
                title: "task 1",
                isDone: false,
                userId: 1,
            },
            {
                title: "task 2",
                isDone: false,
                userId: 1,
            }
        ],
    })

    console.timeEnd('Seeding complete 🌱')
}

main()
    .then(() => {
        console.log('Process completed')
    })
    .catch((e) => console.log(e))