const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createUser(){
    await prisma.user.create({
        data: {
          name: 'annu',
          email: 'anu@gamil.com',
          posts: {
            create: { title: 'Hello bro.....' },
          },
          profile: {
            create: { bio: 'I like animals' },
          },
        },
      })
    
      const allUsers = await prisma.user.findMany({
        include: {
          posts: true,
          profile: true,
        },
      })
      console.dir(allUsers, { depth: null })
}

async function findAllUser(){
    const allUsers = await prisma.user.findMany({
        include: {
          posts: true,
          profile: true,
        },
      })
      console.dir(allUsers, { depth: null })
}

async function findAllUserWithLastPost() {
  const allUsersWithLastPost = await prisma.user.findMany({
    include: {
      profile: true,
      posts: {
        orderBy: { createdAt: 'desc' }, // Order posts by createdAt date in descending order
        take: 1, // Limit the number of posts to 1
      },
    },
  });
  console.dir(allUsersWithLastPost, { depth: null });
}


async function findPostWithUser(){
    const allPosts = await prisma.post.findMany({
        include: {
           author: true,
        },
      })
      console.dir(allPosts, { depth: null })
}

async function updatePost(){
    const post = await prisma.post.update({
        where: { id: 1 },
        data: { published: true },
      })
      console.log(post)
}

async function findPosts(){
  const allPosts = await prisma.post.findMany({})
  console.dir(allPosts, { depth: null })
}

async function createPost(){
  await prisma.post.create({
    data: {
      title: 'Hello World' ,
      authorId: 1
    },
  })
}

async function main() {
  // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany()
//   console.log(allUsers)
// await createUser();
// await updatePost();
// await findAllUser();
// await findPostWithUser();
// await createPost();
// await findPosts();
   await findAllUserWithLastPost();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })