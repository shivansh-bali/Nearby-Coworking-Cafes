import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import cx from './Navigation.module.scss'
import { verifyRegistration } from '../../../redux_toolkit/reducer/registrationReducer'

export default function Navigation() {
  const hideFooter =
    window.location.pathname.includes('/map-view') ||
    window.location.pathname.includes('/cafe-register') ||
    window.location.pathname.includes('/cafe-step') ||
    window.location.pathname.includes('/user-recommend')

  const hideHeader =
    window.location.pathname.includes('/cafe-step') ||
    window.location.pathname.includes('/blog-item') ||
    window.location.pathname.includes('/blog/blog-details')

  const param = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (param?.token) {
      dispatch(verifyRegistration({ param: param?.token }))
    }
  }, [dispatch, param])

  let location = useLocation()
  return (
    <div className={`${cx.wrapper}`}>
      {location.pathname.length === 1 ||
      window.location.pathname.includes('/cafe-register') ||
      window.location.pathname.endsWith('admin/login') ? (
        <Header />
      ) : !hideHeader ? (
        <Header showHeaderClass="headerInner" />
      ) : (
        ''
      )}

      <div
        className={
          hideFooter
            ? ''
            : window.location.pathname.includes('/blog-item')
            ? ''
            : window.location.pathname.includes('/recommend')
            ? ''
            : window.location.pathname.includes('/blog/blog-details')
            ? ''
            : cx.mainBody
        }
      >
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>
  )
}
