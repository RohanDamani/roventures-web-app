export const storeBucket = (bucket) => ({
    type: 'STORE_BUCKET',
    bucket
});


export const toggleShowType = (type) => ({
    type: 'TOGGLE_SHOW_TYPE',
    newType: type
});

export const toggleShowCount = (count) => ({
    type: 'TOGGLE_SHOW_COUNT',
    count
});

export const toggleShowAlbum = (album) => ({
    type: 'TOGGLE_SHOW_ALBUM',
    album
});

export const toggleEmailLoading = (loading) => ({
    type: 'TOGGLE_EMAIL_LOADING',
    loading
});

export const toggleEmailError = (error) => ({
    type: 'TOGGLE_EMAIL_ERROR',
    error
});

export const toggleEmailSuccess = (success) => ({
    type: 'TOGGLE_EMAIL_SUCCESS',
    success
});

const receiveAlbumList = (albumList) => ({
    type: 'RECEIVE_ALBUM_LIST',
    albumList
});

const receiveAlbumData = (data) => ({
    type: 'RECEIVE_ALBUM_DATA',
    payload: data
});

export const fetchAlbum = (bucket, album) => {
    return dispatch => {
        // AWS-sdk for s3 object
        bucket.listObjects({ Prefix: album }, (err, data) => {
            if (err) {
                return alert('There was an error viewing your album: ' + err.message);
            }
            dispatch(receiveAlbumData(data))
        });
    }
};

export const fetchAlbumList = (bucket) => {
    return dispatch => {
        // AWS-sdk for s3 object
        bucket.listObjects({ Delimiter: '/' }, (err, data) => {
            if (err) {
                return alert('There was an error listing your albums: ' + err.message);
            }
            const albumList = data.CommonPrefixes.map(commonPrefix => {
                const prefix = commonPrefix.Prefix;
                return decodeURIComponent(prefix.replace('/', ''));
            })
            dispatch(receiveAlbumList(albumList));
        })
    }
};


// const receiveAttorneyLookup = (json) => ({
//     type: 'RECEIVE_ATTORNEY_LOOKUP',
//     json
// })
//
// export const attorneyLookup = (barNum) => {
//     const url = envChecker(buildURL({route: "efsp",  params: {q: `efsp/attorneylist&bar_number=${barNum}`}}), `http://localhost/public-portal/?q=efsp/attorneylist&bar_number=${barNum}`)
//     return dispatch => {
//         fetch(url, {
//             method: 'GET',
//             credentials: envChecker("same-origin", "include"),
//         })
//             .then((response) => response.json())
//             .then((json) => {dispatch(receiveAttorneyLookup(json.success.data))})
//     }
// }



