/** @format */

import { useState, createContext } from "react";

export const AuthContext = createContext({});
export const AuthContextProvider = (props) => {
	const [islogged, setIslogged] = useState(false);
	const [name, setName] = useState({});
	const [usertoken, setUsertoken] = useState("");
	const [userID, setUserID] = useState("");
	const [Roles, setRoles] = useState("");

	return (
		<AuthContext.Provider
			value={{
				islogged,
				setIslogged,
				name,
				setName,
				userID,
				setUserID,
				usertoken,
				setUsertoken,
				Roles,
				setRoles,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export const UpdateContext = createContext();
export const UpdateContextProvider = (props) => {
	const [idposts, setIdposts] = useState(null);
	return (
		<UpdateContext.Provider
			value={{
				idposts,
				setIdposts,
			}}
		>
			{props.children}
		</UpdateContext.Provider>
	);
};

export const DeleteContext = createContext();
export const DeleteContextProvider = (props) => {
	const [Dposts, setDposts] = useState(false);
	return (
		<DeleteContext.Provider
			value={{
				Dposts,
				setDposts,
			}}
		>
			{props.children}
		</DeleteContext.Provider>
	);
};
export const LikedContext = createContext();
export const LikedContextProvider = (props) => {
	const [likedposts, setLikedposts] = useState(false);
	return (
		<LikedContext.Provider
			value={{
				likedposts,
				setLikedposts,
			}}
		>
			{props.children}
		</LikedContext.Provider>
	);
};
