<?php

namespace App\Repository;

use App\Entity\InformationMedicale;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method InformationMedicale|null find($id, $lockMode = null, $lockVersion = null)
 * @method InformationMedicale|null findOneBy(array $criteria, array $orderBy = null)
 * @method InformationMedicale[]    findAll()
 * @method InformationMedicale[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InformationMedicaleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, InformationMedicale::class);
    }

    // /**
    //  * @return InformationMedicale[] Returns an array of InformationMedicale objects
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
    public function findOneBySomeField($value): ?InformationMedicale
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
