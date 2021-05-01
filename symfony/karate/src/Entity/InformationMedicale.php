<?php

namespace App\Entity;

use App\Repository\InformationMedicaleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=InformationMedicaleRepository::class)
 */
class InformationMedicale
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
    private $Correspondant_medical;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Adresse;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Tel_1;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Tel_2;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Email;

    /**
     * @ORM\Column(type="date")
     */
    private $Date_Premiere_visite;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Observation;

    /**
     * @ORM\OneToOne(targetEntity=Membre::class, inversedBy="informationMedicale", cascade={"persist", "remove"})
     */
    private $membre;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCorrespondantMedical(): ?string
    {
        return $this->Correspondant_medical;
    }

    public function setCorrespondantMedical(string $Correspondant_medical): self
    {
        $this->Correspondant_medical = $Correspondant_medical;

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

    public function getTel1(): ?string
    {
        return $this->Tel_1;
    }

    public function setTel1(string $Tel_1): self
    {
        $this->Tel_1 = $Tel_1;

        return $this;
    }

    public function getTel2(): ?string
    {
        return $this->Tel_2;
    }

    public function setTel2(string $Tel_2): self
    {
        $this->Tel_2 = $Tel_2;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->Email;
    }

    public function setEmail(string $Email): self
    {
        $this->Email = $Email;

        return $this;
    }

    public function getDatePremiereVisite(): ?\DateTimeInterface
    {
        return $this->Date_Premiere_visite;
    }

    public function setDatePremiereVisite(\DateTimeInterface $Date_Premiere_visite): self
    {
        $this->Date_Premiere_visite = $Date_Premiere_visite;

        return $this;
    }

    public function getObservation(): ?string
    {
        return $this->Observation;
    }

    public function setObservation(string $Observation): self
    {
        $this->Observation = $Observation;

        return $this;
    }

    public function getMembre(): ?membre
    {
        return $this->membre;
    }

    public function setMembre(?membre $membre): self
    {
        $this->membre = $membre;

        return $this;
    }
}
