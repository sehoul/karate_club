<?php

namespace App\Entity;

use App\Repository\ActiviteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ActiviteRepository::class)
 */
class Activite
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
    private $nomActivite;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $numLicenceFFk;

    /**
     * @ORM\Column(type="float")
     */
    private $cotisation;

    /**
     * @ORM\Column(type="date")
     */
    private $datePremiereInscription;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $observation;

    /**
     * @ORM\OneToMany(targetEntity=Groupe::class, mappedBy="activite")
     */
    private $Groupe;

    /**
     * @ORM\ManyToMany(targetEntity=Membre::class, inversedBy="activites")
     */
    private $membres;

    public function __construct()
    {
        $this->Groupe = new ArrayCollection();
        $this->membres = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomActivite(): ?string
    {
        return $this->nomActivite;
    }

    public function setNomActivite(string $nomActivite): self
    {
        $this->nomActivite = $nomActivite;

        return $this;
    }

    public function getNumLicenceFFk(): ?string
    {
        return $this->numLicenceFFk;
    }

    public function setNumLicenceFFk(string $numLicenceFFk): self
    {
        $this->numLicenceFFk = $numLicenceFFk;

        return $this;
    }

    public function getCotisation(): ?float
    {
        return $this->cotisation;
    }

    public function setCotisation(float $cotisation): self
    {
        $this->cotisation = $cotisation;

        return $this;
    }

    public function getDatePremiereInscription(): ?\DateTimeInterface
    {
        return $this->datePremiereInscription;
    }

    public function setDatePremiereInscription(\DateTimeInterface $datePremiereInscription): self
    {
        $this->datePremiereInscription = $datePremiereInscription;

        return $this;
    }

    public function getObservation(): ?string
    {
        return $this->observation;
    }

    public function setObservation(?string $observation): self
    {
        $this->observation = $observation;

        return $this;
    }

    /**
     * @return Collection|Groupe[]
     */
    public function getGroupe(): Collection
    {
        return $this->Groupe;
    }

    public function addGroupe(Groupe $groupe): self
    {
        if (!$this->Groupe->contains($groupe)) {
            $this->Groupe[] = $groupe;
            $groupe->setActivite($this);
        }

        return $this;
    }

    public function removeGroupe(Groupe $groupe): self
    {
        if ($this->Groupe->removeElement($groupe)) {
            // set the owning side to null (unless already changed)
            if ($groupe->getActivite() === $this) {
                $groupe->setActivite(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|membre[]
     */
    public function getMembres(): Collection
    {
        return $this->membres;
    }

    public function addMembre(membre $membre): self
    {
        if (!$this->membres->contains($membre)) {
            $this->membres[] = $membre;
        }

        return $this;
    }

    public function removeMembre(membre $membre): self
    {
        $this->membres->removeElement($membre);

        return $this;
    }
}
