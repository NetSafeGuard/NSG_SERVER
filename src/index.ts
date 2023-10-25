import express from 'express';
import 'dotenv/config';
import { router } from './router/user.route';


const app = express();

app.use('/api/v1/user', router);

app.all("/*", (req,res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find [${req.method}] ${req.originalUrl} on this server!`
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});