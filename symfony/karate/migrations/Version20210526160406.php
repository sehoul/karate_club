<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210526160406 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE actions (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, INDEX IDX_548F1EFA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE activite (id INT AUTO_INCREMENT NOT NULL, nom_activite VARCHAR(255) NOT NULL, cotisation DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categorie (id INT AUTO_INCREMENT NOT NULL, nom_categorie VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE emploi_du_temps (id INT AUTO_INCREMENT NOT NULL, instructeur_id INT DEFAULT NULL, groupe VARCHAR(255) NOT NULL, date DATE NOT NULL, description VARCHAR(255) DEFAULT NULL, INDEX IDX_F86B32C125FCA809 (instructeur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE groupe (id INT AUTO_INCREMENT NOT NULL, instructeur_id INT DEFAULT NULL, activite_id INT DEFAULT NULL, nom_groupe VARCHAR(255) NOT NULL, INDEX IDX_4B98C2125FCA809 (instructeur_id), INDEX IDX_4B98C219B0F88B1 (activite_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE groupe_membre (id INT AUTO_INCREMENT NOT NULL, groupe_id INT DEFAULT NULL, membre_id INT DEFAULT NULL, INDEX IDX_9D8A07137A45358C (groupe_id), INDEX IDX_9D8A07136A99F74A (membre_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE information_medicale (id INT AUTO_INCREMENT NOT NULL, membre_id INT DEFAULT NULL, correspondant_medical VARCHAR(255) NOT NULL, adresse VARCHAR(255) NOT NULL, tel_1 VARCHAR(255) NOT NULL, tel_2 VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, date_premiere_visite DATE NOT NULL, observation VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_E3068BC56A99F74A (membre_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE instructeur (id INT AUTO_INCREMENT NOT NULL, num_licence_ffk VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, date_naissance DATE NOT NULL, genre VARCHAR(255) NOT NULL, categorie_ffk VARCHAR(255) NOT NULL, adresse VARCHAR(255) NOT NULL, tel_1 VARCHAR(255) NOT NULL, tel_2 VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, grade VARCHAR(255) NOT NULL, observation VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE membre (id INT AUTO_INCREMENT NOT NULL, categorie_id INT DEFAULT NULL, num_licence_ffk VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, date_naissance DATE NOT NULL, genre VARCHAR(255) NOT NULL, adresse VARCHAR(255) NOT NULL, telephone1 VARCHAR(255) NOT NULL, telephone2 VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, nom_parents VARCHAR(255) DEFAULT NULL, prenom_parents VARCHAR(255) DEFAULT NULL, telephone_parents1 VARCHAR(255) DEFAULT NULL, telephone_parents2 VARCHAR(255) DEFAULT NULL, email_parents VARCHAR(255) DEFAULT NULL, cotisation DOUBLE PRECISION DEFAULT NULL, date_inscription DATE DEFAULT NULL, grade VARCHAR(255) DEFAULT NULL, observation VARCHAR(255) DEFAULT NULL, malade TINYINT(1) DEFAULT NULL, INDEX IDX_F6B4FB29BCF5E72D (categorie_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE membre_activite (id INT AUTO_INCREMENT NOT NULL, membre_id INT DEFAULT NULL, avtivite_id INT DEFAULT NULL, cotisation DOUBLE PRECISION DEFAULT NULL, date_premiere_inscription DATE DEFAULT NULL, observation VARCHAR(255) DEFAULT NULL, INDEX IDX_D17BD266A99F74A (membre_id), INDEX IDX_D17BD265A88C21D (avtivite_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, role VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE actions ADD CONSTRAINT FK_548F1EFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE emploi_du_temps ADD CONSTRAINT FK_F86B32C125FCA809 FOREIGN KEY (instructeur_id) REFERENCES instructeur (id)');
        $this->addSql('ALTER TABLE groupe ADD CONSTRAINT FK_4B98C2125FCA809 FOREIGN KEY (instructeur_id) REFERENCES instructeur (id)');
        $this->addSql('ALTER TABLE groupe ADD CONSTRAINT FK_4B98C219B0F88B1 FOREIGN KEY (activite_id) REFERENCES activite (id)');
        $this->addSql('ALTER TABLE groupe_membre ADD CONSTRAINT FK_9D8A07137A45358C FOREIGN KEY (groupe_id) REFERENCES groupe (id)');
        $this->addSql('ALTER TABLE groupe_membre ADD CONSTRAINT FK_9D8A07136A99F74A FOREIGN KEY (membre_id) REFERENCES membre (id)');
        $this->addSql('ALTER TABLE information_medicale ADD CONSTRAINT FK_E3068BC56A99F74A FOREIGN KEY (membre_id) REFERENCES membre (id)');
        $this->addSql('ALTER TABLE membre ADD CONSTRAINT FK_F6B4FB29BCF5E72D FOREIGN KEY (categorie_id) REFERENCES categorie (id)');
        $this->addSql('ALTER TABLE membre_activite ADD CONSTRAINT FK_D17BD266A99F74A FOREIGN KEY (membre_id) REFERENCES membre (id)');
        $this->addSql('ALTER TABLE membre_activite ADD CONSTRAINT FK_D17BD265A88C21D FOREIGN KEY (avtivite_id) REFERENCES activite (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE groupe DROP FOREIGN KEY FK_4B98C219B0F88B1');
        $this->addSql('ALTER TABLE membre_activite DROP FOREIGN KEY FK_D17BD265A88C21D');
        $this->addSql('ALTER TABLE membre DROP FOREIGN KEY FK_F6B4FB29BCF5E72D');
        $this->addSql('ALTER TABLE groupe_membre DROP FOREIGN KEY FK_9D8A07137A45358C');
        $this->addSql('ALTER TABLE emploi_du_temps DROP FOREIGN KEY FK_F86B32C125FCA809');
        $this->addSql('ALTER TABLE groupe DROP FOREIGN KEY FK_4B98C2125FCA809');
        $this->addSql('ALTER TABLE groupe_membre DROP FOREIGN KEY FK_9D8A07136A99F74A');
        $this->addSql('ALTER TABLE information_medicale DROP FOREIGN KEY FK_E3068BC56A99F74A');
        $this->addSql('ALTER TABLE membre_activite DROP FOREIGN KEY FK_D17BD266A99F74A');
        $this->addSql('ALTER TABLE actions DROP FOREIGN KEY FK_548F1EFA76ED395');
        $this->addSql('DROP TABLE actions');
        $this->addSql('DROP TABLE activite');
        $this->addSql('DROP TABLE categorie');
        $this->addSql('DROP TABLE emploi_du_temps');
        $this->addSql('DROP TABLE groupe');
        $this->addSql('DROP TABLE groupe_membre');
        $this->addSql('DROP TABLE information_medicale');
        $this->addSql('DROP TABLE instructeur');
        $this->addSql('DROP TABLE membre');
        $this->addSql('DROP TABLE membre_activite');
        $this->addSql('DROP TABLE user');
    }
}
