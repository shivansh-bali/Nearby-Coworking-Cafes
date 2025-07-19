import { fetch3 } from '../Apis/commonApis'
import { environment } from '../redux_toolkit/globalReducer/blogReducer'
import { reactAppBaseurl } from '../config'

export const fetchAllBlogs = async () => {
  const result = await fetch3(`${reactAppBaseurl}/blogs`, 'get')
  const newBlogs = result.allBlogs.map((blog: any) => ({
    ...blog,
    description: environment + blog.description
  }))
  return newBlogs
}

export const fetchBlogById = async (id: string) => {
  const result = await fetch3(`${reactAppBaseurl}/blog/${id}`, 'get')
  return result?.blog
}
