<?php

namespace App\Entity;

use App\Repository\SaisonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SaisonRepository::class)
 */
class Saison
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
    private $NomSaison;

    /**
     * @ORM\Column(type="date")
     */
    private $DateSaison;

    /**
     * @ORM\OneToMany(targetEntity=SaisonMembre::class, mappedBy="saison")
     */
    private $saisonMembres;

    /**
     * @ORM\Column(type="date")
     */
    private $DateFinSaison;

    public function __construct()
    {
        $this->saisonMembres = new ArrayCollection();
    }

    public function setId(int $id): self
    {
         $this->id=$id;
         return $this;
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomSaison(): ?string
    {
        return $this->NomSaison;
    }

    public function setNomSaison(string $NomSaison): self
    {
        $this->NomSaison = $NomSaison;
        
        return $this;
    }

    public function getDateSaison(): ?\DateTimeInterface
    {
        return $this->DateSaison;
    }

    public function setDateSaison(\DateTimeInterface $DateSaison): self
    {
        $this->DateSaison = $DateSaison;

        return $this;
    }

    /**
     * @return Collection|SaisonMembre[]
     */
    public function getSaisonMembres(): Collection
    {
        return $this->saisonMembres;
    }

    public function addSaisonMembre(SaisonMembre $saisonMembre): self
    {
        if (!$this->saisonMembres->contains($saisonMembre)) {
            $this->saisonMembres[] = $saisonMembre;
            $saisonMembre->setSaison($this);
        }

        return $this;
    }

    public function removeSaisonMembre(SaisonMembre $saisonMembre): self
    {
        if ($this->saisonMembres->removeElement($saisonMembre)) {
            // set the owning side to null (unless already changed)
            if ($saisonMembre->getSaison() === $this) {
                $saisonMembre->setSaison(null);
            }
        }

        return $this;
    }

    public function getDateFinSaison(): ?\DateTimeInterface
    {
        return $this->DateFinSaison;
    }

    public function setDateFinSaison(\DateTimeInterface $DateFinSaison): self
    {
        $this->DateFinSaison = $DateFinSaison;

        return $this;
    }
}
