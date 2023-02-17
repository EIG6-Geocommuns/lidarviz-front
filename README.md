# Visualisateur LiDAR HD

## Contribution

### Installation des outils

1. Installer nvm pour utiliser la version de node définie dans `.nvmrc` => (`nvm install && vmv use`)
2. Installer yarn globalement à votre version npm : `npm install --global yarn`

### Installer les paquets et lancer l'app

1. Installer les paquets : `yarn install`
2. Lancer l'app : `yarn start`

### Pour lancer le projet avec docker

Construire l'image : `docker build . -t ign/lidarviz-front`
Lancer le projet : `docker run -p 3000:3000 ign/lidarviz-front`

## Autres scripts (par défaut avec create-react-app)

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
