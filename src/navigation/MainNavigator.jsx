import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TabNavigator from "./TabNavigator";

import { useGetProfilePictureQuery } from "../redux/apis/userApi";
import { setProfilePicture } from "../redux/slices/authSlice";

import { fetchSession } from "../db";
import { setUser } from "../redux/slices/authSlice";

const MainNavigator = () => {
    const user = useSelector(state => state.authReducer.value.email)
    const localId = useSelector(state => state.authReducer.value.localId)
    const dispatch = useDispatch()
    const { data: profilePicture } = useGetProfilePictureQuery(localId)
    useEffect(() => {
        if (!user) {
            (async () => {
                try {
                    const session = await fetchSession()
                    if (session.length) {
                        dispatch(setUser(session[0]))
                    }
                } catch (error) {
                    console.error("Error al obtener la sesión", error)
                }
            })()
        }
    }, [user])

    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image))
        }
    }, [profilePicture])

    return (
        <NavigationContainer>
            {
                user ? <TabNavigator /> : <TabNavigator />
            }
        </NavigationContainer>
    );
};

export default MainNavigator;
