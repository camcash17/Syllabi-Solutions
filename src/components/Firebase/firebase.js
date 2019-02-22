import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
};

class Firebase {
    constructor() {
      app.initializeApp(config);
  
      /* Helper */
  
      this.serverValue = app.database.ServerValue;
      this.emailAuthProvider = app.auth.EmailAuthProvider;
  
      /* Firebase APIs */
  
      this.auth = app.auth();
      this.db = app.database();
  
      /* Social Sign In Method Provider */
  
      this.googleProvider = new app.auth.GoogleAuthProvider();
      this.facebookProvider = new app.auth.FacebookAuthProvider();
      this.twitterProvider = new app.auth.TwitterAuthProvider();
    }

    // *** Admin API ***

    // *** Auth API ***
  
    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
  
    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
  
    doSignInWithGoogle = () =>
      this.auth.signInWithPopup(this.googleProvider);
  
    doSignInWithFacebook = () =>
      this.auth.signInWithPopup(this.facebookProvider);
  
    doSignInWithTwitter = () =>
      this.auth.signInWithPopup(this.twitterProvider);
  
    doSignOut = () => this.auth.signOut();
  
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
    doSendEmailVerification = () =>
      this.auth.currentUser.sendEmailVerification({
        url: 'http://localhost:8080/',
      });
  
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

    doDeleteUser = (id) => {
      this.db.ref('users/' + id).remove();
    }

    doCreateUser = (username, email, department, roles, userUid) => {
      let usersRef = this.db.ref('users/');
      usersRef.child(userUid).set({
          username: username,
          email: email,
          department: department,
          roles: roles
      })
    }

    doGetUserInfo = (userUid) => {
      let usersRef = this.db.ref('users/');
      let response;
      usersRef.on(userUid, function(snapshot) {
        console.log(snapshot.val());
        response = snapshot.val();
        return response;
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }

    doUpdateUserInfo = (userUid, userInfo) => {
      let usersRef = this.db.ref('users/');
      usersRef.child(userUid).set({
          username: userInfo.username,
          email: userInfo.email,
          department: userInfo.department,
          roles: userInfo.roles,
          suffix: userInfo.suffix,
          degree: userInfo.degree,
          university: userInfo.university,
          college: userInfo.college
      })
    }
  
    // *** Merge Auth and DB User API *** //
  
    onAuthUserListener = (next, fallback) =>
      this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.user(authUser.uid)
            .once('value')
            .then(snapshot => {
              const dbUser = snapshot.val();
              // default empty roles
              if (!dbUser.roles) {
                dbUser.roles = [];
              }
  
              // merge auth and db user
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                ...dbUser,
              };
  
              next(authUser);
            });
        } else {
          fallback();
        }
      });
  
    // *** User API ***
  
    user = uid => this.db.ref(`users/${uid}`);
  
    users = () => this.db.ref('users');
  
    // *** Message API ***
  
    message = uid => this.db.ref(`messages/${uid}`);
  
    messages = () => this.db.ref('messages');
  }
  
  export default Firebase;
  