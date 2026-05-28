export const POLICY_TYPES = [
  { value: 'access_control', label: 'Access Control' },
  { value: 'data_quality',   label: 'Data Quality'   },
  { value: 'compliance',     label: 'Compliance'     },
];

export const OPERATORS = [
  { value: '=',        label: 'equals (=)'                 },
  { value: '!=',       label: 'not equals (!=)'            },
  { value: '>',        label: 'greater than (>)'           },
  { value: '<',        label: 'less than (<)'              },
  { value: '>=',       label: 'greater than or equal (>=)' },
  { value: '<=',       label: 'less than or equal (<=)'    },
  { value: 'contains', label: 'contains'                   },
];

export const ACTIONS = [
  { value: 'allow', label: 'Allow' },
  { value: 'deny',  label: 'Deny'  },
  { value: 'alert', label: 'Alert' },
];

export const LOGIC_TYPES = ['AND', 'OR'];

export const STATUS_OPTIONS = [
  { value: 'active',   label: 'Active'   },
  { value: 'inactive', label: 'Inactive' },
];

export const DEFAULT_CONDITION = { field: '', operator: '', value: '' };

export const DEFAULT_RULE = {
  logic:      'AND',
  conditions: [{ ...DEFAULT_CONDITION }],
};
