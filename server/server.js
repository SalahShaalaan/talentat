import app from './app.js'

const PORT = process.env.PORT || 8081;
const errorChance = 0.1;

app.use((req, res, next) => {
    if (Math.random() <= errorChance) return res.status(500).send(undefined);
    else next();
})

app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}`));