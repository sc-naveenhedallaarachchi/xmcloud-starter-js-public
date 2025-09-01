import {
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { useMemo } from 'react';
import { IGQLLinkField, IGQLRichTextField, IGQLTextField } from 'types/igql';
import { NoDataFallback } from '@/utils/NoDataFallback';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'shadcd/components/ui/accordion';

interface Fields {
  data?: {
    datasource?: {
      heading?: IGQLTextField;
      description?: IGQLTextField;
      link?: IGQLLinkField;
      children?: {
        results?: AccordionItemFields[];
      };
    };
  };
}

interface AccordionItemFields {
  id: string;
  heading?: IGQLTextField;
  description?: IGQLRichTextField;
}

type AccordionProps = {
  params?: { [key: string]: string };
  fields?: Fields;
  isPageEditing?: boolean;
};

const AccordionBlockItem = (props: AccordionItemFields) => {
  if (!props.id) {
    return null;
  }

  return (
    <AccordionItem value={props.id} className="border-border mb-10">
      <AccordionTrigger>
        <h5 className="text-base">
          {props.heading?.jsonValue ? (
            <ContentSdkText field={props.heading.jsonValue} />
          ) : (
            <span>No heading available</span>
          )}
        </h5>
      </AccordionTrigger>
      <AccordionContent>
        {props.description?.jsonValue ? (
          <ContentSdkRichText field={props.description.jsonValue} />
        ) : (
          <span>No description available</span>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export const Default = (props: AccordionProps) => {
  const { fields, params = {}, isPageEditing = false } = props;

  const datasource = useMemo(() => {
    return fields?.data?.datasource || null;
  }, [fields?.data?.datasource]);

  if (!datasource) {
    return <NoDataFallback componentName="Accordion Block" />;
  }

  const accordionItems = datasource.children?.results || [];
  const hasItems = accordionItems.length > 0;

  if (!hasItems && !isPageEditing) {
    return <NoDataFallback componentName="Accordion Block" />;
  }

  return (
    <section className={`relative py-20 overflow-hidden ${params.styles || ''}`} data-class-change>
      <span className="absolute top-1/3 -left-1/3 w-screen h-64 bg-primary opacity-50 blur-[400px] rotate-15 z-10"></span>
      <div className="relative container mx-auto px-4 z-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <h2 className="text-2xl lg:text-5xl">
            {datasource.heading?.jsonValue ? (
              <ContentSdkText field={datasource.heading.jsonValue} />
            ) : (
              <span>No heading available</span>
            )}
          </h2>
          <div>
            {hasItems && (
              <Accordion type="multiple" className="w-full mb-12">
                {accordionItems.map((item) => (
                  <AccordionBlockItem key={item.id || Math.random().toString()} {...item} />
                ))}
              </Accordion>
            )}
            {(isPageEditing || datasource.description?.jsonValue || datasource.link?.jsonValue) && (
              <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
                <h6 className="text-sm">
                  {datasource.description?.jsonValue ? (
                    <ContentSdkText field={datasource.description.jsonValue} />
                  ) : (
                    <span>No description available</span>
                  )}
                </h6>
                {datasource.link?.jsonValue && (
                  <ContentSdkLink
                    field={datasource.link.jsonValue}
                    prefetch={false}
                    className="btn btn-secondary btn-sharp"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoColumn = (props: AccordionProps) => {
  const { fields, params = {}, isPageEditing = false } = props;

  const datasource = useMemo(() => {
    return fields?.data?.datasource || null;
  }, [fields?.data?.datasource]);

  if (!datasource) {
    return <NoDataFallback componentName="Accordion Block Two Column" />;
  }

  const accordionItems = datasource.children?.results || [];
  const hasItems = accordionItems.length > 0;

  if (!hasItems && !isPageEditing) {
    return <NoDataFallback componentName="Accordion Block Two Column" />;
  }

  return (
    <section className={`relative py-20 overflow-hidden ${params.styles || ''}`} data-class-change>
      <span className="absolute top-1/3 -left-1/3 w-screen h-64 bg-primary opacity-50 blur-[400px] rotate-15 z-10"></span>
      <div className="relative container mx-auto px-4 z-20">
        <h2 className="text-2xl lg:text-5xl">
          {datasource.heading?.jsonValue ? (
            <ContentSdkText field={datasource.heading.jsonValue} />
          ) : (
            <span>No heading available</span>
          )}
        </h2>
        {hasItems && (
          <Accordion type="multiple" className="w-full grid lg:grid-cols-2 gap-x-12 my-12">
            {accordionItems.map((item) => (
              <AccordionBlockItem key={item.id || Math.random().toString()} {...item} />
            ))}
          </Accordion>
        )}
        <div className="grid lg:grid-cols-2 gap-x-12">
          {(isPageEditing || datasource.description?.jsonValue || datasource.link?.jsonValue) && (
            <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
              <h6 className="text-sm">
                {datasource.description?.jsonValue ? (
                  <ContentSdkText field={datasource.description.jsonValue} />
                ) : (
                  <span>No description available</span>
                )}
              </h6>
              {datasource.link?.jsonValue && (
                <ContentSdkLink
                  field={datasource.link.jsonValue}
                  prefetch={false}
                  className="btn btn-secondary btn-sharp"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const Vertical = (props: AccordionProps) => {
  const { fields, params = {}, isPageEditing = false } = props;

  const datasource = useMemo(() => {
    return fields?.data?.datasource || null;
  }, [fields?.data?.datasource]);

  if (!datasource) {
    return <NoDataFallback componentName="Accordion Block Vertical" />;
  }

  const accordionItems = datasource.children?.results || [];
  const hasItems = accordionItems.length > 0;

  if (!hasItems && !isPageEditing) {
    return <NoDataFallback componentName="Accordion Block Vertical" />;
  }

  return (
    <section className={`relative py-20 overflow-hidden ${params.styles || ''}`} data-class-change>
      <span className="absolute -top-20 w-screen h-64 bg-primary opacity-50 blur-[400px] z-10"></span>
      <div className="relative container mx-auto px-4 z-20">
        <div className="flex flex-col gap-12 max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-5xl text-center">
            {datasource.heading?.jsonValue ? (
              <ContentSdkText field={datasource.heading.jsonValue} />
            ) : (
              <span>No heading available</span>
            )}
          </h2>
          {hasItems && (
            <Accordion type="multiple" className="w-full">
              {accordionItems.map((item) => (
                <AccordionBlockItem key={item.id || Math.random().toString()} {...item} />
              ))}
            </Accordion>
          )}
          {(isPageEditing || datasource.description?.jsonValue || datasource.link?.jsonValue) && (
            <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
              <h6 className="text-sm">
                {datasource.description?.jsonValue ? (
                  <ContentSdkText field={datasource.description.jsonValue} />
                ) : (
                  <span>No description available</span>
                )}
              </h6>
              {datasource.link?.jsonValue && (
                <ContentSdkLink
                  field={datasource.link.jsonValue}
                  prefetch={false}
                  className="btn btn-secondary btn-sharp"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const BoxedAccordion = (props: AccordionProps) => {
  const { fields, params = {}, isPageEditing = false } = props;

  const datasource = useMemo(() => {
    return fields?.data?.datasource || null;
  }, [fields?.data?.datasource]);

  if (!datasource) {
    return <NoDataFallback componentName="Accordion Block Boxed" />;
  }

  const accordionItems = datasource.children?.results || [];
  const hasItems = accordionItems.length > 0;

  if (!hasItems && !isPageEditing) {
    return <NoDataFallback componentName="Accordion Block Boxed" />;
  }

  return (
    <section className={`bg-primary py-20 ${params.styles || ''}`} data-class-change>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-5xl">
            {datasource.heading?.jsonValue ? (
              <ContentSdkText field={datasource.heading.jsonValue} />
            ) : (
              <span>No heading available</span>
            )}
          </h2>
        </div>
        <div className="flex flex-col gap-12 max-w-3xl mx-auto bg-white p-4 lg:p-12 mt-12 shadow-2xl">
          {hasItems && (
            <Accordion type="multiple" className="w-full">
              {accordionItems.map((item) => (
                <AccordionBlockItem key={item.id || Math.random().toString()} {...item} />
              ))}
            </Accordion>
          )}
          {(isPageEditing || datasource.description?.jsonValue || datasource.link?.jsonValue) && (
            <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
              <h6 className="text-sm">
                {datasource.description?.jsonValue ? (
                  <ContentSdkText field={datasource.description.jsonValue} />
                ) : (
                  <span>No description available</span>
                )}
              </h6>
              {datasource.link?.jsonValue && (
                <ContentSdkLink
                  field={datasource.link.jsonValue}
                  prefetch={false}
                  className="btn btn-secondary btn-sharp"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const BoxedContent = (props: AccordionProps) => {
  const { fields, params = {}, isPageEditing = false } = props;

  const datasource = useMemo(() => {
    return fields?.data?.datasource || null;
  }, [fields?.data?.datasource]);

  if (!datasource) {
    return <NoDataFallback componentName="Accordion Block Boxed Content" />;
  }

  const accordionItems = datasource.children?.results || [];
  const hasItems = accordionItems.length > 0;

  if (!hasItems && !isPageEditing) {
    return <NoDataFallback componentName="Accordion Block Boxed Content" />;
  }

  return (
    <section className={`bg-gradient py-20 ${params.styles || ''}`} data-class-change>
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 lg:p-12 shadow-2xl">
          <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-5xl max-w-2xl">
              {datasource.heading?.jsonValue ? (
                <ContentSdkText field={datasource.heading.jsonValue} />
              ) : (
                <span>No heading available</span>
              )}
            </h2>
            {hasItems && (
              <Accordion type="multiple" className="w-full">
                {accordionItems.map((item) => (
                  <AccordionBlockItem key={item.id || Math.random().toString()} {...item} />
                ))}
              </Accordion>
            )}
            {(isPageEditing || datasource.description?.jsonValue || datasource.link?.jsonValue) && (
              <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 self-center lg:col-start-2 p-5 bg-primary">
                <h6 className="text-sm">
                  {datasource.description?.jsonValue ? (
                    <ContentSdkText field={datasource.description.jsonValue} />
                  ) : (
                    <span>No description available</span>
                  )}
                </h6>
                {datasource.link?.jsonValue && (
                  <ContentSdkLink
                    field={datasource.link.jsonValue}
                    prefetch={false}
                    className="btn btn-secondary btn-sharp"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
