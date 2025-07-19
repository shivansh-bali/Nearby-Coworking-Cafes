import React, { useEffect } from 'react'
import cx from './Blog.module.scss'
import st from '../../../assets/stylesheet/style.module.scss'

import { Container, Col, Row } from 'react-bootstrap'

import { Blog } from '../../../components/Website'
import { useDispatch, useSelector } from 'react-redux'
import { fetch3 } from '../../../Apis/commonApis'
import { reactAppBaseurl } from '../../../config'
import { environment } from '../../../redux_toolkit/globalReducer/blogReducer'
import { setBlogs } from '../../../redux_toolkit/globalReducer/blogReducer'

const BlogPage = (props: any) => {
  const dispatch = useDispatch()
  const blogState = useSelector((state: any) => state.blogReducer)
  const { blogs } = blogState
  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await fetch3(`${reactAppBaseurl}/blogs`, 'get')
      const newBlogs = result.allBlogs.map((blog: any) => ({
        ...blog,
        description: environment + blog.description
      }))
      dispatch(setBlogs(newBlogs))
    }
    fetchBlogs()
    window.scrollTo(0, 0)
    // Modify the description value for each blog item
  }, [dispatch])

  return (
    <>
      <section className={`${cx.featuredSection} ${st.sectionPaddingBottom}`}>
        <Container>
          <Col lg={12} className={`${cx.borderBottom}`}>
            <h2 className={`${st.heading}`}>Blog </h2>
          </Col>
          <Col lg={12} className={`${cx.blogFilter}`}>
            {/* <ul>
              <p>Filter by:</p>
              <li className={`${cx.active}`}>
                <button className={`${cx.actionBtn}`}>All</button>
              </li>
              <li>
                <button className={`${cx.actionBtn}`}>Recent</button>
              </li>
            </ul> */}
          </Col>
          <Row>
            {blogs?.map((item: any, index: number) => {
              return (
                <Col md={4} lg={3} xl={3} xxl={3} key={`${index}`}>
                  <Blog item={item} />
                </Col>
              )
            })}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default BlogPage
