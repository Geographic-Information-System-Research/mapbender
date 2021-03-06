<?php

namespace Mapbender\ManagerBundle\Component;

use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * ManagerBundle base class.
 *
 * This class is the base class for bundles implementing Manager functionality.
 *
 * @author Christian Wygoda
 *
 * Copied into Mapbender from FOM v3.0.6.3
 * see https://github.com/mapbender/fom/blob/v3.0.6.3/src/FOM/ManagerBundle/Component/ManagerBundle.php
 */
class ManagerBundle extends Bundle
{
    /**
     * @deprecated remove in v3.1
     * To extend the menu, register MenuItem objects with a RegisterMenuRoutesPass
     */
    public function getManagerControllers()
    {
        return array();
    }

    /**
     * @deprecated remove in v3.1
     * Return whatever you want, it doesn't affect anything anywhere
     */
    public function getRoles()
    {
        return array();
    }

    /**
     * Return a mapping of acl class names to displayable descriptions. E.g.
     * "FOM\UserBundle\Entity\Group" => "Groups"
     *
     * @return string[]
     */
    public function getACLClasses()
    {
        return array();
    }
}
