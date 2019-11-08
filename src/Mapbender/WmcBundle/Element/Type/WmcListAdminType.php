<?php
namespace Mapbender\WmcBundle\Element\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Paul Schmidt
 */
class WmcListAdminType extends AbstractType
{

    /**
     * @inheritdoc
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'application' => null,
        ));
    }

    /**
     * @inheritdoc
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('tooltip', 'Symfony\Component\Form\Extension\Core\Type\TextType', array(
                'required' => false,
            ))
            ->add('target', 'Mapbender\CoreBundle\Element\Type\TargetElementType', array(
                'element_class' => 'Mapbender\\WmcBundle\\Element\\WmcLoader',
                'application' => $options['application'],
                'required' => false,
            ))
            ->add('label', 'Symfony\Component\Form\Extension\Core\Type\CheckboxType', array(
                'required' => false,
                'label' => 'mb.wmc.admin.wmclist.label',
            ))
        ;
    }
}
