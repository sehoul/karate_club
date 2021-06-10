# MANUEL D'INSTALLATION

---

### Server local

+ Telecharger et installer [Wampp](https://www.wampserver.com/#download-wrapper)

### Outils

+ Telecharger et installer [NodeJs](https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi)
+ Télecharger et installer [google Chrome](https://www.google.com/intl/fr_fr/chrome/)

### Installation Angular

+ Dans un terminal executer la commande `npm install -g @angular/cli`

### Symfony

+ Configurer le back end en passant par les etapes suivantes:

   1. Telecharger et installer [Composer](https://getcomposer.org/Composer-Setup.exe)
   2. Telecharger et installer [Symfony](https://get.symfony.com/cli/setup.exe)
   3. Télecharger le projet en format .zip et l'extraire dans un dossier ... [Projet](https://github.com/sehoul/karate_club)


### Wampp

   + Lancer Wampp


### Installation

##### Angular
 
   + Dans un terminal accedez au dossier 'C:/.../karate_club/angular/karate' et executez les commandes:
      
      1. `npm i`
      2. `ng serve`

---

##### Symfony

   + Dans un terminal accedez au dossier 'C:/.../karate_club/symfony/karate' et executez les commandes:
      
      1. `composer install`
      2. `symfony console doctrine:database:create`
      3. `symfony console doctrine:schema:update --force`
      4. `symfony console doctrine:migrations:migrate`
      5. `symfony console doctrine:fixtures:load`
      6. `symfony serve`

---

### Dernieres etapes

   1. Appuyer sur `Win + R` et lancer la commande `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-securit`
   2. Acceder au http://localhost:4200/  depuis google chrome
   3. Connectez-vous en tant que admin 
         * Email: `admin`
         * Mot de passe `admin`

