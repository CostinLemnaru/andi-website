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
    Description: Schema.Attribute.String;
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

export interface MiscellaneousColoredBox extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_colored_boxes';
  info: {
    displayName: 'ColoredBox';
  };
  attributes: {
    bigTitle: Schema.Attribute.Boolean;
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
    Content: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousColoredIconTitleSubtitleBox
  extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_colored_icon_title_subtitle_boxes';
  info: {
    displayName: 'Colored Icon Title Subtitle Box';
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

export interface MiscellaneousIconTitleSubtitle extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_icon_title_subtitles';
  info: {
    displayName: 'Icon Title Subtitle';
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
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousItemListNumbers extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_item_list_numbers';
  info: {
    displayName: 'Item List Numbers';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousListItem extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_list_items';
  info: {
    displayName: 'List Item';
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
    Description: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousPerson extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_people';
  info: {
    displayName: 'Person';
  };
  attributes: {
    Description: Schema.Attribute.String;
    Linkedin: Schema.Attribute.String;
    Name: Schema.Attribute.String;
    Photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Subtitle: Schema.Attribute.String;
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

export interface MiscellaneousTabCategoryBoxColored
  extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_category_box_coloreds';
  info: {
    displayName: 'Tab Category Box Colored';
  };
  attributes: {
    ColoredBoxes: Schema.Attribute.Component<
      'miscellaneous.colored-box',
      false
    >;
    Title: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabCategoryBoxIconColor
  extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tab_category_box_icon_colors';
  info: {
    displayName: 'Tab Category Box Icon Color';
  };
  attributes: {
    TabContent: Schema.Attribute.Component<
      'miscellaneous.box-icon-color',
      false
    >;
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

export interface MiscellaneousTabsBoxItem extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tabs_box_items';
  info: {
    displayName: 'Tabs Box Item';
  };
  attributes: {
    TabContentDescription: Schema.Attribute.Text;
    TabContentTitle: Schema.Attribute.String;
    TabTitle: Schema.Attribute.String;
  };
}

export interface MiscellaneousTabsColoredBoxItem
  extends Struct.ComponentSchema {
  collectionName: 'components_miscellaneous_tabs_colored_box_items';
  info: {
    displayName: 'Tabs Colored Box Item';
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
    TabContentDescription: Schema.Attribute.Text;
    TabContentTitle: Schema.Attribute.String;
    TabTitle: Schema.Attribute.String;
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

export interface NavigationItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_items';
  info: {
    displayName: 'Item';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Href: Schema.Attribute.String;
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
        'TrendingUp',
        'BarChart3',
        'LifeBuoy',
        'Users',
        'Infinity',
        'Webhook',
        'Headphones',
        'Video',
        'Home',
        'Link2',
        'DollarSign',
        'LineChart',
        'Settings',
        'FileText',
        'BookOpen',
        'Download',
        'Building',
        'Building2',
        'ShoppingBag',
        'Stethoscope',
        'Factory',
        'Briefcase',
        'GraduationCap',
      ]
    >;
    Title: Schema.Attribute.String;
  };
}

export interface NavigationSection extends Struct.ComponentSchema {
  collectionName: 'components_navigation_sections';
  info: {
    displayName: 'Section';
  };
  attributes: {
    Href: Schema.Attribute.String;
    Items: Schema.Attribute.Component<'navigation.item', true>;
    Standalone: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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

export interface PageBgColoredBoxed extends Struct.ComponentSchema {
  collectionName: 'components_page_bg_colored_boxeds';
  info: {
    displayName: 'BgColored Boxed';
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
    Description: Schema.Attribute.String;
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
    hasBackground: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isTransparent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isWideLayout: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
    Content: Schema.Attribute.Blocks;
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

export interface PageButton extends Struct.ComponentSchema {
  collectionName: 'components_page_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    Button: Schema.Attribute.Component<'miscellaneous.button', false>;
    Title: Schema.Attribute.String;
  };
}

export interface PageColoredIconTitleSubtitleBoxes
  extends Struct.ComponentSchema {
  collectionName: 'components_page_colored_icon_title_subtitle_boxes';
  info: {
    displayName: 'Colored Icon Title Subtitle Boxes';
  };
  attributes: {
    Boxes: Schema.Attribute.Component<
      'miscellaneous.colored-icon-title-subtitle-box',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
        },
        number
      >;
    highlightWords: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageColumnsListSection extends Struct.ComponentSchema {
  collectionName: 'components_page_columns_list_sections';
  info: {
    displayName: 'Columns List Section';
  };
  attributes: {
    highlightWords: Schema.Attribute.String;
    Items: Schema.Attribute.Component<'page.box-icon', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PageColumnsTextBox extends Struct.ComponentSchema {
  collectionName: 'components_page_columns_text_boxes';
  info: {
    displayName: 'Columns  Text Box';
  };
  attributes: {
    LeftColumn: Schema.Attribute.Blocks;
    RightColumn: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface PageContent extends Struct.ComponentSchema {
  collectionName: 'components_page_contents';
  info: {
    displayName: 'Content';
  };
  attributes: {
    Text: Schema.Attribute.RichText;
  };
}

export interface PageCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_page_cta_sections';
  info: {
    displayName: 'Cta Section';
  };
  attributes: {
    PrimaryButton: Schema.Attribute.Component<'miscellaneous.button', false>;
    SecondaryButton: Schema.Attribute.Component<'miscellaneous.button', false>;
    subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageEarlyAccesButton extends Struct.ComponentSchema {
  collectionName: 'components_page_early_acces_buttons';
  info: {
    displayName: 'EarlyAcces Button';
  };
  attributes: {
    Tag: Schema.Attribute.Component<'page.tag-icon', false>;
  };
}

export interface PageExpectedLaunchBox extends Struct.ComponentSchema {
  collectionName: 'components_page_expected_launch_boxes';
  info: {
    displayName: 'Expected Launch Box';
  };
  attributes: {
    Description: Schema.Attribute.String;
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

export interface PageHeaderIcon extends Struct.ComponentSchema {
  collectionName: 'components_page_header_icons';
  info: {
    displayName: 'Header Icon';
  };
  attributes: {
    highlightWords: Schema.Attribute.String;
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

export interface PageHeaderLeft extends Struct.ComponentSchema {
  collectionName: 'components_page_header_lefts';
  info: {
    displayName: 'Header Left';
  };
  attributes: {
    Subtitle: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface PageIconBox extends Struct.ComponentSchema {
  collectionName: 'components_page_icon_boxes';
  info: {
    displayName: 'Icon Box';
  };
  attributes: {
    Description: Schema.Attribute.String;
    highlightWords: Schema.Attribute.String;
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

export interface PageInlineIconBoxes extends Struct.ComponentSchema {
  collectionName: 'components_page_inline_icon_boxes';
  info: {
    displayName: 'Inline Icon Boxes';
  };
  attributes: {
    Boxes: Schema.Attribute.Component<'miscellaneous.icon-box', true>;
  };
}

export interface PageInlineIconTitleSubtitleBoxes
  extends Struct.ComponentSchema {
  collectionName: 'components_page_inline_icon_title_subtitle_boxes';
  info: {
    displayName: 'Inline Icon Title Subtitle Boxes';
  };
  attributes: {
    Boxes: Schema.Attribute.Component<
      'miscellaneous.icon-title-subtitle',
      true
    >;
  };
}

export interface PageJoinEarlyAccess extends Struct.ComponentSchema {
  collectionName: 'components_page_join_early_accesses';
  info: {
    displayName: 'Join Early Access';
  };
  attributes: {
    BoxSubtitle: Schema.Attribute.String;
    BoxTitle: Schema.Attribute.String;
    FooterText: Schema.Attribute.String;
    highlightWords: Schema.Attribute.String;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
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

export interface PagePostBox extends Struct.ComponentSchema {
  collectionName: 'components_page_post_boxes';
  info: {
    displayName: 'Post Box';
  };
  attributes: {
    showLastPost: Schema.Attribute.Boolean;
    slug: Schema.Attribute.String;
  };
}

export interface PagePostsInline extends Struct.ComponentSchema {
  collectionName: 'components_page_posts_inlines';
  info: {
    displayName: 'Posts Inline';
  };
  attributes: {
    showLastThree: Schema.Attribute.Boolean;
    slugOne: Schema.Attribute.String;
    slugThree: Schema.Attribute.String;
    slugTwo: Schema.Attribute.String;
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

export interface PageRequestDemoBox extends Struct.ComponentSchema {
  collectionName: 'components_page_request_demo_boxes';
  info: {
    displayName: 'Request demo box';
  };
  attributes: {
    Description: Schema.Attribute.String;
    FooterText: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageRoadmapBoxesSection extends Struct.ComponentSchema {
  collectionName: 'components_page_roadmap_boxes_sections';
  info: {
    displayName: 'Roadmap Boxes section';
  };
  attributes: {
    Items: Schema.Attribute.Component<'roadmap.feature', true>;
    Title: Schema.Attribute.String;
    whiteTheme: Schema.Attribute.Boolean;
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

export interface PageSectionColumnsIconTitleSubtitleBoxes
  extends Struct.ComponentSchema {
  collectionName: 'components_page_section_columns_icon_title_subtitle_boxes';
  info: {
    displayName: 'Section Columns Icon Title Subtitle Boxes';
  };
  attributes: {
    Boxes: Schema.Attribute.Component<
      'miscellaneous.icon-title-subtitle',
      true
    >;
    highlightWords: Schema.Attribute.String;
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
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface PageTagIcon extends Struct.ComponentSchema {
  collectionName: 'components_page_tag_icons';
  info: {
    displayName: 'Section Call to Action Module';
  };
  attributes: {
    ButtonName: Schema.Attribute.String;
    Description: Schema.Attribute.String;
    highlightWords: Schema.Attribute.String;
    IconButton: Schema.Attribute.Enumeration<
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
    TagIcon: Schema.Attribute.Enumeration<
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
    TagName: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface PageTeam extends Struct.ComponentSchema {
  collectionName: 'components_page_teams';
  info: {
    displayName: 'Team';
  };
  attributes: {
    Members: Schema.Attribute.Component<'miscellaneous.person', true>;
  };
}

export interface PostsBoxButtons extends Struct.ComponentSchema {
  collectionName: 'components_posts_box_buttons';
  info: {
    displayName: 'Box Buttons';
  };
  attributes: {
    centered: Schema.Attribute.Boolean;
    Description: Schema.Attribute.Text;
    MainButton: Schema.Attribute.Component<'miscellaneous.button', false>;
    SecondaryButton: Schema.Attribute.Component<'miscellaneous.button', false>;
    Title: Schema.Attribute.String;
    transparentBackground: Schema.Attribute.Boolean;
  };
}

export interface PostsBusinessImpactCalculator extends Struct.ComponentSchema {
  collectionName: 'components_posts_business_impact_calculators';
  info: {
    displayName: 'Business Impact Calculator';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
  };
}

export interface PostsColoredBoxesSection extends Struct.ComponentSchema {
  collectionName: 'components_posts_colored_boxes_sections';
  info: {
    displayName: 'Colored Boxes Section';
  };
  attributes: {
    ColoredBox: Schema.Attribute.Component<'miscellaneous.colored-box', true>;
    Columns: Schema.Attribute.Enumeration<['one', 'two', 'three', 'four']>;
    Subtitle: Schema.Attribute.Text;
    Text: Schema.Attribute.String;
  };
}

export interface PostsComparisonSlider extends Struct.ComponentSchema {
  collectionName: 'components_posts_comparison_sliders';
  info: {
    displayName: 'Comparison Slider';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
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

export interface PostsDecisionFlowSection extends Struct.ComponentSchema {
  collectionName: 'components_posts_decision_flow_sections';
  info: {
    displayName: 'Decision Flow Section';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Title: Schema.Attribute.String;
  };
}

export interface PostsEvolutionTabs extends Struct.ComponentSchema {
  collectionName: 'components_posts_evolution_tabs';
  info: {
    displayName: 'Evolution Tabs';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Title: Schema.Attribute.String;
  };
}

export interface PostsList extends Struct.ComponentSchema {
  collectionName: 'components_posts_lists';
  info: {
    displayName: 'List';
  };
  attributes: {
    Item: Schema.Attribute.Component<'miscellaneous.icon-text', true>;
  };
}

export interface PostsListNumbers extends Struct.ComponentSchema {
  collectionName: 'components_posts_list_numbers';
  info: {
    displayName: 'List Numbers';
  };
  attributes: {
    Items: Schema.Attribute.Component<'miscellaneous.item-list-numbers', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PostsQuote extends Struct.ComponentSchema {
  collectionName: 'components_posts_quotes';
  info: {
    displayName: 'Quote';
  };
  attributes: {
    FooterText: Schema.Attribute.String;
    Text: Schema.Attribute.Text;
  };
}

export interface PostsRelatedResources extends Struct.ComponentSchema {
  collectionName: 'components_posts_related_resources';
  info: {
    displayName: 'Related Resources';
  };
  attributes: {
    Resources: Schema.Attribute.Component<'page.box-simple', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PostsSageReadinessAssessment extends Struct.ComponentSchema {
  collectionName: 'components_posts_sage_readiness_assessments';
  info: {
    displayName: 'SAGE Readiness Assessment';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    Title: Schema.Attribute.String;
  };
}

export interface PostsTableJson extends Struct.ComponentSchema {
  collectionName: 'components_posts_table_jsons';
  info: {
    displayName: 'Table JSON';
  };
  attributes: {
    Config: Schema.Attribute.JSON;
    FooterText: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface PostsTabsBoxesSection extends Struct.ComponentSchema {
  collectionName: 'components_posts_tabs_boxes_sections';
  info: {
    displayName: 'Tabs Boxes Section';
  };
  attributes: {
    Tabs: Schema.Attribute.Component<'miscellaneous.tabs-box-item', true>;
  };
}

export interface PostsTabsColoredBoxesSection extends Struct.ComponentSchema {
  collectionName: 'components_posts_tabs_colored_boxes_sections';
  info: {
    displayName: 'Tabs Colored Boxes Section';
  };
  attributes: {
    Tabs: Schema.Attribute.Component<
      'miscellaneous.tabs-colored-box-item',
      true
    >;
  };
}

export interface PostsTabsIcons extends Struct.ComponentSchema {
  collectionName: 'components_posts_tabs_icons';
  info: {
    displayName: 'Tabs Icons';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Tabs: Schema.Attribute.Component<
      'miscellaneous.tab-category-box-icon-color',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface PostsTitle extends Struct.ComponentSchema {
  collectionName: 'components_posts_titles';
  info: {
    displayName: 'Title';
  };
  attributes: {
    centered: Schema.Attribute.Boolean;
    Text: Schema.Attribute.Text;
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
      'miscellaneous.colored-box': MiscellaneousColoredBox;
      'miscellaneous.colored-icon-title-subtitle-box': MiscellaneousColoredIconTitleSubtitleBox;
      'miscellaneous.icon-box': MiscellaneousIconBox;
      'miscellaneous.icon-text': MiscellaneousIconText;
      'miscellaneous.icon-title-subtitle': MiscellaneousIconTitleSubtitle;
      'miscellaneous.item-list-numbers': MiscellaneousItemListNumbers;
      'miscellaneous.list-item': MiscellaneousListItem;
      'miscellaneous.person': MiscellaneousPerson;
      'miscellaneous.q-and-a': MiscellaneousQAndA;
      'miscellaneous.tab-category': MiscellaneousTabCategory;
      'miscellaneous.tab-category-box': MiscellaneousTabCategoryBox;
      'miscellaneous.tab-category-box-colored': MiscellaneousTabCategoryBoxColored;
      'miscellaneous.tab-category-box-icon-color': MiscellaneousTabCategoryBoxIconColor;
      'miscellaneous.tab-category-components': MiscellaneousTabCategoryComponents;
      'miscellaneous.tab-category-vertical': MiscellaneousTabCategoryVertical;
      'miscellaneous.tab-item': MiscellaneousTabItem;
      'miscellaneous.tab-item-box': MiscellaneousTabItemBox;
      'miscellaneous.tab-item-component-icon-text': MiscellaneousTabItemComponentIconText;
      'miscellaneous.tab-item-components': MiscellaneousTabItemComponents;
      'miscellaneous.tabs-box-item': MiscellaneousTabsBoxItem;
      'miscellaneous.tabs-colored-box-item': MiscellaneousTabsColoredBoxItem;
      'miscellaneous.tabs-item-vertival': MiscellaneousTabsItemVertival;
      'miscellaneous.text': MiscellaneousText;
      'navigation.item': NavigationItem;
      'navigation.section': NavigationSection;
      'page.accordion': PageAccordion;
      'page.accordion-json': PageAccordionJson;
      'page.add-ons-section': PageAddOnsSection;
      'page.bg-colored-boxed': PageBgColoredBoxed;
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
      'page.button': PageButton;
      'page.colored-icon-title-subtitle-boxes': PageColoredIconTitleSubtitleBoxes;
      'page.columns-list-section': PageColumnsListSection;
      'page.columns-text-box': PageColumnsTextBox;
      'page.content': PageContent;
      'page.cta-section': PageCtaSection;
      'page.early-acces-button': PageEarlyAccesButton;
      'page.expected-launch-box': PageExpectedLaunchBox;
      'page.header': PageHeader;
      'page.header-icon': PageHeaderIcon;
      'page.header-left': PageHeaderLeft;
      'page.icon-box': PageIconBox;
      'page.inline-boxes-section': PageInlineBoxesSection;
      'page.inline-icon-boxes': PageInlineIconBoxes;
      'page.inline-icon-title-subtitle-boxes': PageInlineIconTitleSubtitleBoxes;
      'page.join-early-access': PageJoinEarlyAccess;
      'page.marketing-performance-dashboard': PageMarketingPerformanceDashboard;
      'page.metrics-section': PageMetricsSection;
      'page.post-box': PagePostBox;
      'page.posts-inline': PagePostsInline;
      'page.pricing-section': PagePricingSection;
      'page.request-demo-box': PageRequestDemoBox;
      'page.roadmap-boxes-section': PageRoadmapBoxesSection;
      'page.section-box-features-footer': PageSectionBoxFeaturesFooter;
      'page.section-columns-icon-title-subtitle-boxes': PageSectionColumnsIconTitleSubtitleBoxes;
      'page.section-icon-boxes': PageSectionIconBoxes;
      'page.seo': PageSeo;
      'page.table-section': PageTableSection;
      'page.tabs-box-section': PageTabsBoxSection;
      'page.tabs-components-section': PageTabsComponentsSection;
      'page.tabs-section': PageTabsSection;
      'page.tabs-vertical-section': PageTabsVerticalSection;
      'page.tag-icon': PageTagIcon;
      'page.team': PageTeam;
      'posts.box-buttons': PostsBoxButtons;
      'posts.business-impact-calculator': PostsBusinessImpactCalculator;
      'posts.colored-boxes-section': PostsColoredBoxesSection;
      'posts.comparison-slider': PostsComparisonSlider;
      'posts.content': PostsContent;
      'posts.decision-flow-section': PostsDecisionFlowSection;
      'posts.evolution-tabs': PostsEvolutionTabs;
      'posts.list': PostsList;
      'posts.list-numbers': PostsListNumbers;
      'posts.quote': PostsQuote;
      'posts.related-resources': PostsRelatedResources;
      'posts.sage-readiness-assessment': PostsSageReadinessAssessment;
      'posts.table-json': PostsTableJson;
      'posts.tabs-boxes-section': PostsTabsBoxesSection;
      'posts.tabs-colored-boxes-section': PostsTabsColoredBoxesSection;
      'posts.tabs-icons': PostsTabsIcons;
      'posts.title': PostsTitle;
      'pricing.plan': PricingPlan;
      'pricing.pricing-plan-feature': PricingPricingPlanFeature;
      'roadmap.feature': RoadmapFeature;
      'roadmap.version': RoadmapVersion;
    }
  }
}
