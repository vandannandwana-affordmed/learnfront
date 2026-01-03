const firstPromise  = new Promise( ( fulfill, reject ) => fulfill( "Successful. ") );
const secondPromise = new Promise( ( fulfill, reject ) => fulfill( "Successful. ") );
const thirdPromise  = new Promise( ( fulfill, reject ) => fulfill( "Successful. ") );
const failedPromise = new Promise( ( fulfill, reject ) => reject( "Failed.") );
const successfulPromises = [ firstPromise, secondPromise, thirdPromise ];
const oneFailedPromise = [ ...successfulPromises, failedPromise ];

// Promise.all( successfulPromises )
//   .then( ( allValues ) => {
//     console.log( allValues );
//   })
//   .catch( ( failValue ) => {
//     console.error( failValue );
//   });

Promise.allSettled( oneFailedPromise  )
    .then( ( allValues ) => {
      console.log( allValues );
    })
    .catch( ( failValue ) => {
     console.error( failValue );
    });