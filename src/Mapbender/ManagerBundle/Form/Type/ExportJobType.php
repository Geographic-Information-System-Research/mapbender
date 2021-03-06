<?php

namespace Mapbender\ManagerBundle\Form\Type;

use Mapbender\ManagerBundle\Component\ExchangeJob;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * ExportJobType class creates a form for an ExportJob object.
 */
class ExportJobType extends AbstractType
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
            ->add('application', 'Symfony\Bridge\Doctrine\Form\Type\EntityType', array(
                'label' => 'mb.terms.application.singular',
                'class' => 'Mapbender\CoreBundle\Entity\Application',
                'choice_label' => 'title',
                'multiple' => false,
                'choices' => $options['application'],
                'required' => true,
            ))
            ->add('format', 'Symfony\Component\Form\Extension\Core\Type\ChoiceType',
                array(
                'required' => true,
                'choices' => array(
                    ExchangeJob::FORMAT_JSON => ExchangeJob::FORMAT_JSON,
                    ExchangeJob::FORMAT_YAML => ExchangeJob::FORMAT_YAML,
                ),
                'choices_as_values' => true,
            ))
        ;
    }

}
