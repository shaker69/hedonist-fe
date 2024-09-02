export enum DashboardSections {
  about = 'about',
  tags = 'tags',
  categories = 'categories',
  menuItems = 'menuItems',
  configs = 'configs'
}

export const aboutUsFieldNames = {
  workingHours: 'WorkingHours',
  address: 'Address',
  instagram: 'Instagram',
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

export const TAG_FILTER_INDEX = 'tag';
export const RECOMMENDED_TAG_FILTER_INDEX = 'isRecommended';
export const TABLE_HEIGHT_OFFSET = 231;