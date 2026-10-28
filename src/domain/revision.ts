// Retain archived banks while sessions from these revisions may exist.
export const LEGACY_CONTENT_REVISION = '2026-10-27.1';
export const AUDITED_CONTENT_REVISION = '2026-10-27.2';
export const BLUEPRINT_CONTENT_REVISION = '2026-10-27.3';
export const COVERAGE_CONTENT_REVISION = '2026-10-27.4';
export const BILINGUAL_CONTENT_REVISION = '2026-10-27.5';
export const CONTENT_REVISION = '2026-10-27.6';
// These revisions were generated under the verified LO-group blueprint.
export const isBlueprintRevision = (revision: string): boolean =>
  revision === BLUEPRINT_CONTENT_REVISION ||
  revision === COVERAGE_CONTENT_REVISION ||
  revision === BILINGUAL_CONTENT_REVISION ||
  revision === CONTENT_REVISION;
