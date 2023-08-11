import { sequelize } from '../../database/index.js';
import { config } from '../../config/index.js';
import { runAssociation } from '../../models/association.js';

export const run = async(app) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        runAssociation();

        app.listen(config.port, () => {
            console.log(`Server is running on port: ${config.port}`);
        })
    } catch (error) {
        console.log(error);      
    }
};
