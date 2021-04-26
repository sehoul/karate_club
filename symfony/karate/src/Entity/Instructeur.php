<?php

namespace App\Entity;

use App\Repository\InstructeurRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=InstructeurRepository::class)
 */
class Instructeur
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $NumLicenceFFK;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Nom;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Prenom;

    /**
     * @ORM\Column(type="date")
     */
    private $Date_naissance;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Genre;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $CategorieFFK;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Groupe_Encadré;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Adresse;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Tel_1;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Tel_2;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Grade;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Observation;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumLicenceFFK(): ?string
    {
        return $this->NumLicenceFFK;
    }

    public function setNumLicenceFFK(string $NumLicenceFFK): self
    {
        $this->NumLicenceFFK = $NumLicenceFFK;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->Nom;
    }

    public function setNom(string $Nom): self
    {
        $this->Nom = $Nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->Prenom;
    }

    public function setPrenom(string $Prenom): self
    {
        $this->Prenom = $Prenom;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->Date_naissance;
    }

    public function setDateNaissance(\DateTimeInterface $Date_naissance): self
    {
        $this->Date_naissance = $Date_naissance;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->Genre;
    }

    public function setGenre(string $Genre): self
    {
        $this->Genre = $Genre;

        return $this;
    }

    public function getCategorieFFK(): ?string
    {
        return $this->CategorieFFK;
    }

    public function setCategorieFFK(string $CategorieFFK): self
    {
        $this->CategorieFFK = $CategorieFFK;

        return $this;
    }

    public function getGroupeEncadré(): ?string
    {
        return $this->Groupe_Encadré;
    }

    public function setGroupeEncadré(string $Groupe_Encadré): self
    {
        $this->Groupe_Encadré = $Groupe_Encadré;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->Adresse;
    }

    public function setAdresse(string $Adresse): self
    {
        $this->Adresse = $Adresse;

        return $this;
    }

    public function getTel1(): ?string
    {
        return $this->Tel_1;
    }

    public function setTel1(string $Tel_1): self
    {
        $this->Tel_1 = $Tel_1;

        return $this;
    }

    public function getTel2(): ?string
    {
        return $this->Tel_2;
    }

    public function setTel2(string $Tel_2): self
    {
        $this->Tel_2 = $Tel_2;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->Email;
    }

    public function setEmail(string $Email): self
    {
        $this->Email = $Email;

        return $this;
    }

    public function getGrade(): ?string
    {
        return $this->Grade;
    }

    public function setGrade(string $Grade): self
    {
        $this->Grade = $Grade;

        return $this;
    }

    public function getObservation(): ?string
    {
        return $this->Observation;
    }

    public function setObservation(string $Observation): self
    {
        $this->Observation = $Observation;

        return $this;
    }
}
