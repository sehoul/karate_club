<?php

namespace App\Repository;

use App\Entity\MembreActivite;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MembreActivite|null find($id, $lockMode = null, $lockVersion = null)
 * @method MembreActivite|null findOneBy(array $criteria, array $orderBy = null)
 * @method MembreActivite[]    findAll()
 * @method MembreActivite[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MembreActiviteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MembreActivite::class);
    }

    // /**
    //  * @return MembreActivite[] Returns an array of MembreActivite objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MembreActivite
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
