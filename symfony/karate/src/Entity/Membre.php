<?php

namespace App\Entity;

use App\Repository\MembreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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
     * @Groups({"membre:info"})
     */
    private $NumLicenceFFK;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"membre:info"})
     */
    private $Nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"membre:info"})
     */
    private $Prenom;

    /**
     * @ORM\Column(type="date")
     * @Groups({"membre:info"})
     */
    private $DateNaissance;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"membre:info"})
     */
    private $Genre;



    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"membre:info"})
     */
    private $Adresse;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"membre:info"})
     */
    private $Telephone1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $Telephone2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $Email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $NomParents;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $PrenomParents;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $TelephoneParents1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $TelephoneParents2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $EmailParents;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"membre:info"})
     */
    private $Cotisation;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups({"membre:info"})
     */
    private $DateInscription;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $Grade;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"membre:info"})
     */
    private $Observation;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $malade;



    /**
     * @ORM\ManyToOne(targetEntity=Categorie::class, inversedBy="membres")
     * @Groups({"membre:categorie"})
     */
    private $categorie;

    /**
     * @ORM\OneToOne(targetEntity=InformationMedicale::class, mappedBy="membre", cascade={"persist", "remove"})
     */
    private $informationMedicale;

    /**
     * @ORM\OneToMany(targetEntity=MembreActivite::class, mappedBy="membre")
     */
    private $membreActivites;

    /**
     * @ORM\OneToMany(targetEntity=GroupeMembre::class, mappedBy="Membre")
     */
    private $GroupesMembre;

    public function __construct()
    {
        $this->membreActivites = new ArrayCollection();
        $this->GroupesMembre = new ArrayCollection();
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
     * @return Collection|MembreActivite[]
     */
    public function getMembreActivites(): Collection
    {
        return $this->membreActivites;
    }

    public function addMembreActivite(MembreActivite $membreActivite): self
    {
        if (!$this->membreActivites->contains($membreActivite)) {
            $this->membreActivites[] = $membreActivite;
            $membreActivite->setMembre($this);
        }

        return $this;
    }

    public function removeMembreActivite(MembreActivite $membreActivite): self
    {
        if ($this->membreActivites->removeElement($membreActivite)) {
            // set the owning side to null (unless already changed)
            if ($membreActivite->getMembre() === $this) {
                $membreActivite->setMembre(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|GroupeMembre[]
     */
    public function getGroupesMembre(): Collection
    {
        return $this->GroupesMembre;
    }

    public function addGroupesMembre(GroupeMembre $groupesMembre): self
    {
        if (!$this->GroupesMembre->contains($groupesMembre)) {
            $this->GroupesMembre[] = $groupesMembre;
            $groupesMembre->setMembre($this);
        }

        return $this;
    }

    public function removeGroupesMembre(GroupeMembre $groupesMembre): self
    {
        if ($this->GroupesMembre->removeElement($groupesMembre)) {
            // set the owning side to null (unless already changed)
            if ($groupesMembre->getMembre() === $this) {
                $groupesMembre->setMembre(null);
            }
        }

        return $this;
    }

}
