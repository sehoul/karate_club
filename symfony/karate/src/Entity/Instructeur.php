<?php

namespace App\Entity;

use App\Repository\InstructeurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
    private $Adresse;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Tel_1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
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

    /**
     * @ORM\OneToMany(targetEntity=Groupe::class, mappedBy="instructeur")
     */
    private $GroupeEncadre;

    /**
     * @ORM\OneToMany(targetEntity=EmploiDuTemps::class, mappedBy="instructeur")
     */
    private $EmploiDuTemps;

    public function __construct()
    {
        $this->GroupeEncadre = new ArrayCollection();
        $this->EmploiDuTemps = new ArrayCollection();
    }

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

    /**
     * @return Collection|Groupe[]
     */
    public function getGroupeEncadre(): Collection
    {
        return $this->GroupeEncadre;
    }

    public function addGroupeEncadre(Groupe $groupeEncadre): self
    {
        if (!$this->GroupeEncadre->contains($groupeEncadre)) {
            $this->GroupeEncadre[] = $groupeEncadre;
            $groupeEncadre->setInstructeur($this);
        }

        return $this;
    }

    public function removeGroupeEncadre(Groupe $groupeEncadre): self
    {
        if ($this->GroupeEncadre->removeElement($groupeEncadre)) {
            // set the owning side to null (unless already changed)
            if ($groupeEncadre->getInstructeur() === $this) {
                $groupeEncadre->setInstructeur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|EmploiDuTemps[]
     */
    public function getEmploiDuTemps(): Collection
    {
        return $this->EmploiDuTemps;
    }

    public function addEmploiDuTemp(EmploiDuTemps $emploiDuTemp): self
    {
        if (!$this->EmploiDuTemps->contains($emploiDuTemp)) {
            $this->EmploiDuTemps[] = $emploiDuTemp;
            $emploiDuTemp->setInstructeur($this);
        }

        return $this;
    }

    public function removeEmploiDuTemp(EmploiDuTemps $emploiDuTemp): self
    {
        if ($this->EmploiDuTemps->removeElement($emploiDuTemp)) {
            // set the owning side to null (unless already changed)
            if ($emploiDuTemp->getInstructeur() === $this) {
                $emploiDuTemp->setInstructeur(null);
            }
        }

        return $this;
    }
}
