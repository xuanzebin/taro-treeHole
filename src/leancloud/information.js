// export async function fetchPictureMessage(files){
//     files.map(tempFilePath => () => new AV.File('filename', {
//         blob: {
//           uri: tempFilePath.url,
//         },
//       }).save()).reduce(
//         (m, p) => m.then(v => AV.Promise.all([...v, p()])),
//         AV.Promise.resolve([])
//       ).then((filesUrl) => {
//         let urlList = filesUrl.map(file => file.url())
//         console.log(urlList)
//         console.log(filesUrl)
//       }).catch(console.error);
// }