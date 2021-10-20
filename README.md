We will be using the conventional commit standards for releasing any new changes. This version integrates with projen framework to bump/release a new version and also upload them in Azure devops repository.

The commit contains the following structural elements, to communicate intent to the consumers of your library:

fix:  a commit of the  type   fix  patches a bug in your codebase (this correlates with  PATCH  in Semantic Versioning).
feat:  a commit of the  type   feat  introduces a new feature to the codebase (this correlates with  MINOR  in Semantic Versioning).
BREAKING CHANGE:  a commit that has a footer  BREAKING CHANGE:, or appends a  !  after the type/scope, introduces a breaking API change (correlating with  MAJOR  in Semantic Versioning). A BREAKING CHANGE can be part of commits of any  type.
types  other than  fix:  and  feat:  are allowed, for example  @commitlint/config-conventional  (based on the  the Angular convention) recommends  build:,  chore:,  ci:,  docs:,  style:,  refactor:,  perf:,  test:, and others.
footers  other than  BREAKING CHANGE: <description>  may be provided and follow a convention similar to  git trailer format.



Examples

Commit message with description and breaking change footer

feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
Commit message with!to draw attention to breaking change

refactor!: drop support for Node 6
Commit message with scope and!to draw attention to breaking change

refactor(runtime)!: drop support for Node 6
Commit message with both!and BREAKING CHANGE footer

refactor!: drop support for Node 6

BREAKING CHANGE: refactor to use JavaScript features not available in Node 6.
Commit message with no body

docs: correct spelling of CHANGELOG
Commit message with scope

feat(lang): add polish language
Commit message with multi-paragraph body and multiple footers

fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123