import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileActonApi } from "../redux/reducers/userReducer";
import { USER_LOGIN, getStoreJson } from "../utils/config";
import ProfileComponent from "../components/content/ProfileComponent";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getProfileActionApiFuntion();
  }, []);

  const getProfileActionApiFuntion = async () => {
    const actionAsync = getProfileActonApi();
    dispatch(actionAsync);
  };
  return <div><ProfileComponent /></div>;
};
export default Profile;
