<?php

namespace App\Entity;

use App\Repository\MembreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MembreRepository::class)
 */
class Membre
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
    private $DateNaissance;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Genre;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Groupe;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Adresse;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Telephone1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Telephone2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $NomParents;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $PrenomParents;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $TelephoneParents1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $TelephoneParents2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $EmailParents;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $Cotisation;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $DateInscription;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Grade;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Observation;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $malade;



    /**
     * @ORM\ManyToOne(targetEntity=Categorie::class, inversedBy="membres")
     */
    private $categorie;

    /**
     * @ORM\OneToOne(targetEntity=InformationMedicale::class, mappedBy="membre", cascade={"persist", "remove"})
     */
    private $informationMedicale;

    /**
     * @ORM\ManyToMany(targetEntity=Activite::class, mappedBy="membres")
     */
    private $activites;

    public function __construct()
    {
        $this->activites = new ArrayCollection();
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
        return $this->DateNaissance;
    }

    public function setDateNaissance(\DateTimeInterface $DateNaissance): self
    {
        $this->DateNaissance = $DateNaissance;

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

    public function getGroupe(): ?string
    {
        return $this->Groupe;
    }

    public function setGroupe(string $Groupe): self
    {
        $this->Groupe = $Groupe;

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

    public function getTelephone1(): ?string
    {
        return $this->Telephone1;
    }

    public function setTelephone1(string $Telephone1): self
    {
        $this->Telephone1 = $Telephone1;

        return $this;
    }

    public function getTelephone2(): ?string
    {
        return $this->Telephone2;
    }

    public function setTelephone2(?string $Telephone2): self
    {
        $this->Telephone2 = $Telephone2;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->Email;
    }

    public function setEmail(?string $Email): self
    {
        $this->Email = $Email;

        return $this;
    }

    public function getNomParents(): ?string
    {
        return $this->NomParents;
    }

    public function setNomParents(?string $NomParents): self
    {
        $this->NomParents = $NomParents;

        return $this;
    }

    public function getPrenomParents(): ?string
    {
        return $this->PrenomParents;
    }

    public function setPrenomParents(?string $PrenomParents): self
    {
        $this->PrenomParents = $PrenomParents;

        return $this;
    }

    public function getTelephoneParents1(): ?string
    {
        return $this->TelephoneParents1;
    }

    public function setTelephoneParents1(?string $TelephoneParents1): self
    {
        $this->TelephoneParents1 = $TelephoneParents1;

        return $this;
    }

    public function getTelephoneParents2(): ?string
    {
        return $this->TelephoneParents2;
    }

    public function setTelephoneParents2(?string $TelephoneParents2): self
    {
        $this->TelephoneParents2 = $TelephoneParents2;

        return $this;
    }

    public function getEmailParents(): ?string
    {
        return $this->EmailParents;
    }

    public function setEmailParents(?string $EmailParents): self
    {
        $this->EmailParents = $EmailParents;

        return $this;
    }

    public function getCotisation(): ?float
    {
        return $this->Cotisation;
    }

    public function setCotisation(?float $Cotisation): self
    {
        $this->Cotisation = $Cotisation;

        return $this;
    }

    public function getDateInscription(): ?\DateTimeInterface
    {
        return $this->DateInscription;
    }

    public function setDateInscription(?\DateTimeInterface $DateInscription): self
    {
        $this->DateInscription = $DateInscription;

        return $this;
    }

    public function getGrade(): ?string
    {
        return $this->Grade;
    }

    public function setGrade(?string $Grade): self
    {
        $this->Grade = $Grade;

        return $this;
    }

    public function getObservation(): ?string
    {
        return $this->Observation;
    }

    public function setObservation(?string $Observation): self
    {
        $this->Observation = $Observation;

        return $this;
    }

    public function getMalade(): ?bool
    {
        return $this->malade;
    }

    public function setMalade(?bool $malade): self
    {
        $this->malade = $malade;

        return $this;
    }



    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): self
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getInformationMedicale(): ?InformationMedicale
    {
        return $this->informationMedicale;
    }

    public function setInformationMedicale(?InformationMedicale $informationMedicale): self
    {
        // unset the owning side of the relation if necessary
        if ($informationMedicale === null && $this->informationMedicale !== null) {
            $this->informationMedicale->setMembre(null);
        }

        // set the owning side of the relation if necessary
        if ($informationMedicale !== null && $informationMedicale->getMembre() !== $this) {
            $informationMedicale->setMembre($this);
        }

        $this->informationMedicale = $informationMedicale;

        return $this;
    }

    /**
     * @return Collection|Activite[]
     */
    public function getActivites(): Collection
    {
        return $this->activites;
    }

    public function addActivite(Activite $activite): self
    {
        if (!$this->activites->contains($activite)) {
            $this->activites[] = $activite;
            $activite->addMembre($this);
        }

        return $this;
    }

    public function removeActivite(Activite $activite): self
    {
        if ($this->activites->removeElement($activite)) {
            $activite->removeMembre($this);
        }

        return $this;
    }
}
