import { builder, Builder } from '@builder.io/react'
builder.init('50299bb3800f40f39273cec51eb82ff3')
Builder.isStatic = true

export async function resolveBuilderContent(
  modelName,
  targetingAttributes,
  cachebust
) {
  let page = await builder
    .get(modelName, {
      userAttributes: targetingAttributes,
      ...(cachebust
        ? {
            cachebust: true,
            noCache: true,
          }
        : {
            staleCacheSeconds: 140,
          }),
    })
    .toPromise()

  return page || null
}
