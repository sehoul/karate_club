<?php

namespace App\Repository;

use App\Entity\Instructeur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Instructeur|null find($id, $lockMode = null, $lockVersion = null)
 * @method Instructeur|null findOneBy(array $criteria, array $orderBy = null)
 * @method Instructeur[]    findAll()
 * @method Instructeur[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InstructeurRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Instructeur::class);
    }

    // /**
    //  * @return Instructeur[] Returns an array of Instructeur objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Instructeur
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
