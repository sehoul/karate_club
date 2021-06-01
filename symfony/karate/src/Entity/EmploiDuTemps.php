<?php

namespace App\Entity;

use App\Repository\EmploiDuTempsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=EmploiDuTempsRepository::class)
 */
class EmploiDuTemps
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
    private $groupe;

    /**
     * @ORM\Column(type="date")
     */
    private $start;
    /**
     * @ORM\Column(type="date")
     */
    private $end;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $event;

    /**
     * @ORM\ManyToOne(targetEntity=Instructeur::class, inversedBy="EmploiDuTemps")
     */
    private $instructeur;

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getGroupe(): ?string
    {
        return $this->groupe;
    }

    public function setGroupe(string $groupe): self
    {
        $this->groupe = $groupe;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }
    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    public function getEvent(): ?string
    {
        return $this->event;
    }

    public function setEvent(?string $event): self
    {
        $this->event = $event;

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
}
