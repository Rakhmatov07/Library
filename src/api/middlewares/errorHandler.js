export const errorHandler = (err, req, res) => {
    if( err instanceof Error ) {
        return res.status(500).json({error: 'Internal server error'});
    }else{
        return res.status(err.statusCode).json({error: err.message});
    }
};
