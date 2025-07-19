import st from '../../../../assets/stylesheet/AdminStyle.module.scss'
import cx from './AddBlog.module.scss'
import { Col } from 'react-bootstrap'
import { profile_icon } from '../../../../assets/images'
import { FaUpload } from 'react-icons/fa'
import React, { useCallback, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addImage,
  changeImageState,
  imageUrl
} from '../../../../redux_toolkit/globalReducer/imageReducer'
import {
  addBlog,
  blogRes,
  changeBlogState,
  editBlog,
  setCurrentBlog
} from '../../../../redux_toolkit/globalReducer/blogReducer'
import { fetchBlogById } from '../../../../services/servicies'
import { ToastContainer, toast } from 'react-toastify'

const AddBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const param = useParams()
  const blogState = useSelector((state: any) => state.blogReducer)
  const imageState = useSelector((state: any) => state.imageReducer)
  const [startDate, setStartDate] = useState(new Date())
  const [blogFields, setBlogFields] = useState({
    authorImage: '',
    publishDate: '',
    title: '',
    description: ''
  })
  const { currentBlog } = blogState
  const [imageLink, setImageLink] = useState<any>()
  const [fieldError, setFieldError] = useState<any>()
  const fillFields: any = useCallback(
    (key: any, value: any) => {
      setBlogFields((prev: any) => {
        return { ...prev, [key]: value }
      })
      if (
        fieldError !== undefined &&
        fieldError[key] &&
        value !== '<p></p>' &&
        value !== ''
      ) {
        fieldError[key] = ''
      }
    },
    [fieldError]
  )
  const checkFields = (fields: any) => {
    const fieldErr: any = {}
    Object.keys(fields).forEach((e: any) => {
      if (fields[e] === '' || fields[e] === '<p></p>') {
        fieldErr[e] = (
          <p
            style={{
              color: 'red',
              fontSize: '12px',
              margin: '0'
            }}
          >
            This field is required
          </p>
        )
      }
    })
    if (Object.keys(fieldErr).length === 0) {
      if (window.location.pathname.includes('edit-blog')) {
        dispatch(editBlog({ id: param?.id, data: fields }))
      } else {
        dispatch(addBlog(fields))
      }
    } else {
      setFieldError(fieldErr)
    }
  }
  useEffect(() => {
    if (imageState.imageState > 0) {
      setImageLink(imageUrl)
      fillFields('authorImage', imageUrl)
      dispatch(changeImageState())
    }
  }, [dispatch, fillFields, imageState.imageState])
  useEffect(() => {
    if (blogState.blogState > 0) {
      if (blogRes.success === true) {
        toast.success(blogRes.message)
        dispatch(changeBlogState())
        setTimeout(() => {
          navigate('/admin/blogs')
        }, 3000)
      } else {
        toast.error(blogRes.message)
        dispatch(changeBlogState())
      }
    }
  }, [dispatch, navigate, blogState.blogState])
  useEffect(() => {
    if (window.location.pathname.includes('edit-blog') && param && param?.id) {
      const newBlog = fetchBlogById(param?.id)
      dispatch(setCurrentBlog(newBlog))
    }
  }, [dispatch, param, param?.id])

  useEffect(() => {
    if (blogState.singleBlogState > 0) {
      setBlogFields({
        authorImage: currentBlog?.authorImage,
        publishDate: currentBlog?.publishDate,
        title: currentBlog?.title,
        description: currentBlog?.description
      })
      setImageLink(currentBlog?.authorImage)
      setStartDate(new Date(currentBlog?.publishDate))
    }
  }, [blogState.singleBlogState, currentBlog])
  useEffect(() => {
    setBlogFields({
      authorImage: '',
      publishDate: '',
      title: '',
      description: ''
    })
    setImageLink(undefined)
    setStartDate(new Date())
  }, [])
  return (
    <section className={`${st.pageWrapper}`}>
      <ToastContainer autoClose={3000} limit={1} />
      <div className={`${st.pageWrapperInside}`}>
        <Col className={cx.buttonsContainer}>
          <button
            type="button"
            onClick={() => {
              navigate('/admin')
            }}
          >
            Home
          </button>
          /
          <button
            type="button"
            onClick={() => {
              navigate('/admin/blogs')
            }}
          >
            Blogs
          </button>
          /
          <button type="button" className={cx.active}>
            {window.location.pathname.includes('edit-blog')
              ? 'Edit-Blog'
              : 'Add-Blog'}
          </button>
        </Col>

        <Col md={12} className={cx.addBlogContainer}>
          <div className={`d-flex align-items-center ${cx.userDetails}`}>
            <div className={`${cx.postTitle}`}>
              <h6>Blog Banner Image</h6>
              <div>
                <div
                  className={`d-flex flex-column align-items-center ${cx.userProfile}`}
                >
                  <img
                    src={imageLink === undefined ? profile_icon : imageLink}
                    alt="authorProfile"
                  />
                  <div className={cx.uploadBtnWrapper}>
                    <button className={cx.btn}>
                      <FaUpload
                        style={{ color: '#ffffffba', fontSize: '14px' }}
                      />
                    </button>
                    <input
                      type="file"
                      name="myfile"
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                      onChange={(e: any) => {
                        fillFields('authorImage', '')
                        dispatch(addImage({ image: e.target.files[0] }))
                      }}
                    />
                  </div>
                </div>
                {fieldError?.authorImage}
              </div>

              <div></div>
            </div>
          </div>
          <div>
            <h6>Date</h6>
            <div className={`${cx.postTitle}`}>
              <DatePicker
                selected={startDate}
                onChange={(date: any) => {
                  const publishDate = new Date(date).toLocaleDateString()
                  fillFields('publishDate', publishDate)
                  setStartDate(date)
                }}
              />
            </div>
          </div>
          {fieldError?.publishDate}
          <div>
            <h6>Blog Title</h6>
            <div className={`${cx.postTitle}`}>
              <textarea
                name=""
                id=""
                rows={1}
                placeholder="Blog Tilte"
                value={blogFields?.title}
                onChange={(e: any) => fillFields('title', e.target.value)}
              ></textarea>
            </div>
          </div>
          {fieldError?.title}
          {/* <div>
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              placeholder="Description"
            ></textarea>
          </div> */}
          <div>
            <h6>Blog URL</h6>
            <div className={`${cx.postTitle}`}>
              <textarea
                name=""
                id=""
                rows={1}
                placeholder="Blog URL"
                value={blogFields?.description}
                onChange={(e: any) => fillFields('description', e.target.value)}
              ></textarea>
            </div>
          </div>
          {fieldError?.description}
          <section className={`d-flex justify-content-end   `}>
            <button
              type="button"
              className="btn btn-success m-2"
              onClick={() => checkFields(blogFields)}
            >
              Save
            </button>
            <button type="button" className="btn btn-secondary m-2">
              Cancel
            </button>
          </section>
        </Col>
      </div>
    </section>
  )
}

export default AddBlog
