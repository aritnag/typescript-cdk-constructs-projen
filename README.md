We will be using the conventional commit standards for releasing any new changes. 
This version integrates with projen framework to bump/release a new version and also upload them in Azure devops repository.

The commit contains the following structural elements, to communicate intent to the consumers of your library:

fix:  a commit of the  type   fix  patches a bug in your codebase (this correlates with  PATCH  in Semantic Versioning).
feat:  a commit of the  type   feat  introduces a new feature to the codebase (this correlates with  MINOR  in Semantic Versioning).
BREAKING CHANGE:  a commit that has a footer  BREAKING CHANGE:, or appends a  !  after the type/scope, introduces a breaking API change (correlating with  MAJOR  in Semantic Versioning). A BREAKING CHANGE can be part of commits of any  type.
types  other than  fix:  and  feat:  are allowed, for example  @commitlint/config-conventional  (based on the  the Angular convention) recommends  build:,  chore:,  ci:,  docs:,  style:,  refactor:,  perf:,  test:, and others.
footers  other than  BREAKING CHANGE: <description>  may be provided and follow a convention similar to  git trailer format.


REF : https://www.conventionalcommits.org/en/v1.0.0/
  
JavaScript-based projects lately getting the bar ever so higher in terms of quality and tooling. Developers make use of an ever wider range of tools, services and standards. Compiling, testing, bundling, linting. Keeping up with those could be tedious.

Some, having faced this problem numerous times before, opted in for maintaining a boilerplate project to be cloned when creating a new project. We have used Projen framework in creating the building the constructs and this is one of the guide to create and contribute to the Golden path.

