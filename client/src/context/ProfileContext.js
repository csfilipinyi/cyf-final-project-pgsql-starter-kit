import React, { useReducer } from 'react';
import axios from 'axios';


//Created Context
export const ProfileContext = React.createContext();


//Stored action types names

const types = {
	Set_All_Profiles: "Set_All_Profiles",
	Set_Is_Loading: "Set_Is_Loading",
	Set_Error: "Set_Error",
	Set_Profile: "Set_Profile",
	Clear_Profile :"Clear_Profile",
};


//Stored actions in a reducer

const profileReducer = (state, action) => {
	switch (action.type) {
	case types.Set_Is_Loading:
		return { ...state, isLoading: true };
	case types.Set_Error:
		return { ...state, isLoading: false, error:action.payload };
	case types.Set_All_Profiles:
		return { ...state, allProfiles: action.payload, isLoading: false };
	case types.Set_Profile:
		return { ...state, profile: action.payload, isLoading: false };
	case types.Clear_Profile:
		return { ...state, profile: null, isLoading: false };
	// case types.Delete_Profile:
	// 	return { ...state, allProfiles: state.allProfiles.filter((profile) => profile.id !== action.payload), loading: false };
	default:
		return state;
	}
};

//Context has Provider and Consumer in itself.
//Here we set Context Provider and stored our states and actions in it to provide them to Consumer

const ProfileState = (props) =>{

	const initialState ={
		allProfiles:[],
		profile:null,
		isLoading:false,
		error:null,
	};

	const [state, dispatch] = useReducer(profileReducer, initialState);

	const getAllProfiles = ()=>{
		dispatch({ type: types.Set_Is_Loading }),
		axios.get(`https://gist.githubusercontent.com/OBakir90/9cf219c42e4d5794988e06b7ff5c3c8e/raw/319814850d688fb126d610b858a970cf8a53858b/graduateprofile.json`)
			.then((response)=>{
				dispatch({ type: types.Set_All_Profiles, payload:response.data });
			})
			.catch((error)=>{
				dispatch({ type:types.Set_Error, payload:error });
			});
	};


	const getProfile =  (id) => {
		dispatch({ type: types.Set_Is_Loading });
		axios.get(`https://gist.githubusercontent.com/OBakir90/46c0de835cb3db4c42f655e5f467825a/raw/d16c488a33cc1ebbceea866fe988591c3683bf0c/myprofile.json`)
			.then(response=>response.json)
			.then((data)=>{
				console.log(data);
				dispatch({ type: types.Set_Profile, payload:data });
			})
			.catch((error)=>{
				dispatch({ type:types.Set_Error, payload:error });
			});
	};


	const addProfile = (profile) => {
		dispatch({ type: types.Set_Is_Loading });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios.post(`${baseUrl}`, profile, config)
			.then((response)=>{
				dispatch({ type: types.Set_Profile, payload:response.data });
			})
			.catch((error)=>{
				dispatch({ type:types.Set_Error, payload:error });
			});
	};


	// const deleteProfile = (id) => {
	// 	dispatch({ type: types.Set_Is_Loading });
	// 	axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
	// 		.then((response)=>{
	// 			dispatch({ type: types.Set_Profile, payload:response.data });
	// 		})
	// 		.catch((error)=>{
	// 			dispatch({ type:types.Set_Error, payload:error });
	// 		});
	// };

	const editProfile = (profile) => {
		dispatch({ type: types.Set_Is_Loading });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios.put(`${baseUrl}/${profile.id}`, profile, config)
			.then((response)=>{
				dispatch({ type: types.Set_Profile, payload:response.data });
			})
			.catch((error)=>{
				dispatch({ type:types.Set_Error, payload:error });
			});
	};

	const clearProfile = ()=>{
		dispatch({ type: types.Clear_Profile });
	};

	return (
		<ProfileContext.Provider
			value={{
				allProfiles:state.allProfiles,
				profile:state.profile,
				isLoading:state.isLoading,
				error: state.error,
				addProfile,
				getAllProfiles,
				getProfile,
				editProfile,
				// deleteProfile,
				clearProfile,
			}}
		>
			{props.children}
		</ProfileContext.Provider>
	);
};

export default ProfileState;













