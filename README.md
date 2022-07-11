# Créez un réseau social d’entreprise

_Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues._

## Spécifications fonctionnelles


### Page de connexion
_Une page de connexion permettant à l’utilisateur de se connecter, ou bien
de créer un compte s’il n’en possède pas. Ici il faut demander le minimum
d’informations, la connexion doit se faire à partir de deux éléments : le mail
de l’employé, et un mot de passe. Rien de plus à prévoir pour le moment.
Détails de la fonctionnalité de connexion_

_● Un utilisateur doit avoir la possibilité de se déconnecter._

_● La session de l’utilisateur persiste pendant qu’il est connecté._

_● Les données de connexion doivent être sécurisées._

### Page d’accueil

_La page d’accueil doit lister les posts créés par les différents utilisateurs.
On voudra que les posts soient listés de façon antéchronologique (du plus
récent au plus ancien)._

### Création d’un post

_● Un utilisateur doit pouvoir créer un post._ 

_● Un post doit pouvoir contenir du texte et une image._

_● Un utilisateur doit aussi pouvoir modifier et supprimer ses posts._

### Système de like
_Un utilisateur doit pouvoir liker un post, une seule fois pour chaque post._

### Rôle administrateur

_Dans le but de pouvoir faire de la modération si nécessaire, il faudra créer
un utilisateur “administrateur” ; celui-ci aura les droits de modification /
suppression sur tous les posts du réseau social. Il faudra donc nous
communiquer les identifiants de cet administrateur._

## Outils utilisés

### Dans le backend :
_● Node.js_

_● Express_

_● Mongoose_

_● MongoDB_

### Dans le frontend :

_● React_

## Pour démarrer l'application

### Dans le backend

_1. à l'intérieur du dossier backend, vous devez créer un fichier .env avec les variables suivantes:_
_DB_PORT =?_

_DB_DATABASE =?_

_DB_TOKEN =?_

_2. à l'intérieur du dossier backend, utilisez la commande npm install dans le terminal_

_3. après avoir installé les modules et les dépendances, utiliser la commande nodemon server dans le terminal qui nous permettra de démarrer le serveur_

### Dans le frontend 
_1. à l'intérieur du dossier frontend, utilisez la commande npm install dans le terminal_

_3. après avoir installé les modules et les dépendances, utiliser la commande npm start dans le terminal qui nous permettra de démarrer react_
