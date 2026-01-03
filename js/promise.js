const myPromise = new Promise( ( fulfill, reject ) => {
  const myResult = true;
  setTimeout(() => {
    if( myResult === true ) {
        fulfill( "This Promise was successful." );    
    } else {
        reject( new Error( "This Promise has been rejected." ) );
    }
  }, 1000);
});

console.log( myPromise );

myPromise.then(
    ( result ) => {
        console.log( result );
    },
    ( error ) => {
        console.log( error );
    }
);