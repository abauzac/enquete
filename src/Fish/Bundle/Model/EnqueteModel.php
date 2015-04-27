<?php

namespace Fish\Bundle\Model;

use Fish\Bundle\Entity\AbstractEntity;
use Fish\Bundle\Entity\EnqueteEntity;
use InvalidArgumentException;

/**
 * Description of EnqueteModel
 *
 * @author Mikhail Cavalcanti <mikhailcavalcanti@gmail.com>
 */
class EnqueteModel extends AbstractModel
{

    /**
     * 
     * @param EnqueteEntity $entity
     */
    protected function validate(AbstractEntity $entity)
    {
        /* @var $entity EnqueteEntity */
        $titulo = $entity->getTitulo();
        if (empty($titulo)) {
            throw new InvalidArgumentException('Titulo da enquete não pode ser vazio');
        }
    }

}
