// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseApiUrl: 'https://outbound-io.fusioninspect.com/',
  baseApiUrl: 'http://identity-mgt.transroadservices.com/', //Version 2 Api's  baseURL
  workspaceApiUrl: 'http://application-webservices.transroadservices.com/', //Version 2 Api's for workspaces
  downloadImageApiUrl: 'https://outbound-io.fusioninspect.com/v2/bug/file/',
  firebaseConfig: {
    apiKey: 'AIzaSyBCv5vcTASntu7T6kCjkZDx-Y4pv_kzn5g',
    authDomain: 'test-angular-app-35764.firebaseapp.com',
    projectId: 'test-angular-app-35764',
    storageBucket: 'test-angular-app-35764.appspot.com',
    messagingSenderId: '260456730922',
    appId: '1:260456730922:web:748c7a948f631d44504e53',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
