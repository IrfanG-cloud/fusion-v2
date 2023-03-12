export const API_ENDPOINTS = {
  AUTH: {
    TOKEN_REQ_URL: 'v2/user/request-token',
    ENCRYPT_URL: 'v2/encrypt',
  },

  HANDSHAKE: {
    TOKEN_REQ_URL: 'api/v1/client-handshake',
  },

  USER: {
    REGISTER_CLIENT_URL: 'api/v1/sign-up',
    LOGIN_CLIENT_URL: 'api/v1/sign-in',
    REGISTER_CLIENT_PROFILE_URL: 'v2/user/register-client-profile',
  },
  WORKSPACES: {
    USER_WORKSPACES_LIST: 'api/v1/user-workspaces',
    WORKSPACES_CREATE: 'api/v1/workspace/create',
    DELETE_WORKSPACE_BY_ID: 'api/v1/project/delete-workspace',
    UPDATE_WORKSPACE_DETAILS: 'api/v1/project/update-workspace-details',

    INVITE_MEMBER: 'api/v1/project/workspace-invite',
    FETCH_WORKSPACE_MEMBERS: 'api/v1/project/fetch-members',
    FETCH_PENDING_INVITED_MEMBERS: 'api/v1/project/pending-member',
    REMOVE_INVITE: 'api/v1/project/remove-invitee',
    FETCH_WORKSPACE_ROLE: 'api/v1/project/get-user-role-workspace',
    UPLOAD_AVATAR: 'api/v1/user/upload-workspace-avatar',
    REMOVE_MEMBERSHIP: 'api/v1/project/remove-membership',
  },

  RESOLUTION_STATUS: {
    FETCH_RESOLUTION_STATUSES: 'api/v1/project/resolution-statuses',
    UPDATE_RESOLUTION_STATUS: 'api/v1/project/update-bug-status',
    UPDATE_CRASH_RESOLUTION_STATUS: 'api/v1/project/update-crash-status',
  },
  ASSIGNEE: {
    FETCH_ASSIGNEE: 'api/v1/project/fetch-assignees',
    UPDATE_ASSIGNEE: 'api/v1/project/update-bug-assignee',
    UPDATE_CRASH_ASSIGNEE: 'api/v1/project/update-crash-assignee',
  },

  PROJECTS: {
    PROJECT_LIST_OWNED: 'api/v1/workspace/owned/project-list',
    PROJECT_LIST_SHARED: 'api/v1/workspace/shared/project-list',
    CREATE_PROJECT: 'api/v1/workspace/project/create',
    PROJECT_DETAIL: 'api/v1/project/summary',
    PROJECT_BUG_LISTING: 'api/v1/project/bug-list',
    PROJECT_CRASH_LISTING: 'api/v1/project/crash-list',
    PROJECT_BUG_DETAILS: 'api/v1/project/bug-details',
    PROJECT_CRASH_DETAILS: 'api/v1/project/crash-details',
    PROJECT_TAGS: 'api/v1/project/tags',
    PROJECT_STATUSES: 'api/v1/project/resolution-statuses',
    UPDATE_PROJECT_DETAILS: 'api/v1/project/update-project-details',
    UPLOAD_AVATAR: 'api/v1/user/upload-project-avatar',
    DELETE_PROJECT: 'api/v1/project/delete-project',
    FETCH_NOTIFICATIONS: 'api/v1/project/fetch-notifications',

    PROJECT_INVITE_MEMBER: 'api/v1/project/project-invite',
    PROJECT_USER_ROLE: 'api/v1/project/get-user-role-project',
    FETCH_MEMBERS: 'api/v1/project/fetch-members',
    UPDATE_MEMBER_ROLE: 'api/v1/project/update-project-member-role',
  },

  BUGS: {
    BUG_SEARCH: 'api/v1/project/search-bugs',
    DELETE_BUG: 'api/v1/project/delete-bug',

    POST_COMMENT: 'api/v1/project/submit-comment',
    FETCH_COMMENT: 'api/v1/project/fetch-comments',

    FETCH_BUG_FILTERS: 'api/v1/project/fetch-bug-filters',
    APPLY_BUG_FILTERS: 'api/v1/project/apply-bug-filters',
  },

  CRASHES: {
    CRASHES_LIST_URL: 'v2/crash/list',
    SINGLE_CRASH_URL: 'v2/crash/single',
    MATRICS_URL: 'v2/crash/matrics',
    CRASH_SEARCH: 'api/v1/project/search-crash',

    FETCH_FILTERS: 'api/v1/project/fetch-crash-filters  ',
    APPLY_FILTERS: 'api/v1/project/apply-crash-filters',
  },
  INTEGRATION: {
    JIRA_BASIC_1ST_URL: 'v2/project/init-project-external-integration',
    JIRA_VERIFY_INTEGRATION_URL: 'v2/project/verify-integration',
  },
  PROFILE: {
    CHANGE_USER_NAME: 'api/v1/project/change-user-name',
    CHANGE_USER_PASSWORD: 'api/v1/change-password',
    UPLOAD_USER_PROFILE: 'api/v1/user/upload-profile-picture',
  },
};
