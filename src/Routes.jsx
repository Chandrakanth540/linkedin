import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';
// import LoginComponent from './components/logincomponent';

import RegisterLayout from './layout/registerloginLayout';

import Homepage from './homepage';
import { FallingLines } from 'react-loader-spinner';
import { PacmanLoader } from 'react-spinners';
import { FidgetSpinner } from 'react-loader-spinner';
import Homecomponent from './components/homecomponent';
import { auth } from './firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Routes } from 'react-router-dom';
import HomeTopBarComponent from './components/topbariconComponents/hometopbarcomp';
import RoughBook from './components/topbariconComponents/roughbook';
import HomeLayout from './layout/homelayout';
import DivertProfile from './divertprofile';
import ProfileTopBarComponent from './components/topbariconComponents/profiletopbarcomp';
import Topbar from './components/topbarcomponent';
import PreviewImage from './components/common/extra/imagepreview';
import ChatTopBarComponent from './components/topbariconComponents/chattopbarcomp';
import SingleChatPlot from './components/singlechatplot';
import FriendComponent from './components/friendscomp';
import FriendIndex from './components/friendsindex';
import FriendToRequest from './components/friendtorqst';
import MainTopBar from './maintopbar';
import FriendRequests from './components/friendrequests';
import FriendRqstComp from './components/friendrqstcomp';
// import { loader as friendtorqstloader } from './components/friendtorqst';
// import { loader as friendrequestComploader } from './components/friendrqstcomp';
import ChatEnginew from './components/common/extra/chatengine';
import FollowingPeople from './components/followingiamfollow';
import LoginComponent from './components/followingpage';
import RegisterComponent from './components/common/extra/compul';
import Cubes from './components/common/extra/cubes';
// RegisterComponent
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RegisterLayout />}>
        <Route index element={<Cubes />} />
        <Route path="login" element={<LoginComponent />} />
        <Route path="register" element={<RegisterComponent />} />
      </Route>
      {/* <Route path/> */}
      <Route
        path="/homecomponent"
        loader={async () => {
          const islogged = localStorage['logged'];
          if (!islogged) {
            throw redirect('/login');
          }
          return null;
        }}
        element={<MainTopBar />}
      >
        <Route index element={<Homecomponent />} />
        <Route path="homepageposts" element={<Homecomponent />} />
        {/* <Route path="roughbook" element={<RoughBook />} /> */}
        <Route path="helloworld" element={<h1>Hello world</h1>} />
        <Route path="divertprofile" element={<DivertProfile />} />
        <Route path="following" element={<FollowingPeople />} />
        <Route
          path="chatbox"
          element={<ChatTopBarComponent />}
          // loader={chattopbarloader}
        >
          <Route
            index
            element={
              <section>
                <h2></h2>
              </section>
            }
          />
          <Route path="singlechatplot" element={<SingleChatPlot />} />
        </Route>
        <Route path="friends" element={<FriendComponent />}>
          <Route index element={<FriendToRequest />} />
          <Route
            path="/homecomponent/friends/reqstfrnds"
            element={<FriendRqstComp />}
          />
        </Route>
        <Route path="personal" element={<PreviewImage />} />
        <Route path="profilepage" element={<ProfileTopBarComponent />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="fidget-spin">
            <FidgetSpinner
              visible={true}
              height="180"
              width="180"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
              ballColors={['black', 'black', 'black']}
              backgroundColor="black"
            />
            <h1>Invalid page 404</h1>
          </div>
        }
      />

      <Route path="/chatenginew" element={<ChatEnginew />} />
    </Route>,
  ),
);
