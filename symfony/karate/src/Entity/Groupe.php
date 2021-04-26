<?php

namespace App\Entity;

use App\Repository\GroupeRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GroupeRepository::class)
 */
class Groupe
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
    private $NomGroupe;

    /**
     * @ORM\ManyToOne(targetEntity=Instructeur::class, inversedBy="GroupeEncadre")
     */
    private $instructeur;

    /**
     * @ORM\ManyToOne(targetEntity=Activite::class, inversedBy="Groupe")
     */
    private $activite;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomGroupe(): ?string
    {
        return $this->NomGroupe;
    }

    public function setNomGroupe(string $NomGroupe): self
    {
        $this->NomGroupe = $NomGroupe;

        return $this;
    }

    public function getInstructeur(): ?Instructeur
    {
        return $this->instructeur;
    }

    public function setInstructeur(?Instructeur $instructeur): self
    {
        $this->instructeur = $instructeur;

        return $this;
    }

    public function getActivite(): ?Activite
    {
        return $this->activite;
    }

    public function setActivite(?Activite $activite): self
    {
        $this->activite = $activite;

        return $this;
    }
}
