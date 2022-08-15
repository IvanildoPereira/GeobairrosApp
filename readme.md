<h1 align="center">
    <img alt="ShopApp" src="./github/icon.png" width = "100" />
    <br>
    Geobairros APP 
</h1>
<h4 align="center">
  Microentrepreneurship has grown in the world in recent times, this happens because of times of eco-
nomic crisis and unemployment, but also the emergence of new markets and opportunities. In Brazil,
most micro-entrepreneurs are merchants and service providers who do not know about marketing and
digital dissemination, something currently essential for the growth and prosperity of a business and
social networks as a form of dissemination and communication and in the influence of the media in the
purchase decision by consumers. The purpose of this project of technologies
applied to the development of an application for easy-to-use mobile devices aimed at promoting small
businesses, expanding the reach to new customers, and help to boost revenue. The result reached at
the end of this research was the elaboration of GeoBairros, which is a software developed in the Javas-
cript language, which makes it possible, from a register, to disclose and find service providers closest
to the user's location.
</h4>


<p align="center">
  <a href="#computer-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<!--<p align="center">
  <img alt="Demo gif" src="./github/demo_video.gif" style="max-width:100%;">  
</p>-->

<br>
<p align="center">
  <a href="https://expo.dev/@nildo456/Geobairros_App" target = "_blank" rel="nofollow">
    <img alt="Live Demo on Expo" src="./github/expo_live_demo.png" style="max-width:100%;">
  </a>
    <a href="https://buscakiapi.herokuapp.com/"  target = "_blank" rel="nofollow">
    <img alt="Demo on Heroku" src="./github/demo_button.png" style="max-width:100%;">
  </a>
</p>

<p align="center">
  <a href="https://www.figma.com/file/yZgirOnUja3O5fYS5afpHu/GeoBarros-APp?node-id=1%3A28" target = "_blank" rel="nofollow">
    <img alt="Design of the project on figma" src="./github/figma_button.png" style="max-width:100%;">
  </a>
</p>

<p align="center">This project was builded to the undergraduate final project of the college, you can see the final paper in the link below.</p>
<p align="center"><a href = "https://github.com/IvanildoPereira/GeobairrosApp/blob/main/final_paper_documentation/geobairros-artigo.pdf"><u>Final Paper Geobairros App (Portuguese version)</u></a></p>


## :computer: Features
**BackEnd**
- Authentication System with JWT
- Upload of Images files
- Feel free to test the other features on the [**Live demo**](https://buscakiapi.herokuapp.com/).

**FrontEnd**
- Beautiful Screens
- Map Navigation
- Brasilian code postal (CEP)
- Fill up address location with Open Street API
- Carousel Product Images
- Feel free to test the other features on the [**Live demo**](https://expo.dev/@nildo456/Geobairros_App).

## :rocket: Technologies

This project was developed to improve my knowledges to become a FullStack Developer and to build this Project I used this technologies:

**BackEnd**
- [NodeJS](https://nodejs.org)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Multer](https://www.npmjs.com/package/multer)
- [Sequelize](https://sequelize.org/)
- And another bunch of packages....


**FrontEnd**
- [ReactJS](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Formik](https://formik.org/)
- [Styled Components](https://styled-components.com/)
- And another bunch of packages....

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js][nodejs] + [NPM][npm] installed on your computer.
You'll also need to setup and run a **Postgres** or **MYSQL** and a **Redis** database. After finish all steps, insert the access informations into a **.env** file, based on a .env.example file that is provided in the backend and the frontEnd folder.
From your command line:

```bash
# Clone this repository
$ git clone https://github.com/IvanildoPereira/GeoBairrosApp.git

# Go into the repository
$ cd GeoBairrosApp

# Install dependencies for the backend
$ cd backend
$ npm install

# Run migrations to your database
$ npx sequelize db:migrate

# Run the backend server on development environment
$ npm start

# Building Docker the backend
$ cd backend
$ docker build .

# Run the infra of the backend like DB and the node
$ docker-compose up


# Install dependencies for the frontend and run the server
$ cd frontend
$ npm install
$ npm start
```

## :memo: License

This project is under the MIT license.

---

Made with ♥ by 
 - Ivanildo Pereira :wave: [Get in touch!](https://www.linkedin.com/in/ivanildopconceicao/)
 - Roberta Santos :wave: [Get in touch!](https://www.linkedin.com/in/robertacsantos)
 - Joel Rodrigues :wave:

[nodejs]: https://nodejs.org/
[npm]: https://www.npmjs.com/

