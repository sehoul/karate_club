<?php

namespace App\Entity;

class Path
{

    private $thePath;

    public function getThePath(): ?string
    {
        return $this->thePath;
    }

    public function setThePath(string $thePath): self
    {
        $this->thePath = $thePath;

        return $this;
    }
}
