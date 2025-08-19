import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { IGQLImageField, IGQLLinkField, IGQLTextField } from 'src/types/igql';
import { type JSX } from 'react';
import { Button } from 'shadcd/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Simple interface like CallToAction
interface Fields {
  Title: IGQLTextField;
  TagLine: IGQLTextField;
  CustomerName: IGQLTextField;
  CustomerCompany: IGQLTextField;
  CustomerIcon: IGQLImageField;
  TestimonialBody: IGQLTextField;
  TestimonialIcon: IGQLImageField;
  CaseStudyLink: IGQLLinkField;
}

type TestimonialsSimpleProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: TestimonialsSimpleProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;

  return (
    <section className={`py-24 px-4 ${props.params.styles}`} data-class-change>
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-5xl font-bold mb-6">
            <ContentSdkText field={props.fields.Title?.jsonValue} />
          </h2>
          <p className="text-lg">
            <ContentSdkText field={props.fields.TagLine?.jsonValue} />
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Testimonial Icon/Logo */}
            <div className="h-12 mb-12">
              <ContentSdkImage
                field={props.fields.TestimonialIcon?.jsonValue}
                width={300}
                height={48}
                className="h-full w-auto object-contain"
              />
            </div>
            
            {/* Testimonial Body */}
            <blockquote className="text-xl font-bold mb-12 text-center">
              <ContentSdkRichText field={props.fields.TestimonialBody?.jsonValue} />
            </blockquote>
            
            {/* Customer Info */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden mb-4">
                <ContentSdkImage
                  field={props.fields.CustomerIcon?.jsonValue}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold">
                  <ContentSdkText field={props.fields.CustomerName?.jsonValue} />
                </div>
                <div>
                  <ContentSdkText field={props.fields.CustomerCompany?.jsonValue} />
                </div>
              </div>
            </div>
            
            {/* Case Study Link */}
            {(props.fields.CaseStudyLink?.jsonValue?.value?.href || isEditing) && (
              <Button asChild variant={'link'} className="mt-6">
                <ContentSdkLink
                  field={props.fields.CaseStudyLink?.jsonValue}
                  className="inline-flex items-center"
                  prefetch={false}
                >
                  {props.fields.CaseStudyLink?.jsonValue?.value?.text || 'Read Case Study'}
                  <ArrowRight className="h-4 w-4" />
                </ContentSdkLink>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
