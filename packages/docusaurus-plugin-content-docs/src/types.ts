/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line spaced-comment
/// <reference types="@docusaurus/module-type-aliases" />

import type {RemarkAndRehypePluginOptions} from '@docusaurus/mdx-loader';
import {
  BrokenMarkdownLink as IBrokenMarkdownLink,
  ContentPaths,
} from '@docusaurus/utils/lib/markdownLinks';

export type DocFile = {
  contentPath: string; // /!\ may be localized
  filePath: string; // /!\ may be localized
  source: string;
  content: string;
  lastUpdate: LastUpdateData;
};

export type VersionName = string;

export type VersionMetadata = ContentPaths & {
  versionName: VersionName; // 1.0.0
  versionLabel: string; // Version 1.0.0
  versionPath: string; // /baseUrl/docs/1.0.0
  versionEditUrl?: string | undefined;
  versionEditUrlLocalized?: string | undefined;
  isLast: boolean;
  // contentPath: string; // "versioned_docs/version-1.0.0"
  // contentPathLocalized: string; // "i18n/fr/version-1.0.0/default"
  sidebarFilePath: string; // versioned_sidebars/1.0.0.json
  routePriority: number | undefined; // -1 for the latest docs
};

export type EditUrlFunction = (editUrlParams: {
  version: string;
  versionDocsDirPath: string;
  docPath: string;
  permalink: string;
  locale: string;
}) => string | undefined;

export type MetadataOptions = {
  routeBasePath: string;
  homePageId?: string;
  editUrl?: string | EditUrlFunction;
  editCurrentVersion: boolean;
  editLocalizedFiles: boolean;
  showLastUpdateTime?: boolean;
  showLastUpdateAuthor?: boolean;
  includeFrontMatterInGlobals?: boolean;
};

export type PathOptions = {
  path: string;
  sidebarPath: string;
};

export type VersionOptions = {
  path?: string;
  label?: string;
};

export type VersionsOptions = {
  lastVersion?: string;
  versions: Record<string, VersionOptions>;
  onlyIncludeVersions?: string[];
};

export type PluginOptions = MetadataOptions &
  PathOptions &
  VersionsOptions &
  RemarkAndRehypePluginOptions & {
    id: string;
    include: string[];
    docLayoutComponent: string;
    docItemComponent: string;
    admonitions: Record<string, unknown>;
    disableVersioning: boolean;
    excludeNextVersionDocs?: boolean;
    includeCurrentVersion: boolean;
  };

export type SidebarItemBase = {
  customProps?: Record<string, unknown>;
};

export type SidebarItemDoc = SidebarItemBase & {
  type: 'doc' | 'ref';
  id: string;
};

export type SidebarItemLink = SidebarItemBase & {
  type: 'link';
  href: string;
  label: string;
};

export type SidebarItemCategory = SidebarItemBase & {
  type: 'category';
  label: string;
  items: SidebarItem[];
  collapsed: boolean;
};

export type SidebarItem =
  | SidebarItemDoc
  | SidebarItemLink
  | SidebarItemCategory;

export type Sidebar = SidebarItem[];
export type SidebarItemType = SidebarItem['type'];

export type Sidebars = Record<string, Sidebar>;

export type OrderMetadata = {
  previous?: string;
  next?: string;
  sidebar?: string;
};

export type LastUpdateData = {
  lastUpdatedAt?: number;
  formattedLastUpdatedAt?: string;
  lastUpdatedBy?: string;
};

export type FrontMatter = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type DocMetadataBase = LastUpdateData & {
  version: VersionName;
  unversionedId: string;
  id: string;
  isDocsHomePage: boolean;
  title: string;
  description: string;
  source: string;
  slug: string;
  permalink: string;
  // eslint-disable-next-line camelcase
  sidebar_label?: string;
  editUrl?: string | null;
  frontMatter?: FrontMatter;
};

export type DocNavLink = {
  title: string;
  permalink: string;
};

export type DocMetadata = DocMetadataBase & {
  sidebar?: string;
  previous?: DocNavLink;
  next?: DocNavLink;
};

export type SourceToPermalink = {
  [source: string]: string;
};
export type LoadedVersion = VersionMetadata & {
  versionPath: string;
  mainDocId: string;
  docs: DocMetadata[];
  sidebars: Sidebars;
  permalinkToSidebar: Record<string, string>;
};

export type LoadedContent = {
  loadedVersions: LoadedVersion[];
};

export type GlobalDoc = {
  id: string;
  path: string;
  sidebar: string | undefined;
  frontMatter?: FrontMatter;
};

export type GlobalVersion = {
  name: VersionName;
  label: string;
  isLast: boolean;
  path: string;
  mainDocId: string; // home doc (if docs homepage configured), or first doc
  docs: GlobalDoc[];
};

export type GlobalPluginData = {
  path: string;
  versions: GlobalVersion[];
};

export type BrokenMarkdownLink = IBrokenMarkdownLink<VersionMetadata>;

export type DocsMarkdownOption = {
  versionsMetadata: VersionMetadata[];
  siteDir: string;
  sourceToPermalink: SourceToPermalink;
  onBrokenMarkdownLink: (brokenMarkdownLink: BrokenMarkdownLink) => void;
};
