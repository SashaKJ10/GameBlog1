import SnoopDog from '../images/UserImg/SnoopDog.jpg';
function Account({ userInfo, signedIn }) {
  const classes = {
    imageContainer: `flex flex-col items-center`,
    roleContainer: `flex items-center justify-center py-3`,
  };

  let admin = localStorage.getItem('admin');
  let signedUserInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
  const signedInUser = localStorage.getItem('user');
  return (
    <div>
      <div className={classes.imageContainer}>
        <img src={SnoopDog} className="w-15 h-15" />
      </div>
      <div className="flex justify-center items-center">
        {signedUserInfo?.email}
      </div>
      <div className="flex justify-center items-center">
        {signedUserInfo?.password}
      </div>
      <div className={classes.roleContainer}>
        <h1>
          {signedUserInfo?.name === admin && signedInUser ? 'admin' : null}
        </h1>
      </div>
    </div>
  );
}

export default Account;
