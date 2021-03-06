<?php

namespace App\Entity;

use App\Repository\GroupeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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
     * @Groups({"Groupe"})
     */
    private $NomGroupe;

    /**
     * @ORM\ManyToOne(targetEntity=Instructeur::class, inversedBy="GroupeEncadre")
     * @ORM\JoinColumn(nullable=true)
     */
    private $instructeur;

    /**
     * @ORM\ManyToOne(targetEntity=Activite::class, inversedBy="Groupe")
     * @Groups({"Groupe:Activite"})
     * @ORM\OrderBy({"nomActivite" = "ASC"})
     */
    private $activite;

    /**
     * @ORM\OneToMany(targetEntity=GroupeMembre::class, mappedBy="Groupe")
     */
    private $MembresGroupe;

    /**
     * @ORM\OneToMany(targetEntity=EmploiDuTemps::class, mappedBy="groupe")
     */
    private $emploiDuTemps;

    public function __construct()
    {
        $this->MembresGroupe = new ArrayCollection();
        $this->emploiDuTemps = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function setId(int $id): self
    {
         $this->id=$id;
         return $this;
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

    /**
     * @return Collection|GroupeMembre[]
     */
    public function getMembresGroupe(): Collection
    {
        return $this->MembresGroupe;
    }

    public function addMembresGroupe(GroupeMembre $membresGroupe): self
    {
        if (!$this->MembresGroupe->contains($membresGroupe)) {
            $this->MembresGroupe[] = $membresGroupe;
            $membresGroupe->setGroupe($this);
        }

        return $this;
    }

    public function removeMembresGroupe(GroupeMembre $membresGroupe): self
    {
        if ($this->MembresGroupe->removeElement($membresGroupe)) {
            // set the owning side to null (unless already changed)
            if ($membresGroupe->getGroupe() === $this) {
                $membresGroupe->setGroupe(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|EmploiDuTemps[]
     */
    public function getEmploiDuTemps(): Collection
    {
        return $this->emploiDuTemps;
    }

    public function addEmploiDuTemp(EmploiDuTemps $emploiDuTemp): self
    {
        if (!$this->emploiDuTemps->contains($emploiDuTemp)) {
            $this->emploiDuTemps[] = $emploiDuTemp;
            $emploiDuTemp->setGroupe($this);
        }

        return $this;
    }

    public function removeEmploiDuTemp(EmploiDuTemps $emploiDuTemp): self
    {
        if ($this->emploiDuTemps->removeElement($emploiDuTemp)) {
            // set the owning side to null (unless already changed)
            if ($emploiDuTemp->getGroupe() === $this) {
                $emploiDuTemp->setGroupe(null);
            }
        }

        return $this;
    }
}
