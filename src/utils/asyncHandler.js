
const asyncHandler = (requestHandler) =>{
   (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next).
    catch((error) =>next(error))
    }
}

export {asyncHandler}


// const asyncHandler = (handler) => async(req, res, next) => {
//     try {
        
//     } catch (error) {
//         error.status(error.statusCode || 500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }