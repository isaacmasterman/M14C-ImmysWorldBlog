require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', engine({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
      formatDate: function (date) {
          return new Date(date).toLocaleDateString("en-US", {
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
          });
      }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}));

app.use((req, res, next) => {
  res.locals.logged_in = req.session.logged_in || false;
  next();
});

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });