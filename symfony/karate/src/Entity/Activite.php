<?php

namespace App\Entity;

use App\Repository\ActiviteRepository;
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
}
