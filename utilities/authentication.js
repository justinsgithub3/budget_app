export const authenticate = () => {
    if (req.session.userId) {
        res.redirect('/display/level2');
    }
}


