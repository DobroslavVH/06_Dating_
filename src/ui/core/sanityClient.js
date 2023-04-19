import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'
import { DATASET, PROJECT_ID, TOKEN } from './api'

export const sanityClient = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    useCdn: true,
    apiVersion: '2022-01-12',
    token: TOKEN
})

const imageBuilder = imageUrlBuilder(sanityClient)

export const imageUrl = (source) => {
    return imageBuilder.image(source).url()
}
