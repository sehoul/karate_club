<?php

namespace App\Entity;

use App\Repository\MembreActiviteRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MembreActiviteRepository::class)
 */
class MembreActivite
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $cotisation;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $DatePremiereInscription;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Observation;

    /**
     * @ORM\ManyToOne(targetEntity=Membre::class, inversedBy="membreActivites")
     */
    private $membre;

    /**
     * @ORM\ManyToOne(targetEntity=Activite::class, inversedBy="membreActivites")
     */
    private $Avtivite;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCotisation(): ?float
    {
        return $this->cotisation;
    }

    public function setCotisation(?float $cotisation): self
    {
        $this->cotisation = $cotisation;

        return $this;
    }

    public function getDatePremiereInscription(): ?\DateTimeInterface
    {
        return $this->DatePremiereInscription;
    }

    public function setDatePremiereInscription(?\DateTimeInterface $DatePremiereInscription): self
    {
        $this->DatePremiereInscription = $DatePremiereInscription;

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

    public function getMembre(): ?Membre
    {
        return $this->membre;
    }

    public function setMembre(?Membre $membre): self
    {
        $this->membre = $membre;

        return $this;
    }

    public function getAvtivite(): ?Activite
    {
        return $this->Avtivite;
    }

    public function setAvtivite(?Activite $Avtivite): self
    {
        $this->Avtivite = $Avtivite;

        return $this;
    }
}
