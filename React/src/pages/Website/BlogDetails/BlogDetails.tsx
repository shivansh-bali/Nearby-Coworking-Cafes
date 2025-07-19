import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import cx from './BlogDetails.module.scss'
import st from '../../../assets/stylesheet/style.module.scss'

import { Container, Col, Row } from 'react-bootstrap'
import { AnnaSmith, Logo, BlogImage } from '../../../assets/images'
import { Gray } from '../../../assets/images'

import { BsTwitter } from 'react-icons/bs'
import { FaLinkedinIn, FaLink, FaFacebookF } from 'react-icons/fa'
import { Blog } from '../../../components/Website'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentBlog } from '../../../redux_toolkit/globalReducer/blogReducer'
import { Markup } from 'interweave'
import { fetchBlogById } from '../../../services/servicies'

function BlogDetail(props: any) {
  const param = useParams()
  const dispatch = useDispatch()
  const blogState = useSelector((state: any) => state.blogReducer)
  const [publishDate, setPublishDate] = useState<any>()
  // const [currentBlog, setcurrentBlog] = useState<any>()
  const { blogs, currentBlog } = blogState

  useEffect(() => {
    if (param && param?.id) {
      const blog = fetchBlogById(param?.id)
      dispatch(setCurrentBlog(blog))
      window.scrollTo(0, 0)
    }
  }, [param?.id, dispatch, param])

  useEffect(() => {
    const date: any = new Date(currentBlog?.publishDate).toLocaleDateString(
      'en-us',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    )
    setPublishDate(date)
  }, [currentBlog])
  return (
    <>
      <section className={`${cx.cafeHeader}`}>
        <Container>
          <NavLink to="/">
            <img src={Logo} className={`${cx.logo}`} alt="logo" />
          </NavLink>
        </Container>
      </section>
      <section className={`${cx.bannerSection} ${st.fixSpace}`}>
        <img src={Gray} className={`${cx.backgroundImg}`} alt="gray" />
        <Container>
          <Row>
            <Col md={11} className={`${cx.contentBox}`}>
              <div className={`${cx.contentHeading}`}>
                <h1>{currentBlog?.title}</h1>
                <p>{publishDate}</p>

                <div className={`${cx.NameBox}`}>
                  <img
                    src={
                      currentBlog?.authorImage
                        ? currentBlog?.authorImage
                        : AnnaSmith
                    }
                    width={50}
                    height={50}
                    alt="authorImage"
                    style={{ borderRadius: '100%' }}
                  />
                  <div className={`${cx.NameList}`}>
                    <h3>{currentBlog?.authorName}</h3>
                    <p>{currentBlog?.authorDescription}</p>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={12}>
              <div className={`${cx.blogImages}`}>
                <img src={BlogImage} alt="blogImage" />
              </div>
            </Col>

            <Col className="col-3" md={1}>
              <div className={`${cx.socialIcon}`}>
                <div className={`${cx.socialBox}`}>
                  <p>Share it on:</p>
                  <ul>
                    <li>
                      <NavLink to="#">
                        <BsTwitter />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <FaLinkedinIn />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <FaFacebookF />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <FaLink />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col md={11} className={`col-9 m-auto`}>
              <Col md={11} className={`m-auto`}>
                <div className={`${cx.blogText}`}>
                  <h3>{currentBlog?.title}</h3>
                </div>

                <div className={`${cx.blogText}`}>
                  <Markup content={currentBlog?.description} />
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${cx.featuredSection} ${st.sectionPadding}`}>
        <Container>
          <Col lg={12} className={`${st.title} text-left mb-4`}>
            <h3 className={`${st.heading2}`}>You might be interested</h3>
          </Col>
          <Row>
            {blogs?.map((item: any, index: number) => {
              return (
                index < 4 && (
                  <Col md={4} lg={3} xl={3} xxl={3}>
                    <Blog item={item} />
                  </Col>
                )
              )
            })}
          </Row>

          <Col lg={12} className={`text-center mt-4`}>
            <NavLink to="/blog-item" className={`btn ${st.btn2}`}>
              See all articles
            </NavLink>
          </Col>
        </Container>
      </section>
    </>
  )
}

export default BlogDetail
