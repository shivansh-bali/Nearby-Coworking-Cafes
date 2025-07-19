import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Website';
import { Error404 } from './components/Website/Error404/Error404';
import {
  AboutUs,
  BlogDetails,
  BlogPage,
  CafeDetails,
  CafeListing,
  ContactUs,
  Home,
  Notifications,
  EditAccount,
  SavedCafes,
  AllReviews,
  AllRecommends,
  Photos,
  MyProfile,
  MapView,
  People,
  Business,
  Cafeowner,
  Cafeform,
  BusinessProfile,
  CafeStep,
} from './pages/Website';
import AdminNavigation from './components/Admin/Navigation/Navigation';
import {
  Branch,
  UserList,
  ContactRequests,
  CafeDescription,
  User,
  AddBlog,
  Blogs,
  Dashboard,
  EditProfile,
} from './pages/Admin';

import { useDispatch, useSelector } from 'react-redux';
import {
  accessToken,
  myData,
  profile,
} from './redux_toolkit/reducer/profileReducer';
import Recommend from './pages/Website/Recommend/Recommend';
import UserRecommend from './pages/Website/UserRecommend/UserRecommend';
import Recommendations from './pages/Admin/Recommendations/Recommendations';
import CafeRequests from './pages/Admin/CafeRequests/CafeRequests';
import BlogItem from './pages/Website/Blogitem/Blogitem';
import CafeNavigation from './components/Cafe/Navigation/CafeNavigation';
import {
  CafeDashboard,
  BusinessRequests,
  ProfileDetails,
  Reviews,
  AccountSetting,
  AboutCafe,
  CafeAmenities,
  UploadImages,
} from './pages/Cafe/index';
import {
  addFCM,
  increaseLocalLocation,
  localLatLng,
  saveLatLng,
} from './redux_toolkit/reducer/registrationReducer';
import axios from 'axios';
import { increaseMapState } from './redux_toolkit/globalReducer/mapReducer';
import Reviews2 from './pages/Website/Reviews/Reviews';
import PrivacyPolicy from './pages/Website/PrivacyPolicy/PrivacyPolicy';
import Cookies from './pages/Website/Cookies/Cookies';
import TermsandCondition from './pages/Website/PrivacyPolicy/TermsandCondition';
import UsNotice from './pages/Website/PrivacyPolicy/UsNotice';
import Subscribers from './pages/Admin/Subscribers/Subscribers';
import DeleteAccount from './pages/Website/DeleteAccount/DeleteAccount';
import People2 from './pages/Website/People2/People';
import ManageInvitations from './components/Website/ManageInvitations/ManageInvitations';
import CafeList from './pages/Cafe/Dashboard';
import UserProfile from './pages/Website/UserProfile/UserProfile';
import AllPeople from './pages/Website/People2/AllPeople';
import { getDeviceToken, onMessageListener } from './services/firebaseConfig';
import Chat from './pages/Website/Chat/Chat';

const App = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state: any) => state.profileReducer);
  // useEffect(() => {
  //   dispatch(mapKeyFunc());
  // }, [dispatch]);
  const [notification, setNotification] = useState<any>({
    title: '',
    body: '',
    click_action: '',
  });
  console.log(notification);
  useEffect(() => {
    async function tokenDeviceGet() {
      const tokenDevice = await getDeviceToken();
      if (profile?.data?._id && tokenDevice !== '') {
        if (
          profile?.data?.fcmToken &&
          profile?.data?.fcmToken?.some((e: any) => e === tokenDevice)
        ) {
          return;
        } else {
          console.log(tokenDevice, 'tokendevice123');
          dispatch(addFCM({ fcmToken: tokenDevice }));
        }
      }
    }
    tokenDeviceGet();
  }, [dispatch]);

  onMessageListener()
    .then((payload: any) => {
      console.log(payload, 'payload');
      setNotification({ title: payload.data.title, body: payload.data.body });
    })
    .catch((err: any) => console.log('failed: ', err));
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  const [loginData, setLoginData] = useState<any>({
    isAuthenticated: false,
    role: '',
  });
  useEffect(() => {
    if (profile?.data?.role === undefined) {
      dispatch(myData());
    }
    setLoginData({
      isAuthenticated: true,
      role: profile?.data?.role,
    });
  }, [dispatch, profileState.profileState]);
  useEffect(() => {
    if (registrationState.logoutState > 0) {
      setLoginData({
        isAuthenticated: false,
        role: '',
      });
    }
  }, [registrationState.logoutState]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position: any) {
      let placeName = '';
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${accessToken}`
        );

        const features = response.data.features;
        if (features.length > 0) {
          placeName = features[0].place_name;
        } else {
          console.log('No matching results found.');
        }
      } catch (error) {
        console.log('Error retrieving geocoding data:', error);
      }
      dispatch(
        localLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          placeName: placeName,
        })
      );
      dispatch(increaseLocalLocation());
      dispatch(increaseMapState());
      dispatch(
        saveLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          placeName: placeName,
        })
      );
    });
  }, [dispatch]);
  return (
    <Routes>
      {loginData.isAuthenticated === true && loginData.role === 'admin' ? (
        <Route path='admin' element={<AdminNavigation />}>
          <Route index element={<Dashboard />} />
          <Route path='cafes' element={<Branch />} />
          <Route path='users' element={<UserList />} />
          <Route path='edit-profile' element={<EditProfile />} />
          <Route path='user/:id' element={<User />} />
          <Route path='blogs' element={<Blogs />} />
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='edit-blog/:id' element={<AddBlog />} />  
          <Route path='cafe-details/:id' element={<CafeDescription />} />
          <Route path='contact-requests' element={<ContactRequests />} />
          <Route path='subscribers' element={<Subscribers />} />
          <Route path='recommendations' element={<Recommendations />} />
          <Route path='cafe-requests' element={<CafeRequests />} />
          <Route path='cafe-details/:id' element={<CafeDescription />} />
        </Route>
      ) : loginData.isAuthenticated === true &&
        (loginData.role === 'cafe' || loginData.role === 'cafeClaim') &&
        profile?.data?.isSubmitted === true ? (
        <>
          <Route path='/' element={<Navigation />}>
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/saved-cafes' element={<SavedCafes />} />
            <Route path='/all-reviews/:id' element={<AllReviews />} />
            <Route path='/photos' element={<Photos />} />
            <Route path='/:token?' element={<Home />} />
            <Route path='/404' element={<Error404 />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/blog/blog-details/:id?' element={<BlogDetails />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/cafe-listing' element={<CafeListing />} />
            <Route path='/cafe-details/:id' element={<CafeDetails />} />
            <Route path='/reviews/:id' element={<Reviews2 />} />
            <Route path='/map-view' element={<MapView />} />
            <Route path='/people' element={<People />} />
            <Route path='/cafe-owner' element={<Cafeowner />} />
            <Route path='/cafe-owner/:id' element={<Cafeowner />} />
            <Route path='/user-recommend' element={<UserRecommend />} />
            <Route path='/blog-item' element={<BlogItem />} />
            <Route path='/cookies' element={<Cookies />} />{' '}
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/us-notice' element={<UsNotice />} />
            <Route path='/cafe-step/addcafe' element={<CafeStep />} />
            <Route path='/terms-conditions' element={<TermsandCondition />} />
          </Route>
          <Route path='cafepanel' element={<CafeNavigation />}>
            <Route path='' element={<CafeList />} />
            <Route path='cafe-information/:id' element={<CafeDashboard />}>
              <Route index element={<BusinessRequests />} />
              <Route path='about' element={<AboutCafe />} />
              <Route path='amenities' element={<CafeAmenities />} />
              <Route path='images' element={<UploadImages />} />
              <Route path='reviews' element={<Reviews />} />
            </Route>
            <Route path='setting' element={<AccountSetting />} />
            <Route path='profile' element={<ProfileDetails />} />
          </Route>
        </>
      ) : loginData.isAuthenticated === true && loginData.role === 'user' ? (
        <Route path='/' element={<Navigation />}>
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/delete-account' element={<DeleteAccount />} />
          <Route path='/edit-account' element={<EditAccount />} />
          <Route path='/saved-cafes' element={<SavedCafes />} />
          <Route path='/all-reviews/:id' element={<AllReviews />} />
          <Route path='/all-recommends/:id' element={<AllRecommends />} />
          <Route path='/photos' element={<Photos />} />
          <Route path='/:token?' element={<Home />} />
          <Route path='/cafeclaim/:token?' element={<Home />} />
          <Route path='/404' element={<Error404 />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/blog/blog-details/:id?' element={<BlogDetails />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/cafe-listing' element={<CafeListing />} />
          <Route path='/cafe-details/:id' element={<CafeDetails />} />
          <Route path='/reviews/:id' element={<Reviews2 />} />
          <Route path='/map-view' element={<MapView />} />
          <Route path='/people' element={<People2 />} />
          <Route path='/cafe-register' element={<Business />} />
          <Route path='/all-people/:title' element={<AllPeople />} />
          <Route path='/manage-invitations' element={<ManageInvitations />} />
          <Route path='/userprofile/:id' element={<UserProfile />} />
          {/* <Route path="/cafe-owner" element={<Cafeowner />} /> */}
          <Route path='/cafe-form' element={<Cafeform />} />
          <Route path='business-profile' element={<BusinessProfile />} />
          <Route path='/cafe-step' element={<CafeStep />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/user-recommend' element={<UserRecommend />} />
          <Route path='/blog-item' element={<BlogItem />} />
          <Route path='/cookies' element={<Cookies />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-conditions' element={<TermsandCondition />} />
          <Route path='/us-notice' element={<UsNotice />} />
          <Route path='/chat' element={<Chat />} />
        </Route>
      ) : (
        <Route path='/' element={<Navigation />}>
          <Route path='/admin/login' element={<Home />} />
          <Route path='/:token?' element={<Home />} />
          <Route path='/cafeclaim/:token?' element={<Home />} />
          <Route path='/businessdashboard' element={<Home />} />
          <Route path='/password/reset/:token?' element={<Home />} />
          <Route path='/404' element={<Error404 />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/blog/blog-details/:id?' element={<BlogDetails />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/cafe-listing' element={<CafeListing />} />
          <Route path='/cafe-details/:id' element={<CafeDetails />} />
          <Route path='/reviews/:id' element={<Reviews2 />} />
          <Route path='/map-view' element={<MapView />} />
          {/* <Route path="/people" element={<People />} /> */}
          <Route path='/cafe-register' element={<Business />} />
          <Route path='/cafe-owner' element={<Cafeowner />} />
          <Route path='/cafe-form' element={<Cafeform />} />
          <Route path='business-profile' element={<BusinessProfile />} />
          <Route path='/cafe-step' element={<CafeStep />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/user-recommend' element={<UserRecommend />} />
          <Route path='/blog-item' element={<BlogItem />} />
          <Route path='/cookies' element={<Cookies />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/us-notice' element={<UsNotice />} />
          <Route path='/terms-conditions' element={<TermsandCondition />} />
          <Route path='/chat' element={<Chat />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
