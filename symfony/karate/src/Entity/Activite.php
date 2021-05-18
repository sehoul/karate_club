<?php

namespace App\Entity;

use App\Repository\ActiviteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ActiviteRepository::class)
 */
class Activite
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"Activite"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"Activite"})
     */
    private $nomActivite;

    /**
     * @ORM\Column(type="float" , nullable=true)
     * @Groups({"Activite"})
     */
    private $cotisation;

    /**
     * @ORM\OneToMany(targetEntity=Groupe::class, mappedBy="activite")
     * @Groups({"Activite:Groupe"})
     */
    private $Groupe;

    /**
     * @ORM\OneToMany(targetEntity=MembreActivite::class, mappedBy="Avtivite")
     * @Groups({"Activite:Membre"})
     */
    private $membreActivites;

    public function __construct()
    {
        $this->Groupe = new ArrayCollection();
        $this->membreActivites = new ArrayCollection();
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

    public function getCotisation(): ?float
    {
        return $this->cotisation;
    }

    public function setCotisation(float $cotisation): self
    {
        $this->cotisation = $cotisation;

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
            $membreActivite->setAvtivite($this);
        }

        return $this;
    }

    public function removeMembreActivite(MembreActivite $membreActivite): self
    {
        if ($this->membreActivites->removeElement($membreActivite)) {
            // set the owning side to null (unless already changed)
            if ($membreActivite->getAvtivite() === $this) {
                $membreActivite->setAvtivite(null);
            }
        }

        return $this;
    }

}
