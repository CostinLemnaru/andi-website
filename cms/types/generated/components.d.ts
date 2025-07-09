import type { Schema, Struct } from '@strapi/strapi';

export interface HeroHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_sections';
  info: {
    displayName: 'Hero section';
  };
  attributes: {
    CtaText: Schema.Attribute.String;
    Description: Schema.Attribute.JSON;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.JSON;
  };
}

export interface HomeRoadmapSection extends Struct.ComponentSchema {
  collectionName: 'components_home_roadmap_sections';
  info: {
    displayName: 'Roadmap section';
  };
  attributes: {
    Versions: Schema.Attribute.Component<'roadmap.version', true>;
  };
}

export interface HomeSecuritySection extends Struct.ComponentSchema {
  collectionName: 'components_home_security_sections';
  info: {
    displayName: 'Security section';
  };
  attributes: {
    Badges: Schema.Attribute.Component<'miscellaneous.text', true>;
    Closing: Schema.Attribute.Text;
    Subtitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousText extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {
    Title: Schema.Attribute.String;
  };
}

export interface PageSeo extends Struct.ComponentSchema {
  collectionName: 'components_page_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface RoadmapFeature extends Struct.ComponentSchema {
  collectionName: 'components_roadmap_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    Description: Schema.Attribute.String;
    icon: Schema.Attribute.Enumeration<
      [
        'MessageSquare',
        'Database',
        'Server',
        'Cpu',
        'Brain',
        'Link',
        'Tag',
        'Shield',
        'Lock',
        'Unlock',
        'Zap',
        'Activity',
        'CheckCircle',
        'XCircle',
        'AlertTriangle',
        'Globe',
        'Search',
        'BarChart2',
        'Calendar',
        'Layers',
        'GitBranch',
        'Compass',
        'Rocket',
        'Wand',
        'Eye',
      ]
    >;
    Specs: Schema.Attribute.Component<'miscellaneous.text', true>;
    Title: Schema.Attribute.String;
  };
}

export interface RoadmapVersion extends Struct.ComponentSchema {
  collectionName: 'components_roadmap_versions';
  info: {
    displayName: 'Version';
  };
  attributes: {
    Color: Schema.Attribute.Enumeration<
      [
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
        'slate',
        'gray',
        'zinc',
        'neutral',
        'stone',
      ]
    >;
    Features: Schema.Attribute.Component<'roadmap.feature', true>;
    State: Schema.Attribute.String;
    Subtitle: Schema.Attribute.String;
    Timeline: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero.hero-section': HeroHeroSection;
      'home.roadmap-section': HomeRoadmapSection;
      'home.security-section': HomeSecuritySection;
      'miscellaneous.text': MiscellaneousText;
      'page.seo': PageSeo;
      'roadmap.feature': RoadmapFeature;
      'roadmap.version': RoadmapVersion;
    }
  }
}
