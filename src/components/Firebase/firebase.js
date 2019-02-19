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

      // admin.initializeApp({
      //   credential: admin.credential.cert({
      //     projectId: process.env.PROJECT_ID,
      //     clientEmail: 'foo@'+process.env.PROJECT_ID+'.iam.gserviceaccount.com',
      //     privateKey: '-----BEGIN PRIVATE KEY-----\n'+process.env.API_KEY+'\n-----END PRIVATE KEY-----\n'
      //   }),
      //   databaseURL: process.env.DATABASE_URL
      // });
  
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

    // doRetrieveUserData = (uid) => {
    //   admin.auth().getUser(uid)
    //     .then(function(userRecord) {
    //       // See the UserRecord reference doc for the contents of userRecord.
    //       console.log("Successfully fetched user data:", userRecord.toJSON());
    //     })
    //     .catch(function(error) {
    //       console.log("Error fetching user data:", error);
    //     });
    // }

    // doRetrieveUserDataByEmail = (email) => {
    //   admin.auth().getUserByEmail(email)
    //     .then(function(userRecord) {
    //       // See the UserRecord reference doc for the contents of userRecord.
    //       console.log("Successfully fetched user data:", userRecord.toJSON());
    //     })
    //     .catch(function(error) {
    //       console.log("Error fetching user data:", error);
    //     });
    // }
  
    // doCreateUser = (userInfo) => {
    //   // admin.auth().createUser(userInfo)
    //   admin.auth().createUser({
    //     email: "user@example.com",
    //     emailVerified: false,
    //     phoneNumber: "+11234567890",
    //     password: "secretPassword",
    //     displayName: "John Doe",
    //     photoURL: "http://www.example.com/12345678/photo.png",
    //     disabled: false
    //   })
    //     .then(function(userRecord) {
    //       // See the UserRecord reference doc for the contents of userRecord.
    //       console.log("Successfully created new user:", userRecord.uid);
    //     })
    //     .catch(function(error) {
    //       console.log("Error creating new user:", error);
    //     });
    // }

    // doUpdateUser = (uid, userInfo) => {
    //   admin.auth().updateUser(uid,
    //     // userInfo
    //     {
    //     email: "modifiedUser@example.com",
    //     phoneNumber: "+11234567890",
    //     emailVerified: true,
    //     password: "newPassword",
    //     displayName: "Jane Doe",
    //     photoURL: "http://www.example.com/12345678/photo.png",
    //     disabled: true
    //   }
    //   )
    //     .then(function(userRecord) {
    //       // See the UserRecord reference doc for the contents of userRecord.
    //       console.log("Successfully updated user", userRecord.toJSON());
    //     })
    //     .catch(function(error) {
    //       console.log("Error updating user:", error);
    //     });
    // }

    // doDeleteUser = (uid) => {
    //   admin.auth().deleteUser(uid)
    //     .then(function() {
    //       console.log("Successfully deleted user");
    //     })
    //     .catch(function(error) {
    //       console.log("Error deleting user:", error);
    //     });
    // }
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
          username: userInfo.name,
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
  