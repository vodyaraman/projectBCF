const express = require('express');
const corsMiddleware = require('./middleware/cors');
const bodyParserMiddleware = require('./middleware/bodyParser');
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');

const app = express();
const HOST = "89.111.170.13";
const PORT = 3001;

console.log("Update")

app.use(corsMiddleware);
app.use(bodyParserMiddleware);

app.use('/articles', articleRoutes);
app.use('/users', userRoutes);
app.use('/files', fileRoutes);
app.use('/reviews', reviewsRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Server is running at ${HOST}:${PORT}`);
});
