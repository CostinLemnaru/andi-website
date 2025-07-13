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

export interface HomeCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_home_cta_sections';
  info: {
    displayName: 'Cta Section';
  };
  attributes: {
    CtaButton: Schema.Attribute.String;
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface HomeRoadmapSection extends Struct.ComponentSchema {
  collectionName: 'components_home_roadmap_sections';
  info: {
    displayName: 'Roadmap section';
  };
  attributes: {
    Versions: Schema.Attribute.Component<'roadmap.version', true>;
    whiteTheme: Schema.Attribute.Boolean;
  };
}

export interface HomeRoiCalculatorSection extends Struct.ComponentSchema {
  collectionName: 'components_home_roi_calculator_sections';
  info: {
    displayName: 'Roi Calculator Section';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Description: Schema.Attribute.String;
    Disclaimer: Schema.Attribute.String;
    Title: Schema.Attribute.String;
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

export interface MiscellaneousAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_accordion_items';
  info: {
    displayName: 'Accordion Item';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Text: Schema.Attribute.String;
  };
}

export interface MiscellaneousAccordionItemJson extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_accordion_item_jsons';
  info: {
    displayName: 'Accordion Item Json';
  };
  attributes: {
    Content: Schema.Attribute.JSON;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousAddOnBox extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_add_on_boxes';
  info: {
    displayName: 'Add-On Box';
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
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
        'Infinity',
        'BarChart3',
        'Webhook',
        'Headphones',
      ]
    >;
    Tag: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousBoxFeaturesFooter extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_box_features_footers';
  info: {
    displayName: 'Box Features Footer';
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
    FooterText: Schema.Attribute.Text;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    Item: Schema.Attribute.Component<'miscellaneous.icon-text', true>;
    ListTitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousBoxIconColor extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_box_icon_colors';
  info: {
    displayName: 'Box Icon Color';
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
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousBoxNested extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_box_nesteds';
  info: {
    displayName: 'Box Nested';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    IconColor: Schema.Attribute.Enumeration<
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
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousBusinessPulse extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_business_pulses';
  info: {
    displayName: 'Business Pulse';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousButton extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    Text: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface MiscellaneousIconBox extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_icon_boxes';
  info: {
    displayName: 'Icon Box';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousIconText extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_icon_texts';
  info: {
    displayName: 'Icon Text';
  };
  attributes: {
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousListItem extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_list_items';
  info: {
    displayName: 'List Item';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousQAndA extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_q_and_a_s';
  info: {
    displayName: 'Q & A ';
  };
  attributes: {
    Answer: Schema.Attribute.RichText;
    AnswerLabel: Schema.Attribute.String;
    Question: Schema.Attribute.String;
    QuestionLabel: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabCategory extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_categories';
  info: {
    displayName: 'Tab Category';
  };
  attributes: {
    Items: Schema.Attribute.Component<'miscellaneous.tab-item', true>;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabCategoryBox extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_category_boxes';
  info: {
    displayName: 'Tab Category Box';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Items: Schema.Attribute.Component<'miscellaneous.tab-item-box', true>;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabCategoryComponents
  extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_category_components';
  info: {
    displayName: 'Tab Category Components';
  };
  attributes: {
    Items: Schema.Attribute.Component<
      'miscellaneous.tab-item-components',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabCategoryVertical
  extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_category_verticals';
  info: {
    displayName: 'Tab Category Vertical';
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
    Content: Schema.Attribute.Component<
      'miscellaneous.tabs-item-vertival',
      false
    >;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
        'Infinity',
        'BarChart3',
        'Webhook',
        'Headphones',
      ]
    >;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabItem extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_items';
  info: {
    displayName: 'Tab Item';
  };
  attributes: {
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabItemBox extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_item_boxes';
  info: {
    displayName: 'Tab Item Box';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Items: Schema.Attribute.Component<'page.box-icon', true>;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabItemComponentIconText
  extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_item_component_icon_texts';
  info: {
    displayName: 'Tab Item Component Icon Text';
  };
  attributes: {
    IconText: Schema.Attribute.Component<'miscellaneous.icon-text', true>;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabItemComponents extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_item_components';
  info: {
    displayName: 'Tab Item Components';
  };
  attributes: {
    IconText: Schema.Attribute.Component<
      'miscellaneous.tab-item-component-icon-text',
      true
    >;
    IconTitleDescription: Schema.Attribute.Component<'page.box-icon', true>;
  };
}

export interface MiscellaneousTabsItemVertival extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tabs_item_vertivals';
  info: {
    displayName: 'Tabs Item Vertival';
  };
  attributes: {
    Button: Schema.Attribute.Component<'miscellaneous.button', false>;
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
        'Infinity',
        'BarChart3',
        'Webhook',
        'Headphones',
      ]
    >;
    Items: Schema.Attribute.Component<'miscellaneous.icon-text', true>;
    ItemsTitle: Schema.Attribute.String;
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

export interface PageAccordion extends Struct.ComponentSchema {
  collectionName: 'components_page_accordions';
  info: {
    displayName: 'Accordion';
  };
  attributes: {
    Accordion: Schema.Attribute.Component<'miscellaneous.accordion-item', true>;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageAccordionJson extends Struct.ComponentSchema {
  collectionName: 'components_page_accordion_jsons';
  info: {
    displayName: 'Accordion Json';
  };
  attributes: {
    Accordion: Schema.Attribute.Component<
      'miscellaneous.accordion-item-json',
      true
    >;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageAddOnsSection extends Struct.ComponentSchema {
  collectionName: 'components_page_add_ons_sections';
  info: {
    displayName: 'Add-ons Section';
  };
  attributes: {
    AddOns: Schema.Attribute.Component<'miscellaneous.add-on-box', true>;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxIcon extends Struct.ComponentSchema {
  collectionName: 'components_page_box_icons';
  info: {
    displayName: 'Box Icon';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxIconListSection extends Struct.ComponentSchema {
  collectionName: 'components_page_box_icon_list_sections';
  info: {
    displayName: 'Box Icon List Section';
  };
  attributes: {
    Items: Schema.Attribute.Component<'miscellaneous.box-icon-color', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxItems extends Struct.ComponentSchema {
  collectionName: 'components_page_box_items';
  info: {
    displayName: 'Box Items';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Items: Schema.Attribute.Component<'miscellaneous.list-item', true>;
    ShowInColumns: Schema.Attribute.Boolean;
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxListItems extends Struct.ComponentSchema {
  collectionName: 'components_page_box_list_items';
  info: {
    displayName: 'Box List Items';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    ListItems: Schema.Attribute.Component<'miscellaneous.list-item', true>;
    ListTitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxListSteps extends Struct.ComponentSchema {
  collectionName: 'components_page_box_list_steps';
  info: {
    displayName: 'Box List Steps';
  };
  attributes: {
    Boxes: Schema.Attribute.Component<'miscellaneous.box-icon-color', true>;
    OnePerPage: Schema.Attribute.Boolean;
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxNestedSection extends Struct.ComponentSchema {
  collectionName: 'components_page_box_nested_sections';
  info: {
    displayName: 'Box Nested Section';
  };
  attributes: {
    Boxes: Schema.Attribute.Component<'miscellaneous.box-nested', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxQAndA extends Struct.ComponentSchema {
  collectionName: 'components_page_box_q_and_as';
  info: {
    displayName: 'Box Q & A';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    qa: Schema.Attribute.Component<'miscellaneous.q-and-a', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxSimple extends Struct.ComponentSchema {
  collectionName: 'components_page_box_simples';
  info: {
    displayName: 'Box Simple';
  };
  attributes: {
    Description: Schema.Attribute.RichText;
    Title: Schema.Attribute.String;
  };
}

export interface PageBoxesColumns extends Struct.ComponentSchema {
  collectionName: 'components_page_boxes_columns';
  info: {
    displayName: 'Boxes Columns';
  };
  attributes: {
    Columns: Schema.Attribute.Enumeration<['two', 'three']>;
    Items: Schema.Attribute.Component<'roadmap.feature', true>;
    Title: Schema.Attribute.String;
    whiteTheme: Schema.Attribute.Boolean;
  };
}

export interface PageBusinessPulseSection extends Struct.ComponentSchema {
  collectionName: 'components_page_business_pulse_sections';
  info: {
    displayName: 'Business Pulse Section';
  };
  attributes: {
    Config: Schema.Attribute.Component<'miscellaneous.business-pulse', false>;
    Title: Schema.Attribute.String;
  };
}

export interface PageHeader extends Struct.ComponentSchema {
  collectionName: 'components_page_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    Subtitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface PageInlineBoxesSection extends Struct.ComponentSchema {
  collectionName: 'components_page_inline_boxes_sections';
  info: {
    displayName: 'Inline Boxes Section';
  };
  attributes: {
    Items: Schema.Attribute.Component<'miscellaneous.list-item', true>;
    whiteTheme: Schema.Attribute.Boolean;
  };
}

export interface PageMarketingPerformanceDashboard
  extends Struct.ComponentSchema {
  collectionName: 'components_page_marketing_performance_dashboards';
  info: {
    displayName: 'Marketing Performance Dashboard';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Title: Schema.Attribute.String;
  };
}

export interface PageMetricsSection extends Struct.ComponentSchema {
  collectionName: 'components_page_metrics_sections';
  info: {
    displayName: 'Metrics Section';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    Title: Schema.Attribute.String;
  };
}

export interface PagePricingSection extends Struct.ComponentSchema {
  collectionName: 'components_page_pricing_sections';
  info: {
    displayName: 'Pricing Section';
  };
  attributes: {
    Plan: Schema.Attribute.Component<'pricing.plan', true>;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageSectionBoxFeaturesFooter extends Struct.ComponentSchema {
  collectionName: 'components_page_section_box_features_footers';
  info: {
    displayName: 'Section Box Features Footer';
  };
  attributes: {
    Boxes: Schema.Attribute.Component<
      'miscellaneous.box-features-footer',
      true
    >;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageSectionIconBoxes extends Struct.ComponentSchema {
  collectionName: 'components_page_section_icon_boxes';
  info: {
    displayName: 'Section Icon Boxes';
  };
  attributes: {
    SectionIconBoxes: Schema.Attribute.Component<
      'miscellaneous.icon-box',
      true
    >;
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

export interface PageTableSection extends Struct.ComponentSchema {
  collectionName: 'components_page_table_sections';
  info: {
    displayName: 'Table Section';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Footer: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageTabsBoxSection extends Struct.ComponentSchema {
  collectionName: 'components_page_tabs_box_sections';
  info: {
    displayName: 'Tabs Box Section';
  };
  attributes: {
    Tabs: Schema.Attribute.Component<'miscellaneous.tab-category-box', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PageTabsComponentsSection extends Struct.ComponentSchema {
  collectionName: 'components_page_tabs_components_sections';
  info: {
    displayName: 'Tabs Components Section';
  };
  attributes: {
    Tabs: Schema.Attribute.Component<
      'miscellaneous.tab-category-components',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface PageTabsSection extends Struct.ComponentSchema {
  collectionName: 'components_page_tabs_sections';
  info: {
    displayName: 'Tabs Section';
  };
  attributes: {
    Tabs: Schema.Attribute.Component<'miscellaneous.tab-category', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PageTabsVerticalSection extends Struct.ComponentSchema {
  collectionName: 'components_page_tabs_vertical_sections';
  info: {
    displayName: 'Tabs Vertical Section';
  };
  attributes: {
    Subtitle: Schema.Attribute.String;
    Tabs: Schema.Attribute.Component<
      'miscellaneous.tab-category-vertical',
      false
    >;
    Title: Schema.Attribute.String;
  };
}

export interface PostsContent extends Struct.ComponentSchema {
  collectionName: 'components_posts_contents';
  info: {
    displayName: 'Content';
  };
  attributes: {
    Text: Schema.Attribute.Blocks;
  };
}

export interface PricingPlan extends Struct.ComponentSchema {
  collectionName: 'components_pricing_plans';
  info: {
    displayName: 'Plan';
  };
  attributes: {
    Color: Schema.Attribute.Enumeration<
      [
        'ed',
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
    Description: Schema.Attribute.String;
    Icon: Schema.Attribute.Enumeration<
      [
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
    isMostPopular: Schema.Attribute.Boolean;
    Items: Schema.Attribute.Component<'pricing.pricing-plan-feature', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PricingPricingPlanFeature extends Struct.ComponentSchema {
  collectionName: 'components_pricing_pricing_plan_features';
  info: {
    displayName: 'Pricing Plan Feature';
  };
  attributes: {
    Checked: Schema.Attribute.Boolean;
    Name: Schema.Attribute.String;
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
        'Bot',
        'User',
        'Check',
        'MessageSquare',
        'ArrowRight',
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
      'home.cta-section': HomeCtaSection;
      'home.roadmap-section': HomeRoadmapSection;
      'home.roi-calculator-section': HomeRoiCalculatorSection;
      'home.security-section': HomeSecuritySection;
      'miscellaneous.accordion-item': MiscellaneousAccordionItem;
      'miscellaneous.accordion-item-json': MiscellaneousAccordionItemJson;
      'miscellaneous.add-on-box': MiscellaneousAddOnBox;
      'miscellaneous.box-features-footer': MiscellaneousBoxFeaturesFooter;
      'miscellaneous.box-icon-color': MiscellaneousBoxIconColor;
      'miscellaneous.box-nested': MiscellaneousBoxNested;
      'miscellaneous.business-pulse': MiscellaneousBusinessPulse;
      'miscellaneous.button': MiscellaneousButton;
      'miscellaneous.icon-box': MiscellaneousIconBox;
      'miscellaneous.icon-text': MiscellaneousIconText;
      'miscellaneous.list-item': MiscellaneousListItem;
      'miscellaneous.q-and-a': MiscellaneousQAndA;
      'miscellaneous.tab-category': MiscellaneousTabCategory;
      'miscellaneous.tab-category-box': MiscellaneousTabCategoryBox;
      'miscellaneous.tab-category-components': MiscellaneousTabCategoryComponents;
      'miscellaneous.tab-category-vertical': MiscellaneousTabCategoryVertical;
      'miscellaneous.tab-item': MiscellaneousTabItem;
      'miscellaneous.tab-item-box': MiscellaneousTabItemBox;
      'miscellaneous.tab-item-component-icon-text': MiscellaneousTabItemComponentIconText;
      'miscellaneous.tab-item-components': MiscellaneousTabItemComponents;
      'miscellaneous.tabs-item-vertival': MiscellaneousTabsItemVertival;
      'miscellaneous.text': MiscellaneousText;
      'page.accordion': PageAccordion;
      'page.accordion-json': PageAccordionJson;
      'page.add-ons-section': PageAddOnsSection;
      'page.box-icon': PageBoxIcon;
      'page.box-icon-list-section': PageBoxIconListSection;
      'page.box-items': PageBoxItems;
      'page.box-list-items': PageBoxListItems;
      'page.box-list-steps': PageBoxListSteps;
      'page.box-nested-section': PageBoxNestedSection;
      'page.box-q-and-a': PageBoxQAndA;
      'page.box-simple': PageBoxSimple;
      'page.boxes-columns': PageBoxesColumns;
      'page.business-pulse-section': PageBusinessPulseSection;
      'page.header': PageHeader;
      'page.inline-boxes-section': PageInlineBoxesSection;
      'page.marketing-performance-dashboard': PageMarketingPerformanceDashboard;
      'page.metrics-section': PageMetricsSection;
      'page.pricing-section': PagePricingSection;
      'page.section-box-features-footer': PageSectionBoxFeaturesFooter;
      'page.section-icon-boxes': PageSectionIconBoxes;
      'page.seo': PageSeo;
      'page.table-section': PageTableSection;
      'page.tabs-box-section': PageTabsBoxSection;
      'page.tabs-components-section': PageTabsComponentsSection;
      'page.tabs-section': PageTabsSection;
      'page.tabs-vertical-section': PageTabsVerticalSection;
      'posts.content': PostsContent;
      'pricing.plan': PricingPlan;
      'pricing.pricing-plan-feature': PricingPricingPlanFeature;
      'roadmap.feature': RoadmapFeature;
      'roadmap.version': RoadmapVersion;
    }
  }
}
