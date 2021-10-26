const express = require('express') 
const path = require('path')

const app = express(); 
 
app.use(express.static(path.join(__dirname,'public'))); 

app.use('/api/makes',require('./routes/api/makes'));  
app.use('/api/makes/:manufcature/:year',require('./routes/api/makes')); 
app.use('/api/makes/:vin',require('./routes/api/makes'));

const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));



