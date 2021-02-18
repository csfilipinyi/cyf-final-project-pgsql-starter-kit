import React, { useState, useContext, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import OverviewProfileCard from '../components/OverviewProfileCard';
import Introducing from '../components/Introducing';
import FilterProfiles from '../components/FilterProfiles'
import Logo from '../constant/Logo'
import { ProfileContext } from '../context/ProfileContext';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import GitHubLogin from "react-github-login";
import {base_url} from '../../../base_url'


const Home = () => {
	let history = useHistory();
	const [filteredProfiles, setFilteredProfiles]=useState([])
	const { getAllProfiles, getProfile, clearProfile, allProfiles, isLoading, error }= useContext(ProfileContext);
	const { fetchUserName, checkGraduate, setGithub, isAuthenticated, github_id, userName, isGraduate, isAdmin} = useContext(AuthContext);

	const onSuccess = async (response) =>{
		const accessCode = response.code;
		const githubname = await fetchUserName(accessCode);
		setGithub(githubname);
		await checkGraduate(githubname);
		clearProfile();
	}

	const navigateToProfile = async ()=>{
		await getProfile(github_id)
		history.push(`/myprofile`)
	}

	useEffect(()=>{
		if(userName){
			navigateToProfile()
		}
	},[userName])

	useEffect(()=>setFilteredProfiles(allProfiles), [allProfiles])

	useEffect (()=>{
		!userName&&isAuthenticated&&history.push('/profiles/new')
		!isGraduate&&history.push('/notfound')
		isAdmin&&history.push('/admin')
	},[ isAuthenticated, isGraduate, isAdmin])

    const onFailure = response => console.error(response);  

	useEffect(()=>getAllProfiles(), []);
	return (
		<Screen>
			<Header>
				<Logo/>
				<GitHub clientId='d46845e5f1d464b34454' //this needs to change according to heroku app configs
				onSuccess={onSuccess}
				onFailure={onFailure}
				redirectUri={`${base_url}/login`}
				buttonText='Graduate Login'
				/>
			</Header>
			<Introducing
				header = 'Welcome to the CodeYourFuture Graduate Directory'				
		  	/>	
			 <Info>In this directory you will find recent graduates from the full-stack program at CodeYourFuture. CodeYourFuture graduates spent approximately 800 hours developing their technical and employability skills.
				Learn more about the syllabus <LinkCYF href='https://syllabus.codeyourfuture.io/overview'>here</LinkCYF>
			</Info> 
			<Info>If you see a likely candidate please contact the graduate directly. If you would like to have a broader conversation about your hiring needs, we’d love to chat - contact us at <span> </span>
			<LinkCYF href='mailto:contact@codeyourfuture.io'> contact@codeyourfuture.io</LinkCYF>
			</Info>
			<FilterProfiles allProfiles={allProfiles} setFilteredProfiles={setFilteredProfiles}/>
			<Container>
				{isLoading?<Text>Loading...</Text>			
					: filteredProfiles && filteredProfiles.map(( singleProfile, i ) => {
						return <OverviewProfileCard singleProfile={ singleProfile } getProfile={getProfile} key={ i } />
					})}
				{error && <Text>{error}</Text>}
			</Container>
		</Screen>
	)}

export default Home;

const Header = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    background-color:${(props)=>props.theme.colors.primaryMidGray};
    height:86px;
`;

const GitHub = styled(GitHubLogin)`
	height: 60px;
	width: 160px;
	border-radius: 2px;
	color:#fff;
	margin-right:15%;
	align-self:center;
	font-weight:bold;
	font-family: Arial;
	border:2px solid green;
	background-color:${(props)=>props.theme.colors.primaryGreen};		
`

const Screen =styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
`;

const Container = styled.div`
	display:flex;
	flex-wrap:wrap;
	justify-content:center;
	width:75%;
`;

const Text = styled.p`
	fontSize:20;
`;

const Info=styled.p`
	width:70%;
`

const LinkCYF =styled.a`
	display:inline-block;
`