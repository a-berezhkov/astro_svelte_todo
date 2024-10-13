import prisma from '../../src/pages/db'

export const getTasks = async (strategy?: any) => {
  const start = Date.now()

  const result = await prisma.tasks
    .findMany({
      cacheStrategy: strategy,
      orderBy: {
        id: 'desc',
      },
      take: 1,
    })
    .withAccelerateInfo()

  return {
    data: result?.data?.[0],
    info: result.info,
    time: Date.now() - start,
  }
}