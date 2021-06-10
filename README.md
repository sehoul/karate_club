# MANUEL D'INSTALLATION

---

#### Server local

⋅⋅*Telecharger et installer [Wampp](https://www.wampserver.com/#download-wrapper)

### Outils

⋅⋅*Telecharger et installer [NodeJs](https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi)

### Installation Angular

⋅⋅*Dans un terminal executer la commande `npm install -g @angular/cli`

### Symfony

⋅⋅*Configurer le back end en passant par les etapes suivantes:
   3. Telecharger et installer [Composer](https://getcomposer.org/Composer-Setup.exe)
   4. Telecharger et installer [Symfony](https://get.symfony.com/cli/setup.exe)
   5. Télecharger Le Proje en format .zip et le extraire dans un dossier ... [Projet](https://github.com/sehoul/karate_club)



6.  Acceder au dossier par le  terminal  windows cmd au : `C:/.../karate_club/angular/karate et executer les commandes  npm i ensuite ng serve`
7. Acceder au dossier par le  terminal  windows cmd au : `C:/.../karate_club/symfony/karate et executer la commande composer install
8. Lancer Wampp 
9. Dans le meme terminal de l'etape 7 , executer les commandes : 
   1. `symfony console doctrine:database:create` 
   2. `symfony console doctrine:schema:update --force`
   3. `symfony console doctrine:migrations:migrate `
   4. `symfony console doctrine:fixtures:load `
   5. `symfony serve `
10. `Télecharger et installer googlechrome `(https://www.google.com/intl/fr_fr/chrome/) `
11. Appuyer sur Win + r et lancer la commande : `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-securit`
12. Acceder au http://localhost:4200/  depuis google chrome    
13. il faut se connecter avec admin , mot de passe : admin la premiere fois

