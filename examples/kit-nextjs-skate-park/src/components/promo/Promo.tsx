import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { CompatibleLink } from 'components/content-sdk/CompatibleLink';
import StructuredData from 'components/structured-data/StructuredData';
import { getFieldValue } from 'lib/component-props';
import { buildProductJsonLd } from 'src/lib/structured-data/schema';
import { PromoContentProps, PromoFields as Fields, PromoProps } from './promo.props';
import { UseStateToggleRepro } from '../use-state-toggle-repro/UseStateToggleRepro';

const PromoContent = (props: PromoContentProps): JSX.Element => {
  const { fields, params, renderText } = props;
  const { styles, RenderingIdentifier: id } = params;

  const Wrapper = ({ children }: { children: JSX.Element }): JSX.Element => (
    <article
      className={`component promo ${styles}`}
      id={id}
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="component-content">{children}</div>
    </article>
  );

  if (!fields) {
    return (
      <Wrapper>
        <span className="is-empty-hint">Promo</span>
      </Wrapper>
    );
  }

  const promoIconField = getFieldValue(fields.PromoIcon);
  const promoTextField = getFieldValue(fields.PromoText);
  const promoLinkField = getFieldValue(fields.PromoLink);

  return (
    <Wrapper>
      <>
        <figure className="field-promoicon" itemProp="image">
          <ContentSdkImage field={promoIconField} />
        </figure>
        <div className="promo-text" itemProp="description">
          {renderText(fields)}
        </div>
        <StructuredData
          id={`jsonld-product-${id ?? 'promo'}`}
          data={buildProductJsonLd({
            name:
              promoLinkField?.value?.title ||
              (promoTextField?.value ? String(promoTextField.value) : undefined),
            descriptionHtml: promoTextField?.value ? String(promoTextField.value) : undefined,
            url: promoLinkField?.value?.href,
            image: promoIconField?.value?.src,
          })}
        />
      </>
    </Wrapper>
  );
};

export const Default = (props: PromoProps): JSX.Element => {
  const renderText = (fields: Fields) => {
    // const promoTextField = getFieldValue(fields.PromoText);
    const promoLinkField = getFieldValue(fields.PromoLink);
    const promoText2Field = getFieldValue(fields.PromoText);
    if (promoText2Field) {
      promoText2Field.value = `'<h3>Encode disabled</h3>\r\n' +
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.</p>\n' +
    '<a href="#"> Hola </a>'`;
    }
    const promoText3Field = getFieldValue(fields.PromoText);
    if (promoText3Field) {
      promoText3Field.value = `'<h3>Encode Enabled</h3>\r\n' +
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.</p>\n' +
    '<a href="#"> Hola </a>'`;
    }
    const promoText4Field = getFieldValue(fields.PromoText);
    if (promoText4Field) {
      promoText4Field.value = `'<h3>No Encoding</h3>\r\n' +
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.</p>\n' +
    '<a href="#"> Hola </a>'`;
    }
    console.log('renderText fields:', promoText2Field);
    return (
      <>
        <div className="field-promotext">
          <ContentSdkText field={promoText2Field} encode={false} />
        </div>
        <hr />
        <div className="field-promotext">
          <ContentSdkText field={promoText3Field} encode={true} />
        </div>
        <hr />
        <div className="field-promotext">
          <ContentSdkText field={promoText4Field}/>
        </div>
        {/* <div className="field-promolink">
          {promoLinkField ? <CompatibleLink field={promoLinkField} /> : null}
        </div> */}
        {/* {promoTextField ? <UseStateToggleRepro fields={{ Text: promoTextField }} /> : null}
        <hr />
        {promoTextField ? <ContentSdkText className="whitespace-pre-line" field={promoTextField} encode={false} /> : null} */}
      </>
    );
  };

  return <PromoContent {...props} renderText={renderText} />;
};

export const WithText = (props: PromoProps): JSX.Element => {
  const renderText = (fields: Fields) => (
    <>
      <div className="field-promotext">
        <ContentSdkRichText className="promo-text" field={getFieldValue(fields.PromoText)} />
      </div>
      <div className="field-promotext">
        <ContentSdkRichText className="promo-text" field={getFieldValue(fields.PromoText2)} />
      </div>
    </>
  );

  return <PromoContent {...props} renderText={renderText} />;
};