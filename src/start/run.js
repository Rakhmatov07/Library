import { connect } from 'mongoose';
import { config } from '../../config/index.js';

export const run = async(app) => {
    try {

        await connect(config.dbUrl);

        app.listen(config.port, () => {
            console.log(`Server is running on port: ${config.port}`);
        })
    } catch (error) {
        console.log(error);      
    }
};
