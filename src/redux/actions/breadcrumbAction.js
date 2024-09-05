// breadcrumbAction.js
export const UPDATE_BREADCRUMBS = "UPDATE_BREADCRUMBS";

export const updateBreadcrumbs = (pathSnippets) => ({
  type: UPDATE_BREADCRUMBS,
  payload: pathSnippets,
});
