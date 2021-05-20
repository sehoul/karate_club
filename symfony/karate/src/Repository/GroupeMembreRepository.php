<?php

namespace App\Repository;

use App\Entity\GroupeMembre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method GroupeMembre|null find($id, $lockMode = null, $lockVersion = null)
 * @method GroupeMembre|null findOneBy(array $criteria, array $orderBy = null)
 * @method GroupeMembre[]    findAll()
 * @method GroupeMembre[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GroupeMembreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GroupeMembre::class);
    }

    // /**
    //  * @return GroupeMembre[] Returns an array of GroupeMembre objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?GroupeMembre
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
