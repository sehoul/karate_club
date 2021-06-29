<?php

namespace App\Entity;

use App\Repository\SaisonMembreRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SaisonMembreRepository::class)
 */
class SaisonMembre
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Saison::class, inversedBy="saisonMembres")
     * @ORM\JoinColumn(nullable=false)
     */
    private $saison;

    /**
     * @ORM\ManyToOne(targetEntity=Membre::class, inversedBy="saisonMembres")
     */
    private $Membre;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSaison(): ?Saison
    {
        return $this->saison;
    }

    public function setSaison(?Saison $saison): self
    {
        $this->saison = $saison;

        return $this;
    }

    public function getMembre(): ?Membre
    {
        return $this->Membre;
    }

    public function setMembre(?Membre $Membre): self
    {
        $this->Membre = $Membre;

        return $this;
    }
}
