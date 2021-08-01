import buildClient from "../api/buildClient";
const LandingPage = ({ currentUser }) => {
  return currentUser ? (<h1>You are signed in </h1>) : (<h1>You are not signed in </h1>);
};
  //this is our opportunity to attemp to fetch some data
  //that tihs landing page component needs during the server side rendering process 
  LandingPage.getInitialProps = async(context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');
    return data;
  }
  export default LandingPage;