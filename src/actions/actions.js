
const receiveAlbumList = (albumList) => ({
    type: 'RECEIVE_ALBUM_LIST',
    albumList
})

export const fetchAlbumList = (bucket) => {
    return dispatch => {
        bucket.listObjects({ Delimiter: '/' }, (err, data) => {
            if (err) {
                return alert('There was an error listing your albums: ' + err.message);
            }
            const albumList = data.CommonPrefixes.map(commonPrefix => {
                const prefix = commonPrefix.Prefix;
                return decodeURIComponent(prefix.replace('/', ''));
            })
            dispatch(receiveAlbumList(albumList))
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



