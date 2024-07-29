export const signout = async (req, res, next) => {
    try {
        // clear the access token we had generated 
        // in signin and signup routes
        res.clearCookie('access_token').status(200).json({
            message : 'User has been signed out successfuly'
        });
    } catch (error) {
        next(error);
    }
}