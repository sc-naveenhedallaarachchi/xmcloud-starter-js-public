import React, { JSX } from "react";
import {
  Field,
  ImageField,
  Page,
  Text as ContentSdkText,
  TextField,
} from "@sitecore-content-sdk/nextjs";
import Scripts from "src/Scripts";
import SitecoreStyles from "components/content-sdk/SitecoreStyles";
import { DesignLibraryApp } from "@sitecore-content-sdk/nextjs";
import { AppPlaceholder } from "@sitecore-content-sdk/nextjs";
import componentMap from ".sitecore/component-map";
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
} from "src/lib/structured-data/schema";
import StructuredData from "src/components/structured-data/StructuredData";
import type { JsonLdValue } from "src/lib/structured-data/jsonld";
import { getBaseUrl } from "src/lib/utils";

interface LayoutProps {
  page: Page;
  baseUrl?: string;
  isHomePage?: boolean;
}

export interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  metadataTitle?: Field;
  metadataKeywords?: Field;
  pageTitle?: Field;
  metadataDescription?: Field;
  pageSummary?: Field;
  ogTitle?: Field;
  ogDescription?: Field;
  ogImage?: ImageField;
  thumbnailImage?: ImageField;
}

const Layout = ({ page, baseUrl: baseUrlProp, isHomePage }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const mainClassPageEditing = mode.isEditing ? "editing-mode" : "prod-mode";
  // Use request-derived baseUrl when provided so JSON-LD URLs match actual port/host
  const baseUrl = baseUrlProp ?? getBaseUrl();
  const websiteSchema = generateWebSiteSchema(
    "Skate Park",
    baseUrl,
    "Skate Park demo site showcasing component examples"
  );
  const organizationSchema = generateOrganizationSchema(
    "Skate Park",
    baseUrl,
    undefined,
    "Skate Park demo site showcasing component examples"
  );

  const homePageRichTextBlocks: TextField[] = [
    {
      value:
        "<p>Test 01</p>",
    } as TextField,
    {
      value:
        "<p>Test 02</p>",
    } as TextField,
  ];

  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      <StructuredData id="website-schema" data={websiteSchema as JsonLdValue} />
      <StructuredData
        id="organization-schema"
        data={organizationSchema as JsonLdValue}
      />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        {mode.isDesignLibrary ? (
          route && (
            <DesignLibraryApp
              page={page}
              rendering={route}
              componentMap={componentMap}
              loadServerImportMap={() => import(".sitecore/import-map.server")}
            />
          )
        ) : (
          <>
            <header>
              <div id="header">
                {route && (
                  <AppPlaceholder
                    page={page}
                    componentMap={componentMap}
                    name="headless-header"
                    rendering={route}
                  />
                )}
              </div>
            </header>
            <main>
              <div id="content">
                {route && (
                  <AppPlaceholder
                    page={page}
                    componentMap={componentMap}
                    name="headless-main"
                    rendering={route}
                  />
                )}
              </div>
            </main>
            {isHomePage && (
              <section aria-label="Home page highlights" className="mx-auto max-w-6xl px-4 py-12">
                {/* <div className="grid gap-6 md:grid-cols-2">
                  {homePageRichTextBlocks.map((block, index) => (
                    <div
                      key={`home-rich-text-${index}`}
                      className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
                    >
                      <ContentSdkRichText field={block} />
                    </div>
                  ))}
                </div> */}



                <div className="grid gap-6 md:grid-cols-2">
                  <div
                      key={`home-rich-text-0`}
                      className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
                    >
                      <ContentSdkText field={homePageRichTextBlocks[0]} encode={false} />
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div
                      key={`home-rich-text-1`}
                      className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
                    >
                      <ContentSdkText field={homePageRichTextBlocks[1]} encode={true} />
                    </div>
                </div>
              </section>
            )}
            <footer>
              <div id="footer">
                {route && (
                  <AppPlaceholder
                    page={page}
                    componentMap={componentMap}
                    name="headless-footer"
                    rendering={route}
                  />
                )}
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
